import { React } from 'react';

export default function Header() {
   return (
      <div class="header flex justify-space-between">
         <div class="flex align-center header__left">
            <span class="material-icons">menu</span>
            <span class="header__app-name">Birthday Calendar</span>
         </div>

         <div class="flex header__right">
            <span class="material-icons">notifications</span>
            <span class="material-icons">account_circle</span>
         </div>         
      </div>
   )
}