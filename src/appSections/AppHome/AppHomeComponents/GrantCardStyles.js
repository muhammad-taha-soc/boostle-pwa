import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    flexGrow: 1,
    width: '100%',
    boxSizing: 'border-box',
  },
  circularProgressWrapper: {
    position: 'relative',
    display: 'inline-flex',
    marginRight: theme.spacing(2),
  },
  percentageText: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '10px',
  },
  cardContent: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  grantType: {
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  grantTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  deadline: {
    color: theme.palette.text.secondary,
    fontSize: '14px',
  },
}));
