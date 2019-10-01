import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(20).fill(null).map(() => Array(20).fill(null)),
          coordinate: {
            x: null,
            y: null
          }
        }
      ],
      isX: true,
      isEmpty: true,
      isWinner: false,
      listCellsWin: true,
      isReverse: false,
      step: 0
    };
  }

  render() {
    const { history, step, isWinner, isX, isEmpty } = this.state;
    const currentBoard = history[step];

    let status;
    if (isEmpty){
      status = <div className="status">
        {'X đánh đầu tiên'}
      </div>
    }
    else {
      status = <div className="status">
        {isWinner? 'Người chiến thắng là: ' : 'Lượt tiếp theo: '}
        {isX? 'X' : 'O'}
      </div>
    }

    return (
      <div className="game">
        <Board squares={currentBoard.squares}/>
        <div className="game-info">
          {status}
            {/*<div className="steps">*/}
            {/*    <ol></ol>*/}
            {/*</div>*/}
        </div>

      </div>
    );
  }
}