// components/TableauEmbed.js
import React from 'react'

interface tableauProps {
  tableauUrl: any
}
const TableauEmbed = (props: tableauProps) => {
  const { tableauUrl } = props
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <iframe title='Tableau Visualization' src={tableauUrl} width='100%' height='100%' frameBorder='0'></iframe>
    </div>
  )
}

export default TableauEmbed
