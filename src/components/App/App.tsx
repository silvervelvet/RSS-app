import './App.css';
import Search from '../Search/Search';
import ErrorBoundary from '../ErrorResponse/ErrorResponse';
import ErrorBoundaryButton from '../ErrorBoundaryButton/ErrorBoundaryButton';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Search />}></Route>
        </Routes>
        <ErrorBoundaryButton />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
