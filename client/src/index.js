import React from 'react'
import { render } from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, blue } from '@material-ui/core/colors'
import AppRouter from './routers/AppRouters';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./Components/index.css"
const theme = createMuiTheme({
  palette: {
    primary:{
    main: blue[500]
},
    secondary: red,
    type: 'light'
  },
  spacing: 10
})

render(
  <MuiThemeProvider theme={theme}>
    <AppRouter />
  </MuiThemeProvider>,
  document.getElementById('root')
)
