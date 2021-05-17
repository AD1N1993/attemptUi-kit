import makeStyles from '@material-ui/core/styles/makeStyles'

const useStylesDataGrid = makeStyles({
  root: {
    padding: 0,
    '& .MuiDataGrid-window': {
      '@media (min-width: 576px)': {
        overflowX: 'hidden',
      },
    },
    '& .MuiDataGrid-row': {
      cursor: 'pointer',
    },
    '& .MuiDataGrid-colCell:focus': {
      outline: 'none',
    },
  },
})

export default useStylesDataGrid
