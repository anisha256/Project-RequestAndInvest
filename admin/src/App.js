import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import User from './pages/User';
import Home from './pages/Home';
import Admins from './pages/Admins';
import Projects from './pages/Projects';
function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/users" element={<User />} />
            <Route path="/projects" element={<Projects />} />

            <Route path="/admins" element={<Admins />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
