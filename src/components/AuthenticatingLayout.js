import React from 'react';

export default function AuthenticatingLayout({ children, title }) {
   return (
      <div class="auth-wrapper">
         <div class="auth-form">
            <h1>{title}</h1>
            { children }
         </div>
      </div>
   )
}