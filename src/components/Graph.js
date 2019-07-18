import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import Rect from './Rect';
class Graph extends React.Component {
    
    render() {
      const { selectNumber } = this.props;
      var boxes = [];
      this.props.listPoints.forEach(function(d,i) {
        if ( selectNumber !== null && i === selectNumber )
            boxes.push(<Rect dataitem={{...d,i}} selected={true} key={i}/>);
        else
            boxes.push(<Rect dataitem={{...d,i}} selected={false} key={i}/>);
      });
  
      return (
        <svg width="100%" height={window.innerHeight} border="1px solid black">
          <g>{boxes}</g>
        </svg>
      );
    }
}

export default Graph;