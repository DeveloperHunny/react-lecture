import React, {useContext, useState} from "react";
import Tr from "./Tr";
import {TableContext} from "./MineSearch";

const Table = () => {

    const { tableData } = useContext(TableContext);
    console.log(tableData);
    return(
        <table>
            {Array(tableData.length).fill().map((tr, i) =>
                <Tr key={i} rowIndex = {i}/>
            )}
        </table>
    )


}

export default Table;