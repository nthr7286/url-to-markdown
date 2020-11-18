import { useState, useEffect } from 'react'
import os from 'os'
import { onSnapshotUrl } from '../handlers/urls'
import { useFlashDispatch } from '../context/flash'

export default ({ docId, setMarkedContent, setLoading }) => {
  const [ogp, setOgp] = useState({})
  const dispatch = useFlashDispatch()
  useEffect(() => {
    if (docId) {
     return onSnapshotUrl({ docId, setOgp, dispatch, setLoading })
    }
  }, [docId, dispatch, setLoading])
  useEffect(() => {
    const { title, description, site_name, url } = ogp
    if (Object.entries(ogp).length) {
      const eol = os.EOL + os.EOL
      setMarkedContent(`##### ${title + eol}---${eol}###### ${description + eol}ソース元：[${site_name ? site_name : '外部リンク'}](${url})`)
    }
  }, [ogp, setMarkedContent])
  return ([ogp, setOgp, dispatch])
}