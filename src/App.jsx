import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Evaluation from './pages/evaluation';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evaluation" element={<Evaluation />} />
      </Routes>
    </>
  );
}

export default App;