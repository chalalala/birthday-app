import 'material-icons/iconfont/material-icons.css';
import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './utils/firebase';
import CalendarPage from './pages/calendar';
import RegisterPage from './pages/register';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
