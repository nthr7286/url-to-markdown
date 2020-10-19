import React, { 
  Fragment,
  useState,
  useEffect,
  useRef
} from 'react'
import marked from 'marked'

import CssBaseLine from '@material-ui/core/CssBaseline'
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'

import Divider from '@material-ui/core/Divider'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ForwardIcon from '@material-ui/icons/Forward'
import ClearIcon from '@material-ui/icons/Clear'
import FileCopyIcon from '@material-ui/icons/FileCopy'

import Typography from '@material-ui/core/Typography'

import './App.scss'

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

const og = {
  title: '日本ーベトナム首脳会談 菅首相 中国を念頭に緊密連携呼びかけ | NHKニュース',
  description: '【NHK】ベトナムを訪れている菅総理大臣は、フック首相との首脳会談に臨み南シナ海への進出を強める中国を念頭に、自由で開かれたインド…',
  site_name: 'NHKニュース',
  url: 'https://www3.nhk.or.jp/news/html/20201019/k10012670281000.html',
}

export default function App() {
  const [url, setUrl] = useState('')
  const [markedContent, setMarkedContent] = useState('')
  const handleSubmit = e => {
    alert('submit' + url);
    e.preventDefault();
  }
  const handleChange = e => {
    e.preventDefault()
    setUrl(e.target.value)
  }
  useEffect(() => {
    const { title, description, site_name, url } = og
    setMarkedContent(`##### ${title}\n\n --- \n\n ###### ${description}\n\n ソース元：[${site_name}](${url})`)
  }, [og])

  const inputRef = useRef();
  const copyToClipboard = () => {
    const copyText = inputRef.current.value;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText).then(
        () => {
          console.log("copy success", copyText);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      inputRef.current.select();
      console.log(document.execCommand("copy")); //true
      document.execCommand("copy");
    }
  }
  return (
    <Fragment>
      <CssBaseLine />
      <ThemeProvider theme={ theme }>
        <AppBar
          position="static"
          style={{ boxShadow: 'none'}}
          className="mb-4 bg-transparent"
        >
          <Toolbar>
            <Typography variant="h6" style={{ userSelect: 'none' }}>
              URL to MarkDown
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Grid item sm={10} md={9}>
            <Paper
              component="form"
              className="d-flex align-items-center py-2 px-3 mb-4"
              onSubmit={ handleSubmit }>
                <InputBase
                  className="ml-2"
                  style={{ flex: 1 }}
                  placeholder="Please Input a valid URL... and Click TRANSLATE Button"
                  value={ url }
                  onChange={ handleChange }
                  inputProps={{ 'aria-label': 'input URL' }}
                  autoFocus
                />
                <IconButton size="small">
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
                  children="translate"
                />
            </Paper>
            <Card className="mb-4">
              <CardHeader
                title="Generated Code"
                titleTypographyProps={{ 'style': { userSelect: 'none' } }}
                action={<div>
                    <IconButton
                      color="primary"
                      onClick={ copyToClipboard }
                      children={ <FileCopyIcon /> }
                    />
                    <input 
                      className="d-none"
                      ref={ inputRef }
                      value={ markedContent }
                    />
                </div>}
              />
              <CardContent>
                <Typography
                  className="text-wrap text-break"
                  style={{ userSelect: 'none'}}
                  children={ markedContent }
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
            <Card className="mb-4">
              <CardHeader
                title="Preview"
                titleTypographyProps={{ 'style': { userSelect: 'none' } }}
              />
              <CardContent
                style={{ userSelect: 'none' }}
                dangerouslySetInnerHTML={{ __html: marked(markedContent) }} 
              />
            </Card>
          </Grid>
        </Grid>
    </ThemeProvider>
    </Fragment>
  )
}