import React, { 
  Fragment,
} from 'react'

import CssBaseLine from '@material-ui/core/CssBaseline'
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

import './App.scss'

import Header from './components/Header'
import UrlToMarkdown from './components/UrlToMarkdown'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export default function App() {
  return (
    <Fragment>
      <CssBaseLine />
      <ThemeProvider theme={ theme }>
        <Header />
        <UrlToMarkdown />
    </ThemeProvider>
    </Fragment>
  )
}