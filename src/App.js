import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/auth/Form';
import Home from './pages/Home';
import Login from './pages/auth/Login';

import Navbar from './components/navbar/Navbar';
import Register from './pages/auth/Register';
import RequestForm from './pages/RequestForm';
import Profile from './pages/profile/Profile';

import Feed from './pages/Feed';
import Drafts from './pages/draft/Drafts';
// import DraftTable from './pages/draft/DraftTable';
// import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      {/* <AuthProvider> */}
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/drafts/table" element={<DraftTable />} /> */}

          <Route path="/feed" element={<Feed />} />
          <Route path="/drafts" element={<Drafts />} />

          <Route path="/apply/project" element={<RequestForm />} />
        </Routes>
      </div>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
