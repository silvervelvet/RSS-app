import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import List from '../List/List';
import Pagination from '../Pagination/Pagination';
import './Search.css';

interface Hero {
  name: string;
  url: string;
  gender: string;
}

const useLSState = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue !== null ? savedValue : defaultValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, value);
    };
  }, [key, value]);

  return [value, setValue] as const;
};

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useLSState('searchValue', '');
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const elementsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue) {
      fetchHeroes(searchValue, currentPage);
    }
  }, [searchValue, currentPage]);

  const fetchHeroes = async (
    searchValue: string,
    page: number
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchValue}&page=${page}`
      );
      const result = await response.json();
      const heroes: Hero[] = result.results.map((hero: Hero) => ({
        name: hero.name,
        url: hero.url,
        gender: hero.gender,
      }));

      setHeroes(heroes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedSearchValue = searchValue.trim();

    if (trimmedSearchValue) {
      await fetchHeroes(trimmedSearchValue, 1);
      setSearchParams({ page: '1' });
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  const handleHeroClick = (heroUrl: string) => {
    navigate(`/?page=${currentPage}&details=${encodeURIComponent(heroUrl)}`);
  };

  return (
    <section className="search-section">
      <div className="left-panel">
        <form onSubmit={handleSearch}>
          <input
            value={searchValue}
            onChange={handleChange}
            placeholder="Search hero"
          />
          <button type="submit">Search</button>
        </form>
        <List heroes={heroes} onHeroClick={handleHeroClick} />
        <Pagination
          handlePageChange={handlePageChange}
          elementsPerPage={elementsPerPage}
          total={heroes.length}
          currentPage={currentPage}
        />
      </div>
      <div className="right-panel">
        <Outlet />
      </div>
    </section>
  );
};

export default Search;
