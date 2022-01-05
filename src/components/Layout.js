import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children, currentSite }) {
   return (
      <React.Fragment>
         <Header />
         <div className="flex">
            <Sidebar currentSite={currentSite}/>
            <div className="page-content">
               { children }
            </div>
         </div>
      </React.Fragment>
   )
}