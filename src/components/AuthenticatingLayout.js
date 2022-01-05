import React from 'react';

export default function AuthenticatingLayout({ children, title }) {
   return (
      <div className="auth-wrapper">
         <div className="auth-form">
            <div className="flex flex-column align-center auth-form__inner">
               <h1>{title}</h1>
               { children }
            </div>
         </div>
      </div>
   )
}