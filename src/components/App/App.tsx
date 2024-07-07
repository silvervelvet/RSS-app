import './App.css';
import Search from '../Search/Search';
import ErrorBoundary from '../ErrorResponse/ErrorResponse';
import ErrorBoundaryButton from '../ErrorBoundaryButton/ErrorBoundaryButton';

function App() {
  return (
    <ErrorBoundary>
      <Search />
      <ErrorBoundaryButton />
    </ErrorBoundary>
  );
}

export default App;
