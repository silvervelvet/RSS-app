import React, { useEffect, useState } from 'react';
import List from '../List/List';

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

  useEffect(() => {
    if (searchValue) {
      fetchHeroes(searchValue);
    }
  }, [searchValue]);

  const fetchHeroes = async (searchValue: string): Promise<void> => {
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
      await fetchHeroes(trimmedSearchValue);
    }
  };

  return (
    <section>
      <form onSubmit={handleSearch}>
        <input
          value={searchValue}
          onChange={handleChange}
          placeholder="search hero"
        />
        <button type="submit">Search</button>
      </form>
      <List heroes={heroes} />
    </section>
  );
};

export default Search;
