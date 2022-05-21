import React, {useReducer, createContext, useMemo, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";
export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FALG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE : -7,
    NORMAL : -1,
    QUESTION : -2,
    FLAG : -3,
    QUESTION_MINE : -4,
    FLAG_MINE : -5,
    CLICKED_MINE : -6,
    OPENED : 0, //0 이상이면 다 OPENED 상태가 되겠끔.
}

export const TableContext = createContext({
    tableData : [],
    dispatch : () => {},
    halted : true,
});


const initialState = {
    tableData: [],
    result: '',
    timer: 0,
    halted : true,
    openedCount : 0,
    data : {
        row : 0,
        cell : 0,
        mine : 0,
    },

}

const plantMine = (row, cell, mine) => {

    const candidate = Array(row * cell).fill().map((arr,i) => {
       return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i = 0; i < row; i++){
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < cell; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++){
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}





const reducer = (state,action) => {

    switch (action.type){
        case START_GAME:
            return {
                ...state,
                data : {
                    row : action.row,
                    cell : action.cell,
                    mine : action.mine
                },
                tableData : plantMine(action.row, action.cell, action.mine),
                halted: false,
                openedCount: 0,
                timer : 0,
                result : '',
            }
        case OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]];
            });

            const check = new Array(tableData.length).fill().map(() => new Array(tableData[0].length).fill(false));
            let count = 0;
            console.log(check);

            const checkAround = (row, cell) => {

                if(check[row][cell] || tableData[row][cell] >= 0) return;
                check[row][cell] = true;
                count += 1;

                let around = [];
                let around_pos = [];
                //-1,0 부터 시계방향
                const dxy = [[-1,0], [-1,1], [0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]];
                dxy.forEach((move) => {
                    let ny = row + move[0]; let nx = cell + move[1];
                    if(0 <= ny && ny < tableData.length && 0 <= nx && nx < tableData[row].length){
                        around = around.concat(tableData[ny][nx]);
                        around_pos.push([ny,nx]);
                    }
                });

                const mines = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v));


                if(mines.length === 0){
                    tableData[row][cell] = 0;
                    around_pos.forEach((n) => {
                        checkAround(n[0],n[1]);
                    });
                }
                else{
                    tableData[row][cell] = mines.length;
                }
            }

            checkAround(action.row, action.cell);

            let halted = false;
            let result = '';

            console.log(state.openedCount + count);
            console.log(state.data.row *  state.data.cell - state.data.mine);
            if(state.data.row *  state.data.cell - state.data.mine === state.openedCount + count){ //승리
                halted = true;
                result = state.timer + '초만에 승리하셨습니다.';
            }

            return{
                ...state,
                tableData,
                halted,
                result,
                openedCount: state.openedCount + count,
            };

        }

        case CLICK_MINE:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return{
                ...state,
                tableData,
                halted: true,
            }
        }

        case FLAG_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.MINE){
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            }
            else{
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData,
            }
        }

        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.FLAG_MINE){
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            }
            else{
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData,
            }
        }
        case NORMALIZE_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if(tableData[action.row][action.cell] === CODE.QUESTION_MINE){
                tableData[action.row][action.cell] = CODE.MINE;
            }
            else{
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData,
            }
        }
        case INCREMENT_TIMER:{
            return {
                ...state,
                timer : state.timer + 1,
            }
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { tableData, result, timer, halted } = state;

    const value = useMemo(() => ({ tableData : tableData , halted: halted, dispatch }), [tableData, halted]);

    useEffect(()=> {
        let timer;
        if(halted === false){
            timer = setInterval(() => {
                dispatch({type:INCREMENT_TIMER});
            },1000);

        }
        return() => {
            clearInterval(timer);
        }

    },[halted]);

    return(
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>

    );
}

export default MineSearch;