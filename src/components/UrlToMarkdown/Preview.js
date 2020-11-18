import React from 'react'
import marked from 'marked'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

export default function Preview ({ markedContent }) {
  return (
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
  )
}