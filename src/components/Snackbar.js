import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useFlashState, useFlashDispatch } from '../context/flash'
    
const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

export default function CostumizedSnackbar() {
  const flash = useFlashState()
  const dispatch = useFlashDispatch()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    dispatch({ type: 'RESET_FLASH' })
  }
  return (
    <Snackbar 
      anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}
      open={ flash.open }
      autoHideDuration={ 6000 }
      onClose={ handleClose }
    >
      <Alert onClose={ handleClose } severity={ flash.severity }>
        { flash.message }
      </Alert>
    </Snackbar>
  );
}