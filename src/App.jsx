import Dashboard from "./pages/Dashboard.jsx";
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}