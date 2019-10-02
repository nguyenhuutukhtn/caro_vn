import React from 'react'
import Square from "./Square";
import '../App.css'

export default function Board(props) {
  const {squares,isWinner,listCellsWin} = props
  let isHighlight = false;
        return (

            <div className="game-board">
                {squares.map((row,rowIndex)=>{
                    return (
                      <div className="board-row" key={`row_${rowIndex}`}>
                          {row.map((column,columnIndex)=>{
                            if (isWinner){
                              listCellsWin.map((cell)=>{
                                if (rowIndex === cell.row && columnIndex === cell.column){
                                  isHighlight = true
                                }
                                return true
                              })
                            }
                              return (
                                <Square value={column} isHightLight={isHighlight} key={`column_${columnIndex}`} onClick = {()=>props.onClick(rowIndex,columnIndex)}/>
                              )
                          })}
                      </div>
                    )
                })}
            </div>
        )
}