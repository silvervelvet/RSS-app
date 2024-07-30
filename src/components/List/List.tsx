import React from 'react';

type Hero = {
  name: string;
  url: string;
  gender: string;
};

type ListProps = {
  heroes: Array<Hero>;
  onHeroClick: (url: string) => void;
};

const List: React.FC<ListProps> = ({ heroes, onHeroClick }) => {
  return (
    <section>
      <ul>
        {heroes.map((hero, id) => (
          <li key={id} onClick={() => onHeroClick(hero.url)}>
            <div>{hero.name}</div>
            <div>{hero.gender}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default List;
