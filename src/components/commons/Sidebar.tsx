import React from 'react';
import { SidebarLink } from './SidebarLink';

interface Props {
  currentSite: string;
}

export default function Sidebar(props: Props) {
  const { currentSite } = props;

  return (
    <div className="flex flex-column sidebar">
      <SidebarLink
        to="/"
        icon="event"
        name="calendar"
        currentSite={currentSite}
      />
      <SidebarLink
        to="/list"
        icon="list_alt"
        name="list"
        currentSite={currentSite}
      />
      <SidebarLink icon="settings" name="settings" currentSite={currentSite} />
    </div>
  );
}
