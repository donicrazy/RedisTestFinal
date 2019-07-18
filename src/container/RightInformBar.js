import React, { Component } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { selectRect } from '../redux/action';
const useStyles = theme => ({
  root: {
    width: '100%',
    marginTop: '20px',
    maxWidth: 360,
    backgroundColor: 'gray',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class RightInformBar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          open: true,
      }
  }

  handleClick = () => {
    var { open } = this.state;
    this.setState({
        open: !open
    })
  }
  handleObjClick = (index) => (e) => {
    this.props.selectRect(index);
  }
  render() {
    const { classes, listPoints, pointCount } = this.props;
    const { open } = this.state;
    return (
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
            </ListSubheader>
        }
        className={classes.root}
        >
        <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
            <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={`OBJECT[${pointCount}]`} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {
                    listPoints.length > 0 && listPoints.map((points, index) => (
                        <ListItem button className={classes.nested} key={index} onClick={this.handleObjClick(index)}>
                            <ListItemIcon>
                            <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={`OBJ ${index}`} />
                        </ListItem>
                    ))
                }
            </List>
        </Collapse>
        </List>
    );
  }
}
const mapStateToProps = state => ({
    listPoints : state.listPoints,
    pointCount : state.objNumber,
})
const mapDispatchToProps = {
    selectRect
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withStyles(useStyles, {withTheme: true})(compose(withConnect)(RightInformBar));