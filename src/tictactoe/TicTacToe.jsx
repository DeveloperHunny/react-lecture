import React, { useEffect, useReducer, useCallback} from "react";
import Table from "./Table";

const initialState = {
    winner : '',
    turn : 'O',
    tableData : [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell: [-1,-1],
    finish: false,
}

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
const RESET_GAME = 'RESET_GAME';
const FINISH_GAME = 'FINISH_GAME';
const reducer = (state, action) => {
    switch (action.type){
        case SET_WINNER:
            // state.winner = action.winner; 이렇게 기존 걸 그대로 바꾸면 안되고, 객체 자체를 바꿔야 함.
            return{
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;

            return{
                ...state,
                tableData : tableData,
                recentCell: [action.row, action.cell],
            }
        }
        case CHANGE_TURN: {
            return{
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case FINISH_GAME: {
            return{
                ...state,
                finish: true,
            }
        }
        case RESET_GAME: {
            return{
                ...state,
                winner : '',
                turn : 'O',
                tableData : [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell: [-1,-1],
                finish: false,
            }
        }
        default:
            return state;

    }

}

const TicTacToe = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { winner, turn, tableData, recentCell, finish } = state;

    useEffect(() => {
        const [row , cell] = recentCell;
        if (row < 0) { return; }

        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {win = true;}
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {win = true;}
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {win = true;}
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {win = true;}

        if(win){ //승리시
            dispatch({ type : SET_WINNER, winner : turn});
            dispatch({ type : FINISH_GAME });
        }
        else{ //승리가 아닐 경우 ( 무승부 상황도 검사해야 함)
            let isFull = true;
            tableData.forEach((row) => { //무승부 검사
                row.forEach((cell) => {
                    if(!cell) {isFull = false;}
                });
            });

            if(isFull){ //무승부인 경우
                dispatch({ type : FINISH_GAME });
            }
            else{ //턴 넘겨주기
                dispatch({ type : CHANGE_TURN});
            }


        }
    }, [recentCell]);

    const onReset = () => {
        dispatch({type: RESET_GAME});
    }

    return(
        <>
            <Table tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
            {finish && <button onClick={onReset}>RESET</button>}
        </>
    );
};

export default TicTacToe;