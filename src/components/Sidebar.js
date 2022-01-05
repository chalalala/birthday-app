import React from 'react';

const SidebarLink = ({ icon, name, currentSite }) => {   
   return (
      <div className={`flex justify-center sidebar__link ${name === currentSite ? "active" : ""}`}>
         <span className="material-icons">{ icon }</span>
      </div>
   )
}

export default function Sidebar({ currentSite }) {
   return (
      <div className="flex flex-column sidebar">
         <SidebarLink icon="event" name="calendar" currentSite={currentSite} />
         <SidebarLink icon="list_alt" name="list" currentSite={currentSite} />
         <SidebarLink icon="settings" name="settings" currentSite={currentSite} />
      </div>
   )
}