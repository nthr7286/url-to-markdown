import React, { 
  useState,
} from 'react'

import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'

import Divider from '@material-ui/core/Divider'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ForwardIcon from '@material-ui/icons/Forward'
import ClearIcon from '@material-ui/icons/Clear'

import LinearProgress from '@material-ui/core/LinearProgress'

import { addUrl } from '../../handlers/urls'


export default function InputUrl ({ setDocId, loading, setLoading, setMarkedContent, setOgp }) {
  const [url, setUrl] = useState('')
  const handleSubmit = e => {
    e.preventDefault();
    if (!url) return console.error('URL must NOT be empty!')
    setLoading(true)
    addUrl({ url, setDocId })
  }
  const handleChange = e => {
    e.preventDefault()
    setUrl(e.target.value)
  }
  const handleClear = () => {
    setUrl('')
    setMarkedContent('')
    setOgp('')
  }

  return (
    <Paper
      component="form"
      onSubmit={ handleSubmit }
      className="mb-2"
    >
      <div
        className="d-flex align-items-center py-2 px-3"
      >
        <InputBase
          className="ml-2"
          style={{ flex: 1 }}
          placeholder="Please Input a valid URL... and Click MARKDOWN Button"
          value={ url }
          onChange={ handleChange }
          inputProps={{ 'aria-label': 'input URL' }}
          autoFocus
        />
        <IconButton size="small" onClick={ handleClear }>
          <ClearIcon />
        </IconButton>
        <Divider
          className="m-1"
          style={{ height: '28px' }}
          orientation="vertical"
        />
        <Button
          type="submit"
          color="primary"
          startIcon={<ForwardIcon />}
          children="markdown"
        />
      </div>
      { loading 
        ? <LinearProgress 
            stye={{
              width: '100%',
            }}
          />
        : <div style={{ height: '4px' }} />
      }
    </Paper>
  )
}