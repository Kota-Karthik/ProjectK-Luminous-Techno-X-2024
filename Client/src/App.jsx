import './App.css';
import InputPage from './pages/InputPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPage />} />
      </Routes>
    </Router>
  );
}

export default App;
