import React, { 
  Fragment,
  useState,
} from 'react'

import Grid from '@material-ui/core/Grid'

import InputUrl from './InputUrl'
import MarkedText from './MarkedText'
import Preview from './Preview'
import RecentPosts from './RecentPosts'
import useOgp from '../../hooks/useOgp'

export default function UrlToMarkdown () {
  const [docId, setDocId] = useState('')
  const [markedContent, setMarkedContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [ogp, setOgp] = useOgp({docId, setMarkedContent, setLoading })

  return (
    <Grid container justify="center">
      <Grid item sm={10} md={9}>
        <div className="mx-2">
          <InputUrl 
            setDocId={ setDocId }
            loading={ loading }
            setLoading={ setLoading }
            setMarkedContent={ setMarkedContent }
            setOgp={ setOgp }
          />
          { Object.entries(ogp).length
            ? <Fragment>
                <MarkedText markedContent={ markedContent } />
                <Preview markedContent={ markedContent } />
            </Fragment>
            : <RecentPosts />
          }
        </div>
      </Grid>
    </Grid>
  )
}