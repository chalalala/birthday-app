import React from 'react';
import { useSignOut } from '../../utils/auth';
import IconButton from '@mui/material/IconButton';
import { AccountCircle, Logout, Notifications } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Header() {
  const signout = useSignOut();
  const buttonStyle = {
    color: 'white',
  };

  return (
    <div className="header flex justify-space-between">
      <div className="flex align-center header__left">
        {/* <span className="material-icons">menu</span> */}
        <Link
          to="/"
          className="header__app-name"
        >
          Birthday Calendar
        </Link>
      </div>

      <div className="flex align-center header__right">
        {/* <IconButton sx={buttonStyle}>
          <Notifications />
        </IconButton>

        <IconButton sx={buttonStyle}>
          <AccountCircle />
        </IconButton> */}

        <IconButton
          onClick={() => signout()}
          sx={buttonStyle}
        >
          <Logout />
        </IconButton>
      </div>
    </div>
  );
}
