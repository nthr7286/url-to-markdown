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

export const onSnapshotUrl = ({ docId, setOgp }) => {
  console.log('onSnapshotUrl')
  return urlsRef.doc(docId)
    .onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data()
        if (Object.entries(data).length > 2) {
          setOgp({ id: doc.id, ...data })
          return console.log("ogp loaded!")
        }
      } else {
        return console.error("ogp doesnot exists!")
      }
    })
}