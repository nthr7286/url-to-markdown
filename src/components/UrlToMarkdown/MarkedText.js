import React, { 
  useRef
} from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import FileCopyIcon from '@material-ui/icons/FileCopy'

export default ({ markedContent }) => {
  const inputRef = useRef();
  const copyToClipboard = () => {
      inputRef.current.select()
      if (document.execCommand("copy")) {
        document.execCommand("copy")
        console.log('Marked text is succesfully copied')
      } else {
        console.error('The browser is NOT supported! Please use Chrome!')
      }
      inputRef.current.blur()
  }
  return (
    <Card className="mb-2">
      <CardHeader
        title="Marked Text"
        titleTypographyProps={{ 'style': { userSelect: 'none' } }}
        action={
          <IconButton
            color="primary"
            onClick={ copyToClipboard }
            children={ <FileCopyIcon /> }
          />
        }
      />
      <CardContent>
        <TextField 
          value={ markedContent }
          inputProps={{ 'ref':  inputRef }}
          variant="outlined"
          multiline
          rows={10}
          readOnly 
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button 
          color="primary"
          onClick={ copyToClipboard }
          startIcon={<FileCopyIcon />}
          aria-label="copy to clipboard"
          children="copy to clipboard"
        />
      </CardActions>
    </Card>
  )
}