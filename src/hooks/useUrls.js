import { useState, useEffect } from 'react'
import { getUrls } from '../handlers/urls'

export default () => {
  const [urls, setUrls] = useState([])
  useEffect(() => {
    const unsubscribe = getUrls({ setUrls })
    return () => unsubscribe
  }, [])
  return urls
}