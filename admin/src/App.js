import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import User from './pages/User';
import Home from './pages/Home';
import Admins from './pages/admin/Admins';
import Projects from './pages/project/Projects';
import Auth from './pages/Auth';
import ProjectRequests from './pages/project/RequestLists';
import GrantedLists from './pages/project/GrantedLists';
import RejectedLists from './pages/project/Rejected';
import Delete from './pages/admin/Delete';
import Detail from './pages/project/Detail';
function App() {
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <>
      <Router>
        <div>
          {localStorage.getItem('role') && <Topbar />}
          <div className="container">
            <Sidebar />
            <Routes>
              {!refreshToken && <Route path="/auth" element={<Auth />} />}
              <Route exact path="/" element={<Home />} />
              <Route path="/users" element={<User />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/delete" element={<Delete />} />
              <Route path="/project/requested" element={<ProjectRequests />} />
              <Route
                path="/project/requested/:id/detail"
                element={<Detail />}
              />

              <Route path="/project/granted" element={<GrantedLists />} />
              <Route path="/project/rejected" element={<RejectedLists />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
