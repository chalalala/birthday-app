import 'material-icons/iconfont/material-icons.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarPage from './pages/calendar';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import './styles/main.scss';
import { AuthContextProvider } from './utils/firebase';

function App() {
  return (
    <AuthContextProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <Router>
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;
