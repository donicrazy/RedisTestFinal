export const START_DRAW = 'START_DRAW';
export const END_DRAW = 'END_DRAW';
export const SELECT_RECT = 'SELECT_RECT';
export const UPDATE_RECT = 'UPDATE_RECT';
export function startDraw() {
   return{
       type: START_DRAW
   } 
}

export function endDraw(points) {
    return{
        type: END_DRAW,
        payload: points,
    }
}

export function selectRect(number) {
    return {
        type: SELECT_RECT,
        payload: number,
    }
} 

export function updateRect(number, updatePos) {
    console.log("a", updatePos);
    return {
        type: UPDATE_RECT,
        payload: {number, updatePos},
    }
} 