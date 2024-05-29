import React from 'react'
import TableauEmbed from 'src/views/components/tableau/TableauVizComponent'

const TableauDashboard2: React.FC = () => {
  const embedCode =
    'https://public.tableau.com/views/dashboardsdppi_rkakl2/Dashboard2?:language=en-US&:display_count=n&:origin=viz_share_link'

  return <TableauEmbed tableauUrl={embedCode} />
}

export default TableauDashboard2
