import React from 'react';
import List from '../List/List';

interface StarWars {
  searchValue: string;
  heroes: Array<Hero>;
}

interface Hero {
  name: string;
  url: string;
  gender: string;
}

interface Props {}

class Search extends React.Component<Props, StarWars> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: '',
      heroes: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const savedInputValue = localStorage.getItem('searchValue') || '';

    if (savedInputValue) {
      this.setState({ searchValue: savedInputValue });
      await this.fetchHeroes(savedInputValue);
    }
  }

  componentDidUpdate(_: Props, prevState: StarWars): void {
    if (prevState.searchValue !== this.state.searchValue) {
      localStorage.setItem('searchValue', this.state.searchValue);
    }
  }

  async fetchHeroes(searchValue: string): Promise<void> {
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

      this.setState({ heroes });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ searchValue: e.target.value });
  }

  async handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const trimmedSearchValue = this.state.searchValue.trim();

    if (trimmedSearchValue) {
      await this.fetchHeroes(trimmedSearchValue);
    }
  }

  render() {
    return (
      <section>
        <form onSubmit={this.handleSearch}>
          <input
            value={this.state.searchValue}
            onChange={this.handleChange}
            placeholder="search hero"
          />
          <button type="submit">Search</button>
        </form>
        <List heroes={this.state.heroes} />
      </section>
    );
  }
}

export default Search;
