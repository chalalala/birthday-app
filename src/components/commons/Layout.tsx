import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: any;
  currentSite: string;
}

export default function Layout(props: Props) {
  const { children, currentSite } = props;

  return (
    <div className="flex flex-column min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar currentSite={currentSite} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
