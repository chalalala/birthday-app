import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticatingLayout from '../components/commons/AuthenticatingLayout';
import '../styles/pages/authPage.scss';

const LoginForm = () => {
  let navigate = useNavigate();
  // const [remember, setRemember] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      navigate('/');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@domain.com"
        />
      </div>

      <div className="form__field">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      {/* <div className="form__field flex align-center">
            <input id="rememberMe" type="checkbox" onChange={(e) => setRemember(e.target.value)}></input>
            <label htmlFor="rememberMe">Remember me</label>
         </div> */}

      <button className="primary-button" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default function LoginPage() {
  return (
    <AuthenticatingLayout title="Sign In">
      <div>
        Don't have an account?{' '}
        <Link to="/register" className="form__link">
          Sign up
        </Link>
      </div>
      <LoginForm />
    </AuthenticatingLayout>
  );
}
