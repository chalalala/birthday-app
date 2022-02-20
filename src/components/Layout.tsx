import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
   children: any,
   currentSite: string
}

export default function Layout(props: Props) {
   const { children, currentSite } = props;
   
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