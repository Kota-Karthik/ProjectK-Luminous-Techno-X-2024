import './App.css';
import InputPage from './pages/InputPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultPage from './pages/ResultPage';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
