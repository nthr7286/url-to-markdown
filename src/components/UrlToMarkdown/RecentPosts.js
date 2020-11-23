import React from 'react'

import useUrls from '../../hooks/useUrls'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubhedder from '@material-ui/core/ListSubheader'

import { dayjs } from '../../util/dayjs'

const RecentPost = ({ ogp }) => {
  const { title, site_name, url, createdAt } = ogp
  return (
    <ListItem button component="a" href={ url } target="_blank">
      <ListItemText 
        primary={ title }
        secondary={`${dayjs().to(createdAt)} ${ site_name }`}
      />
    </ListItem>
  )
}

export default function RecentPosts() {
  const urls = useUrls()
  let urlsMarkup = urls.length > 0
  ? <div>
    { urls.map(ogp => <RecentPost key={ ogp.id } ogp={ ogp } />)}
  </div>
  : <ListItem>
      <ListItemText primary='loading...' />
    </ListItem>
  return (
    <Paper>
      <List>
        <ListSubhedder>Recent Posts</ListSubhedder>
        { urlsMarkup }
      </List>
    </Paper>
  )
}