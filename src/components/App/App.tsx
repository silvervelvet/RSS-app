import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from '../Search/Search';
import HeroDetails from '../HeroDetails/HeroDetails';
import ErrorBoundary from '../ErrorResponse/ErrorResponse';
import ErrorBoundaryButton from '../ErrorBoundaryButton/ErrorBoundaryButton';
import ErrorNotFound from '../ErrorNotFound/ErrorNotFound';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Search />}>
            <Route path="/" element={<HeroDetails />} />
          </Route>
          <Route path="*" element={<ErrorNotFound />} />
        </Routes>
        <ErrorBoundaryButton />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
