import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GroupDetails from './pages/GroupDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group/:id" element={<GroupDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
