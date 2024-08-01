import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Hero {
  name: string;
  url: string;
  gender: string;
  height: string;
  mass: string;
  birth_year: string;
}

const HeroDetails: React.FC = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const heroUrl = searchParams.get('details');

  useEffect(() => {
    if (heroUrl) {
      fetchHeroDetails(decodeURIComponent(heroUrl));
    }
  }, [heroUrl]);

  const fetchHeroDetails = async (url: string) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setHero(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    searchParams.delete('details');
    navigate(`/?${searchParams.toString()}`, { replace: true });
    setHero(null); // Reset the hero state to close the details panel
  };

  return (
    <div className="hero-details">
      {loading ? null : hero ? (
        <div>
          <button onClick={handleClose}>Close</button>
          <h2>{hero.name}</h2>
          <p>Gender: {hero.gender}</p>
          <p>Height: {hero.height}</p>
          <p>Mass: {hero.mass}</p>
          <p>Birth Year: {hero.birth_year}</p>
        </div>
      ) : null}
    </div>
  );
};

export default HeroDetails;
