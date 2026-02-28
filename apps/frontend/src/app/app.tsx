// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import CustomerList from '../components/CustomerList';
import ErrorBoundary from '../components/ErrorBoundary';

export function App() {
  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <ErrorBoundary>
        <CustomerList />
      </ErrorBoundary>
    </main>
  );
}

export default App;
