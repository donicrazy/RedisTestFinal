import React from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateRect } from '../redux/action';

var drag = d3.drag()
    .subject(d => {
        return d;
    })
    .on("drag", function(d) {
        var x = d3.event.x;
        var y = d3.event.y;
        d3.select(this).attr(
            "transform",
            "translate(" + (d.x = x) + "," + (d.y = y) + ")"
        );
    })
var enterNode = selection => {
    selection.attr("transform", d => "translate(" + d.x + "," + d.y + ")")
    selection.select("rect")
        .attr('width', d => d.width)
        .attr('height',d => d.height)
        .attr('stroke-width', 2)
        .attr('stroke', 'green')
        .attr('stroke-dasharray', "5,5")
        .attr('fill', 'rgba(255,255,255,0)')

    selection.append("text")
        .attr("transform", d => "translate(" + 0 + "," + (-25) + ")")
        .attr('fill', 'white')
        .style('text-weight',"bold")
        .text(d => (`OBJ ${d.i}`));
        
    selection.append('rect')
        .attr("transform", d => "translate(" + 0 + "," + (-20) + ")")
        .attr('width', 80)
        .attr('height', 20)
        .attr('rx', '5')
        .attr('fill', 'green');         

    selection.append("text")
        .attr("transform", d => "translate(" + 3 + "," + (-5) + ")")
        .attr('fill', 'white')
        .style('text-weight',"bold")
        .text("0 Classes");
};
const subRectSize = 10;
class Rect extends React.Component {
    componentDidMount() {
        this.d3Node = d3
        .select(ReactDOM.findDOMNode(this))
        .datum(this.props.dataitem)
        .call(enterNode).call(drag);
    }
    componentWillReceiveProps(nextProps) {
        if ( this.props.selected === true) {
            this.d3Node.selectAll('rect').filter(function(d, i) {
                return i > 1;
            }).remove();
        }
        if ( nextProps.selected === true ) {
            let selectedPos = nextProps.dataitem;
            let subRectPos = [
                {x:0, y:0 },
                {x:0, y:selectedPos.height/2}, 
                {x:0, y:selectedPos.height},
                {x:selectedPos.width/2, y:0} ,
                {x:selectedPos.width/2, y:selectedPos.height},
                {x:selectedPos.width, y:0} , 
                {x:selectedPos.width, y:selectedPos.height/2}, 
                {x:selectedPos.width, y:selectedPos.height},            
            ]
            this.d3Node.selectAll('g')
            .data(subRectPos).enter()
            .append('rect')
            .attr("transform", d => "translate(" + (d.x-subRectSize/2) + "," + (d.y-subRectSize/2) + ")")
            .attr('width', 10)
            .attr('height', 10)
            .attr('fill', 'green')
            .style('cursor','pointer')
            .attr('id', (d,i)=>`edge${i}`)
        }
    }
    render() {
        return (
        <g className="node" id={`g${this.props.dataitem.i}`}>
            <rect />
        </g>
        );
    }
}
const mapStateToProps = state => ({
})
const mapDispatchToProps = {
    updateRect,
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Rect);