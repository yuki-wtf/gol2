import React, { useEffect, useState } from "react";
import GameGrid from "../GolGrid/GameGrid/GameGrid";
import Cell from "../GolGrid/Cell/Cell";
import { useDispatch, useSelector } from "react-redux";
import {
  setRows,
  setSelectedCellColumn,
  setSelectedCellRow,
} from "../../features/creator/create/CreateGameSlice";
import useUpdateEffect from "../../hooks/useUpdateEffect";

const Grid = ({ data }) => {
  //   const [rows, setRows] = useState({});
  const [selectedCol, setselectedCol] = useState([]);
  const dispatch = useDispatch();
  const { selectedCellRow, selectedCellColumn, rows } = useSelector(
    (state) => state.createGame
  );

  const handleSelected = (row, col) => {
    console.log(row, col);
    dispatch(setRows({ row, col }));
  };

  useUpdateEffect(() => {
    // if (Object.keys(rows).length) {
    //   for (const key in rows) {
    //     if (rows.hasOwnProperty(key)) {
    //       console.log(`${key}: ${rows[key]}`);
    //     }
    //   }
    // }
    console.log(rows);
  }, [rows]);

  return (
    <GameGrid>
      {data &&
        data.map((row, j) => {
          console.log("row", row);
          return row.map((cell, i) => {
            if (!cell)
              return (
                <Cell
                  state={
                    selectedCellRow === j && selectedCellColumn === i
                      ? "selected"
                      : "default"
                  }
                  onClick={() => {
                    handleSelected(j, i);
                  }}
                  key={`${i}${cell}`}
                />
              );
            else {
              return <Cell state="alive" key={`${i}${cell}`} />;
            }
          });
        })}
    </GameGrid>
  );
};

export default Grid;
