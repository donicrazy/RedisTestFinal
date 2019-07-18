import React, {Component} from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import RightInformBar from './RightInformBar';
import LeftToolBar from './LeftToolBar';
import Body from './Body';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
  {/* Header */}
        <AppBar position="absolute" className={clsx(classes.appBar)}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Saito - Test Project
            </Typography>
          </Toolbar>
        </AppBar>

  {/* Left Tool Bar */}
       <LeftToolBar />
  {/* Main Part */}
          <Body />
  {/* RightToolBar */}
        <RightInformBar />
      </div>
    );
  }
}

const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,  
    height: '100vh',
    overflow: 'auto',
  },
});
export default withStyles(useStyles, {withTheme: true})(Dashboard);

