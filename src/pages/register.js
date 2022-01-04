import React from 'react';
import AuthenticatingLayout from '../components/AuthenticatingLayout';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterForm = () => {
   const handleSubmit = async (e) => {
      e.preventDefault();

      const { email, password } = e.target.elements;
      const auth = getAuth();
      try {
         await createUserWithEmailAndPassword(auth, email.value, password.value);
      }
      catch (e) {
         alert(e.message);
      }
   }

   return (
      <form onSubmit={handleSubmit}>
         <div className="form__field">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="name@domain.com" />
         </div>

         <div className="form__field">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
         </div>

         <button type="submit">Submit</button>
      </form>
   )
}

export default function RegisterPage() {
   return (
      <AuthenticatingLayout title="Sign Up">
         <p>Already have an account? <a className="form__link">Sign in</a></p>
         <RegisterForm />
      </AuthenticatingLayout>
   )
}