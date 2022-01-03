import React from 'react';

const SidebarLink = ({ icon, active }) => {
   return (
      <div className={`flex justify-center sidebar__link ${active ? "active" : ""}`}>
         <span className="material-icons">{ icon }</span>
      </div>
   )
}

export default function Sidebar() {
   return (
      <div className="flex flex-column sidebar">
         <SidebarLink icon="event" active={true} />
         <SidebarLink icon="list_alt" />
         <SidebarLink icon="settings" />
      </div>
   )
}