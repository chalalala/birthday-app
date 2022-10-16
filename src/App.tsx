import 'material-icons/iconfont/material-icons.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import ListPage from './pages/list';
import CalendarPage from './pages/calendar';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import './styles/main.scss';
import { PATH } from './constants/path';

function App() {
  return (
    <AuthContextProvider>
      <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
        <Router basename="birthday-app">
          <Routes>
            <Route path={PATH.index} element={<CalendarPage />} />
            <Route path={PATH.register} element={<RegisterPage />} />
            <Route path={PATH.login} element={<LoginPage />} />
            <Route path={PATH.birthdayList} element={<ListPage />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;
