import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    backgroundColor: '#c4ffe4',
    color: '#33634d',
    zIndex: 9999,
  },
  pathSelected: {
    color: '#33634d',
    backgroundColor: '#b8ebd4',
    borderBottom: '2px solid #33634d',
  },
}));

export default useStyles;
