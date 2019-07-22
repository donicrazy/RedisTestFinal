import {START_DRAW, END_DRAW, SELECT_RECT, UPDATE_RECT, VISIBLE_RECT} from './action';

const initialState = {
    startFlag : false,
    objNumber: 0,
    selectedNum: null,
    visible: [],
    listPoints: [],
}

function rootreducer(state = initialState, action) {
    switch(action.type) {
    case START_DRAW: {
        return {...state, startFlag:true, selectedNum:null};
    }
    case END_DRAW:{
        let points = state.listPoints, visibleNums = state.visible;
        points.push(action.payload);
        visibleNums.push(0);
        return {startFlag:false, listPoints:points, objNumber:state.objNumber+1, selectedNum:null, visible:visibleNums};
    }
    case SELECT_RECT:
        return {...state, selectedNum:action.payload};
    case UPDATE_RECT: {
        let points = state.listPoints;
        points[action.payload.number] = action.payload.updatePos
        return {...state, listPoints:points};
    }
    case VISIBLE_RECT:
        {
            let visibleNums = state.visible;
            visibleNums[action.payload] = 1-visibleNums[action.payload];
            return {...state, visible:visibleNums.slice(0) };
        }
    default:
        return state;
    }
}

export default rootreducer;