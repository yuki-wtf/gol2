import React, { useState } from "react";
import GameGrid from "../../GameGrid/GameGrid";
import Cell from "../Cell/Cell";

const Grid = ({ data }) => {
  const [selectedCellRow, setSelectedCellRow] = useState(null);
  const [selectedCellColumn, setSelectedCellColumn] = useState(null);

  const handleSelected = (row, column) => {
    setSelectedCellRow(row);
    setSelectedCellColumn(column);
  };
  return (
    <GameGrid>
      {data &&
        data.length &&
        data.map((row, j) => {
          return row.map((cell, i) => {
            if (cell === 0)
              return (
                <Cell
                  state={
                    selectedCellRow === j &&
                    selectedCellColumn === i &&
                    "selected"
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
