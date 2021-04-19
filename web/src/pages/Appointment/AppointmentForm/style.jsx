import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    padding: '70px',
    maxWidth: '650px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    '& > *': {
      display: 'flex',
      justifyContent: 'flex-start',
    },
  },
  title: {
    justifyContent: 'flex-start',
    marginBottom: '20px',
  },
  name: {
    paddingRight: '40px',
  },
  birthday: {
    justifyContent: 'flex-end',
  },
  divider: {
    margin: '30px',
  },
  button: {
    justifyContent: 'flex-end',
    '& > *': {
      width: '100%',
    },
  },
});

export default useStyles;
