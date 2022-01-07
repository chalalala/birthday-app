import 'material-icons/iconfont/material-icons.css';
import './styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './utils/firebase';
import { SnackbarProvider } from 'notistack';
import CalendarPage from './pages/calendar';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import ProtectedPage from './components/AuthenticatingRoute';

function App() {
  return (
    <AuthContextProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedPage> <CalendarPage /> </ProtectedPage>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;
