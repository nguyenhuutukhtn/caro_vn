import React, {Component} from 'react'
import Square from "./Square";
import '../App.css'

export default class Board extends Component {

    render() {
        return (
            <div className="game-board">
                {this.props.squares.map((row,rowIndex)=>{
                    return (
                      <div className="board-row" key={`row_${rowIndex}`}>
                          {row.map((column,columnIndex)=>{
                              return (
                                <Square value={column} key={`column_${columnIndex}`} onClick = {()=>this.props.onClick(row,column)}/>
                              )
                          })}
                      </div>
                    )
                })}
            </div>
        )
    }
}