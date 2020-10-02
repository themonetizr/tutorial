
import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
 spacing: 4,
 palette: {
   primary: {
     main: '#002e74',
   },
   secondary: {
     main: '#19857b',
   },
   error: {
     main: red.A400,
   },
   background: {
     default: '#fff',
     modal: '#272331'
   },
 },
});

export default theme;
