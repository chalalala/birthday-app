import 'material-icons/iconfont/material-icons.css';
import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './utils/firebase';
import CalendarPage from './pages/calendar';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProtectedPage from './components/AuthenticatingRoute';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedPage> <CalendarPage /> </ProtectedPage>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
