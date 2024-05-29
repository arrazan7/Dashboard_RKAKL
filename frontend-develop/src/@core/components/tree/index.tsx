import { DocumentNode } from '../../dto/document.dto'
import Box from '@mui/material/Box'
import { Grid, TextField } from '@mui/material'

type TreeNodeProps = {
  index: number
  node: DocumentNode
}
const TreeNode = (props: TreeNodeProps) => {
  const { node } = props

  return (
    <Grid item xs={12}>
      <Box marginLeft={10} sx={{ mt: 5 }}>
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
        {node.children &&
          node.children.map((child, index) => {
            return <TreeNode key={child.value} node={child} index={index} />
          })}
      </Box>
    </Grid>
  )
}

export default TreeNode
