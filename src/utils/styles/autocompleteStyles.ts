import { createStyles } from '@material-ui/core/styles'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStylesAutocomplete = makeStyles(() =>
  createStyles({
    popper: {
      top: 50,
    },
  }),
)

export default useStylesAutocomplete
