import './App.css';
import InputPage from './pages/InputPage';
import { useState } from 'react';

function App() {
  const [savedResponse, setSavedResponse] = useState(null);

  return (
    <>
      <InputPage setSavedResponse={setSavedResponse}/>
    </>
  );
}

export default App;
