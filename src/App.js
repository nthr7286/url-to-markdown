import React, { 
  Fragment,
  useState,
  useEffect,
  useRef
} from 'react'
import marked from 'marked'
import axios from 'axios'

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

import LinearProgress from '@material-ui/core/LinearProgress'

import './App.scss'

import { db, Timestamp } from './util/firebase'
import { AirlineSeatLegroomReducedOutlined } from '@material-ui/icons';

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

const urlsRef = db.collection('urls')

export const addUrl = ({ url, setDocId }) => {
  urlsRef
  .add({
    url,
    createdAt: new Date().toISOString(),
   })
  .then(doc => {
    setDocId(doc.id)
    return console.log("url successfully added!", doc.id)
  })
  .catch(err => console.error(err))
}

// const textsRef = db.collection('texts')
// const useText =  ({ url }) => {
//   const initialState = {
//     id: '',
//     createdAt: '',
//     url: '',
//     text: '',
//   }
//   const [text, setText] = useState(initialState)
//   useEffect(() => {
//     console.log("useText")
//     if (docId) {
//       const unsubscribe = textsRef.doc(docId)
//       .onSnapshot(doc => {
//         if (doc.exists) {
//           setText({ id: doc.id, ...doc.data() })
//           return console.log("Text data successfully loaded", docId)
//         } else {
//           return console.error("Text not exists.")
//         }
//      })
//      return () => unsubscribe()
//     }
//   }, [docId])
//   return text
// }

export default function App() {
  const [url, setUrl] = useState('')
  const [markedContent, setMarkedContent] = useState('')
  const [ogp, setOgp] = useState({})
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const textsRef = db.collection('texts')
  const [docId, setDocId] = useState('')
  useEffect(() => {
    console.log("useText")
    if (docId) {
      const unsubscribe = textsRef.doc(docId)
      .onSnapshot(doc => {
        if (doc.exists) {
          setText(doc.data().text)
          return console.log("Text data successfully loaded", docId)
        } else {
          return console.error("Text not exists.")
        }
     })
     return () => unsubscribe()
    }
  }, [docId])
  useEffect(() => {
    if (text) {
      try {
        const el = new DOMParser().parseFromString(text, "text/html")
        const headEls = (el.head.children)
        let obj = {}
        Array.from(headEls).forEach(v => {
            const key = v.getAttribute('property')?.split('og:')[1]
            if (!key) return;
            const value = v.getAttribute("content")
            obj[key] = value
        })
        setOgp(obj)
        setLoading(false)
      } catch (e) {
        console.error(e)
      }
    }
  }, [text])
  const handleClear = () => {
    setUrl('')
    setMarkedContent('')
    setOgp('')
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (!url) return console.error('URL must not be empty!')
    setLoading(true)
    addUrl({ url, setDocId })
      // axios.get("/text", { params: { url } })
      // .then(res => res.data.text)
      // .then(text => {
      //   const el = new DOMParser().parseFromString(text, "text/html")
      //   const headEls = (el.head.children)
      //   let obj = {}
      //   Array.from(headEls).forEach(v => {
      //       const key = v.getAttribute('property')?.split('og:')[1]
      //       if (!key) return;
      //       const value = v.getAttribute("content")
      //       obj[key] = value
      //   })
      //   setOgp(obj)
      //   setLoading(false)
      // })
      // .catch(err => {
      //   console.error(err)
      // })
  }
  const handleChange = e => {
    e.preventDefault()
    setUrl(e.target.value)
  }
  useEffect(() => {
    const { title, description, site_name } = ogp
    if (Object.entries(ogp).length) {
      setMarkedContent(`##### ${title}\n\n --- \n\n ###### ${description}\n\n ソース元：[${site_name ? site_name : '外部リンク'}](${url})`)
    }
  }, [ogp, url])

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
          // className="mb-2 bg-transparent"
          className="mb-2 bg-transparent"
        >
          <Toolbar>
            <Typography variant="h6" style={{ userSelect: 'none' }}>
              URL to Markdown
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Grid item sm={10} md={9}>
            <div className="mx-2">
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
              { Object.entries(ogp).length
                ? <Fragment>
                    <Card className="mb-2">
                      <CardHeader
                        title="Marked Text"
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
                              readOnly
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
                    <Card className="mb-2">
                      <CardHeader
                        title="Preview"
                        titleTypographyProps={{ 'style': { userSelect: 'none' } }}
                      />
                      <CardContent
                        style={{ userSelect: 'none' }}
                        dangerouslySetInnerHTML={{ __html: marked(markedContent) }} 
                      />
                    </Card>
                </Fragment>
                : null
              }
            </div>
          </Grid>
        </Grid>
    </ThemeProvider>
    </Fragment>
  )
}