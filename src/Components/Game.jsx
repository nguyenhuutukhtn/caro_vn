import React, {Component} from 'react'
import Board from "./Board";

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
              },
            }
          ],
          isX: true,
          isWinner: true,
          listCellsWin: true,
          isReverse: false,
          step: 0
        }
    }

    render() {
      const history = this.state.history
      const currentBoard = history[this.state.step]

        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div className="status"></div>
                    <div className="steps">
                        <ol></ol>
                    </div>
                </div>

            </div>
        )
    }
}