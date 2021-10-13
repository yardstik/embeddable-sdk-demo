import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginRight: '30px'
  },
  link: {
    color: 'white',
    padding: '30px',
    alignSelf: 'flex-end',
  }
}));

export default function ProminentAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h4" >
            Acme Corporation
          </Typography>

          <Link component={RouterLink} to="/">
            <Typography className={classes.link}>
              Candidate Report
            </Typography>
          </Link>
          <Link component={RouterLink} to="/account-view">
            <Typography className={classes.link}>
              Account Disclosures
            </Typography>
          </Link>
          <Link component={RouterLink} to="/simple-iframe">
            <Typography className={classes.link}>
              Simple Iframe
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}