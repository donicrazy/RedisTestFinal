import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { endDraw, updateRect } from '../redux/action';
import Graph from '../components/Graph';
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: [],
            svgCanvas:null,
            sizeControl: null,
            moveOffset: null,
        }
    }
    validatePos = (positions) => {
        var leftTopX = Math.min(positions[0].x, positions[1].x, positions[2].x, positions[3].x);
        var leftTopY = Math.min(positions[0].y, positions[1].y, positions[2].y, positions[3].y);
        var rightBottomX = Math.max(positions[0].x, positions[1].x, positions[2].x, positions[3].x);
        var rightBottomY = Math.max(positions[0].y, positions[1].y, positions[2].y, positions[3].y);
        return {x: leftTopX, y:leftTopY, width:rightBottomX-leftTopX, height:rightBottomY-leftTopY};
    }
    onMouseDown = (e) => {
        if ( !this.props.startFlag )
            return;
        var clickPos = {x:e.clientX, y:e.clientY};
        var { positions } = this.state;
        if ( positions.length < 4 )
        {
            positions.push(clickPos);
            if ( positions.length === 4 ) {
                this.props.endDraw(this.validatePos(positions));
                positions = [];
            }
            this.setState({
                positions
            })
        }
    }   
    render() {
        const { classes, selectedNum, listPoints } = this.props;
        return(
            <Container className={classes.container} onMouseDown={this.onMouseDown}>
                <Graph listPoints={listPoints} selectNumber={selectedNum}/>
            </Container>    
        );
    }
}
const useStyles = theme => ({
    container: {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      maxWidth: '2000px',
      padding: '0'
    },
  });    

const mapStateToProps = state => ({
    startFlag : state.startFlag,
    listPoints : state.listPoints,
    selectedNum : state.selectedNum,
})
const mapDispatchToProps = {
    endDraw,
    updateRect,
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default withStyles(useStyles, {withTheme: true})(compose(withConnect)(Body));