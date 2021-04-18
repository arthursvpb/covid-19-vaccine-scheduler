import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    padding: '70px',
    maxWidth: '700px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    '& > *': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  title: {
    marginBottom: '20px',
  },
});

export default useStyles;
