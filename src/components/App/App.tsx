import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Search from '../Search/Search';
import HeroDetails from '../HeroDetails/HeroDetails';
import ErrorBoundary from '../ErrorResponse/ErrorResponse';
import ErrorBoundaryButton from '../ErrorBoundaryButton/ErrorBoundaryButton';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';
import AboutUs from '../AboutUs/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Search />}>
            <Route path="/" element={<HeroDetails />} />
          </Route>
          <Route path="about_us" element={<AboutUs />} />
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
        <ErrorBoundaryButton />
        <Link to="/about_us">About Us</Link>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
