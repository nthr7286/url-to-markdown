import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'

export default function Header() {
  return (
    <AppBar
      position="static"
      className="mb-2 bg-transparent shadow-none"
    >
      <Toolbar>
        <Typography variant="h6" className="user-select-none">
          URL to Markdown
        </Typography>
      </Toolbar>
    </AppBar>
  )
}