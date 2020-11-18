import { db } from '../util/firebase'

const urlsRef = db.collection('urls')

export const addUrl = ({ url, setDocId }) => {
  urlsRef
    .add({
      url,
      createdAt: new Date().toISOString(),
    })
    .then(doc => {
      setDocId(doc.id)
      return console.log("url added!", doc.id)
    })
    .catch(err => console.error(err))
}

export const onSnapshotUrl = ({ docId, setOgp, dispatch, setLoading }) => {
  console.log('onSnapshotUrl')
  return urlsRef.doc(docId)
    .onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data()
        const dataLength = Object.entries(data).length
        if ( dataLength > 2) {
          const { error } = data
          if (error) {
            if (error === "URL") {
              dispatch({ type: 'SET_FLASH', payload: { severity: "error", message: "invalid url!" }})
            } else if (error === "OGP") {
              dispatch({ type: 'SET_FLASH', payload: { severity: "error", message: "No properties to mark!" }})
            }
            return setLoading(false)
          }
          setOgp({ id: doc.id, ...data })
          dispatch({ type: 'SET_FLASH', payload: { severity: "success", message: "complete" }})
          console.log("complete!")
          return setLoading(false)
        } else if (dataLength > 0) {
          dispatch({ type: 'SET_FLASH', payload: { severity: "info", message: "url accepted!, fetching data..." }})
          return console.log("fetching ogp data...")
        } else {
          return console.error("Listening...")
        }
      } 
    })
}