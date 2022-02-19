import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ icon, name, currentSite, to = '/' }) => {   
   return (
      <Link to={to} className={`flex justify-center sidebar__link ${name === currentSite ? "active" : ""}`}>
            <span className="material-icons">{ icon }</span>
      </Link>
   )
}

export default function Sidebar({ currentSite }) {
   return (
      <div className="flex flex-column sidebar">
         <SidebarLink to="/" icon="event" name="calendar" currentSite={currentSite} />
         <SidebarLink to="/list" icon="list_alt" name="list" currentSite={currentSite} />
         <SidebarLink icon="settings" name="settings" currentSite={currentSite} />
      </div>
   )
}