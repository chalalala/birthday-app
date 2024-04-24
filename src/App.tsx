import 'material-icons/iconfont/material-icons.css';
import { SnackbarProvider } from 'notistack';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from './pages/list';
import CalendarPage from './pages/calendar';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { PATH } from './constants/path';
import { BirthdayListContextProvider } from './contexts/BirthdayListContext';
import { AuthContextProvider } from './contexts/AuthContext';
import './styles/main.scss';

function App() {
  return (
    <AuthContextProvider>
      <BirthdayListContextProvider>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
        >
          <Router>
            <Routes>
              <Route
                path={PATH.index}
                element={<CalendarPage />}
              />
              <Route
                path={PATH.register}
                element={<RegisterPage />}
              />
              <Route
                path={PATH.login}
                element={<LoginPage />}
              />
              <Route
                path={PATH.birthdayList}
                element={<ListPage />}
              />
            </Routes>
          </Router>
        </SnackbarProvider>
      </BirthdayListContextProvider>
    </AuthContextProvider>
  );
}

export default App;
