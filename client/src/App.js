import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './pages/Form';
import Home from './pages/Home';
import Login from './pages/Login';

import Navbar from './components/navbar/Navbar';
import Register from './pages/Register';
import RequestForm from './pages/RequestForm';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/apply/project" element={<RequestForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
