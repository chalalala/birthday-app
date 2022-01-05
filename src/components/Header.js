import { React } from 'react';

export default function Header() {
   return (
      <div className="header flex justify-space-between">
         <div className="flex align-center header__left">
            <span className="material-icons">menu</span>
            <span className="header__app-name">Birthday Calendar</span>
         </div>

         <div className="flex align-center header__right">
            <span className="material-icons">notifications</span>
            <span className="material-icons">account_circle</span>
         </div>         
      </div>
   )
}