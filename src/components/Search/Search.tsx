import React, { useEffect, useState, useCallback } from 'react';
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
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useLSState('searchValue', '');
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [allHeroes, setAllHeroes] = useState<Hero[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const elementsPerPage = 2;
  const navigate = useNavigate();

  const fetchHeroes = useCallback(
    async (searchValue: string): Promise<void> => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${searchValue}`
        );
        const result = await response.json();
        const heroes: Hero[] = result.results.map((hero: Hero) => ({
          name: hero.name,
          url: hero.url,
          gender: hero.gender,
        }));
        setAllHeroes(heroes);
        setHeroes(paginate(heroes, currentPage, elementsPerPage));
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, elementsPerPage]
  );

  useEffect(() => {
    if (searchValue) {
      fetchHeroes(searchValue);
    }
  }, [searchValue, fetchHeroes]);

  useEffect(() => {
    setHeroes(paginate(allHeroes, currentPage, elementsPerPage));
  }, [allHeroes, currentPage]);

  const paginate = (items: Hero[], page: number, perPage: number) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedSearchValue = searchValue.trim();

    if (trimmedSearchValue) {
      await fetchHeroes(trimmedSearchValue);
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
          total={allHeroes.length}
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
