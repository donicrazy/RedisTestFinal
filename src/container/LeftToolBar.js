import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { startDraw } from '../redux/action';
import { connect } from 'react-redux';
import { compose } from 'redux';
const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 60,
    marginTop: 60,
    backgroundColor: 'gray',
  },
  addButton:{
    textAlign: 'center',
    fontSize: '3em',
  },
  addSelectedButton:{
    textAlign: 'center',
    fontSize: '3em',
    backgroundColor: 'lightgray'
  }
});

class LeftToolBar extends Component{
    
    onStartDraw = () => {
        this.props.startDraw();
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <List component="nav">
                <ListItem button className={!this.props.startFlag ? classes.addButton : classes.addSelectedButton} onClick={this.onStartDraw}>
                    ...
                </ListItem>
               
            </List>
            </div>
        );
    }
}

    const mapStateToProps = state => ({
        startFlag : state.startFlag
    })
    const mapDispatchToProps = {
        startDraw
    }
    const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withStyles(useStyles, {withTheme:true})(compose(withConnect)(LeftToolBar));