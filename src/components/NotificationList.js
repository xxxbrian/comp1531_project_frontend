import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/Inbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AuthContext from '../AuthContext';

export default function NotificationList() {

  const [open, setOpen] = React.useState(false);
  const [notifs, setNotifs] = React.useState([]);
  const buttonRef = React.useRef();
  const token = React.useContext(AuthContext);

  React.useEffect(() => {
    axios
      .get('/notifications/get/v1', {
        params: { token },
      })
      .then(({ data }) => {
        setNotifs(data.notifications);
      })
      .catch((err) => { });
  }, [open]);

  const handleClick = (event) => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        ref={buttonRef}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <InboxIcon />
        Notifications
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={buttonRef.current}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {notifs.length === 0
          ? <div>&nbsp;You don't have any notifications.&nbsp;</div>
          : notifs.map((notif) => {
            if (notif.dm_id === -1) {
              return (
                <MenuItem component={Link} to={`/channel/${notif.channel_id}`}>
                  {notif.notification_message}
                </MenuItem>
              )
            } else {
              return (
                <MenuItem component={Link} to={`/dm/${notif.dm_id}`}>
                  {notif.notification_message}
                </MenuItem>
              )
            }
          })}
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </div>
  );
}