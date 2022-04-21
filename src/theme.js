import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#255e9b',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      paper: '#0a1929',
      default: '#0a1929',
    },
    text: {
      primary: '#e7ebf0',
    },
  },
});

export default theme;