import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TreeView } from '@mui/x-tree-view/TreeView'

import Icon from 'src/@core/components/icon'
import { Grid, Typography } from '@mui/material'
import { DocumentNode } from 'src/@core/dto/document.dto'

type TreeViewProps = {
  index: number
  node: DocumentNode
}

const TreeViewComponent = (props: TreeViewProps) => {
  const { node } = props

  const renderTree = (nodes: any, index: number) => {
    return (
      <>
        <Typography>Import Data</Typography>
        <Grid key={nodes} sx={{ paddingLeft: 5 }}>
          <Box>
            <TextField label='Tipe' variant='outlined' name='type' value={node.type} fullWidth margin='normal' />
            <TextField label='Data' variant='outlined' name='data' value={node.data} fullWidth margin='normal' />
            <TextField label='Volume' variant='outlined' name='volume' value={node.volume} fullWidth margin='normal' />
            <TextField
              label='Biaya'
              variant='outlined'
              name='amount'
              value={node.amount.toLocaleString('id-ID')}
              fullWidth
              margin='normal'
            />
            <TextField
              label='Total Biaya'
              variant='outlined'
              name='amount'
              value={`Rp. ${node.totalAmount.toLocaleString('id-ID')}`}
              fullWidth
              margin='normal'
            />
          </Box>
        </Grid>
      </>
    )
  }
  return (
    // <Box sx={{ minHeight: 180, flexGrow: 1 }} fullWidth>
    <TreeView
      aria-label='file system navigator'
      defaultCollapseIcon={<Icon icon='material-symbols:expand-less' />}
      defaultExpandIcon={<Icon icon='ooui:expand' />}
    >
      {node.children && node.children.map((child, index) => renderTree(node, index))}
      {/* {node.children.map((index, node) => renderTree(node))} */}
      {/* // return <TreeNode key={child.value} node={child} index={index} /> */}
    </TreeView>
    // </Box>
  )
}

export default TreeViewComponent
