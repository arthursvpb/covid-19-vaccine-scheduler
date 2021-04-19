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
    marginTop: '100px',
  },
  concluded: {
    color: '#43703f',
    borderRadius: '4px',
    textAlign: 'center',
    padding: '5px',
    backgroundColor: '#bfffb9',
  },
  notConcluded: {
    color: '#34646d',
    borderRadius: '4px',
    textAlign: 'center',
    padding: '5px',
    backgroundColor: '#c1f6ff',
  },
});

export default useStyles;
