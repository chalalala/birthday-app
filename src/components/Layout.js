import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
   return (
      <React.Fragment>
         <Header />
         <div className="flex">
            <Sidebar />
            <div className="page-content">
               { children }
            </div>
         </div>
      </React.Fragment>
   )
}