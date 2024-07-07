import React from 'react';

type Hero = {
  name: string;
  url: string;
  gender: string;
};

type ListProps = {
  heroes: Array<Hero>;
};

class List extends React.Component<ListProps> {
  render() {
    const { heroes } = this.props;

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
  }
}

export default List;
