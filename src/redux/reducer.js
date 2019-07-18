import {START_DRAW, END_DRAW, SELECT_RECT, UPDATE_RECT} from './action';

const initialState = {
    startFlag : false,
    objNumber: 0,
    selectedNum: null,
    listPoints: [],
}

function rootreducer(state = initialState, action) {
    switch(action.type) {
    case START_DRAW: {
        return {...state, startFlag:true, selectedNum:null};
    }
    case END_DRAW:{
        let points = state.listPoints;
        points.push(action.payload);
        return {startFlag:false, listPoints:points, objNumber:state.objNumber+1, selectedNum:null};
    }
    case SELECT_RECT:
        return {...state, selectedNum:action.payload};
    case UPDATE_RECT: {
        let points = state.listPoints;
        points[action.payload.number] = action.payload.updatePos
        return {...state, listPoints:points};
    }
    default:
        return state;
    }
}

export default rootreducer;