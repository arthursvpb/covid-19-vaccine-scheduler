import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Routes from './routes';

const theme = createMuiTheme({
  typography: {
    fontFamily: `'Nunito', 'sans-serif'`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
