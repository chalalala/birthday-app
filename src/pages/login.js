import React from 'react';
import AuthenticatingLayout from '../components/AuthenticatingLayout';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
   const handleSubmit = async (e) => {
      e.preventDefault();

      const { email, password } = e.target.elements;
      const auth = getAuth();
      try {
         await signInWithEmailAndPassword(auth, email.value, password.value);
         console.log("Logged in");
      }
      catch (e) {
         alert(e.message);
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="form__field">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="name@domain.com" />
         </div>

         <div className="form__field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
         </div>

         <button type="submit">Submit</button>
      </form>
   )
}

export default function LoginPage() {
   return (
      <AuthenticatingLayout title="Sign In">
         <p>Don't have an account? <a className="form__link">Sign up</a></p>
         <LoginForm />
      </AuthenticatingLayout>
   )
}