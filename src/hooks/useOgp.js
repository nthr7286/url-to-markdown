import { useState, useEffect } from 'react'
import os from 'os'
import { onSnapshotUrl } from '../handlers/urls'

export default ({ docId, setMarkedContent, setLoading }) => {
  const [ogp, setOgp] = useState({})
  useEffect(() => {
    if (docId) {
     return onSnapshotUrl({ docId, setOgp })
    }
  }, [docId])
  useEffect(() => {
    const { title, description, site_name, url } = ogp
    if (Object.entries(ogp).length) {
      const eol = os.EOL + os.EOL
      setMarkedContent(`##### ${title + eol}---${eol}###### ${description + eol}ソース元：[${site_name ? site_name : '外部リンク'}](${url})`)
      setLoading(false)
    }
  }, [ogp, setMarkedContent, setLoading])
  return ([ogp, setOgp])
}