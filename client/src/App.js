import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RequestForm from './pages/draft/RequestForm';
import Profile from './pages/profile/Profile';
import Feed from './pages/Feed';
import Form from './pages/Form';
import EditProfile from './pages/profile/EditProfile';
import DraftTable from './pages/draft/DraftTable';
import DraftDetail from './pages/draft/DraftDetail';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            {!localStorage.getItem('refreshItem') && (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/register" element={<Register />} />

            <Route path="/form" element={<Form />} />

            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/apply/project" element={<RequestForm />} />
            <Route path="/drafts/table" element={<DraftTable />} />
            <Route path="/drafts/table/:id/details" element={<DraftDetail />} />
            <Route path="/draft/:id/edit" element={<RequestForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
