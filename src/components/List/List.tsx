import React from 'react';

type Hero = {
  name: string;
  url: string;
  gender: string;
};

type ListProps = {
  heroes: Array<Hero>;
};

const List: React.FC<ListProps> = ({ heroes }) => {
  return (
    <section>
      <ul>
        {heroes.map((hero, id) => (
          <li key={id}>
            <div>{hero.name}</div>
            <div>{hero.gender}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default List;
