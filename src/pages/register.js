import React from 'react';
import AuthenticatingLayout from '../components/AuthenticatingLayout';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import '../styles/pages/authPage.scss';

const RegisterForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      enqueueSnackbar('Register successfully.', { variant: 'success' });
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

      <button className="primary-button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default function RegisterPage() {
  return (
    <AuthenticatingLayout title="Sign Up">
      <div>
        Already have an account?{' '}
        <Link to="/login" className="form__link">
          Sign in
        </Link>
      </div>
      <RegisterForm />
    </AuthenticatingLayout>
  );
}
