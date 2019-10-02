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
            row: null,
            column: null
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

  handleClick(row, column) {
    const { history, isX, step, isEmpty, isWinner } = this.state;
    // return if win or click on checked cell
    if (isWinner)
      return;
    if (history[step].squares[row][column] != null)
      return;
    const currentBoard = history[step];
    const newHistory = history.slice(0, step + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = currentBoard.squares.slice();
    squares.map((rowTable, index) => {
      squares[index] = [...current.squares[index]];
      return true;
    });
    let isFirstStep;
    if (isEmpty)
      isFirstStep = false;
    if (!squares[row][column] && !isWinner) {
      squares[row][column] = isX ? 'X' : 'O';
      this.checkIfWinner(squares, row, column);
    }
    this.setState({
      history: newHistory.concat([
        {
          squares,
          coordinate: {
            row,
            column
          }
        }
      ]),
      isEmpty: isFirstStep,
      step: step + 1,
      isX: !isX
    });

  }

  checkIfWinner(squares, row, column) {
    const currentCell = squares[row][column];
    const flags = [-4, -3, -2, -1, 1, 2, 3, 4];
    let counter = 1;
    const listCellsWin = Array(5).fill(null);

    // check vertical
    for (let i = 0; i < flags.length; i += 1) {
      let rowIndex = row + flags[i];
      if (rowIndex < 0 || rowIndex >= 20) {
        counter = 1;
      } else if (squares[rowIndex][column] === currentCell) {
        counter += 1;
        if (counter === 5) {
          if (flags[i] === -1) {
            // because next cell is the current node
            rowIndex += 1;
          }
          if (
            rowIndex + 1 < 20 &&
            (squares[rowIndex + 1][column] !== null &&
              squares[rowIndex + 1][column] !== currentCell) &&
            (squares[rowIndex - 5][column] !== null &&
              squares[rowIndex - 5][column] !== currentCell)
          ) {
            return false;
          }

          for (let k = 0; k < 5; k += 1) {
            listCellsWin[k] = {
              x: rowIndex - k,
              y: column
            };
          }
          this.setState({
            isWinner: true,
            listCellsWin
          });
          return true;
        }
      } else {
        counter = 1;
      }
    }

    // check horizontal
    for (let i = 0; i < flags.length; i += 1) {
      let columnIndex = column + flags[i];
      if (columnIndex < 0 || columnIndex >= 20) {
        counter = 1;
      } else if (squares[row][columnIndex] === currentCell) {
        counter += 1;
        if (counter === 5) {
          if (flags[i] === -1) {
            // because next cell is the current node
            columnIndex += 1;
          }
          if (
            columnIndex + 1 < 20 &&
            (squares[row][columnIndex + 1] !== null &&
              squares[row][columnIndex + 1] !== currentCell) &&
            (squares[row][columnIndex - 5] !== null &&
              squares[row][columnIndex - 5] !== currentCell)
          ) {
            return false;
          }

          for (let k = 0; k < 5; k += 1) {
            listCellsWin[k] = {
              x: row,
              y: columnIndex - k
            };
          }
          this.setState({
            isWinner: true,
            listCellsWin
          });
          return true;
        }
      } else {
        counter = 1;
      }
    }


    // check diagonal right\
    counter = 1;
    for (let i = 0; i < flags.length; i += 1) {
      let rowIndex = row + flags[i];
      let columIndex = column + flags[i];
      if (
        rowIndex < 0 ||
        rowIndex >= 20 ||
        columIndex < 0 ||
        columIndex >= 20
      ) {
        counter = 1;
      } else if (squares[rowIndex][columIndex] === currentCell) {
        counter += 1;
        if (counter === 5) {
          if (flags[i] === -1) {
            // because next cell is the current node
            rowIndex += 1;
            columIndex += 1;
          }
          if (
            rowIndex + 1 < 20 &&
            columIndex + 1 < 20 &&
            (squares[rowIndex + 1][columIndex + 1] !== null &&
              squares[rowIndex + 1][columIndex + 1] !== currentCell) &&
            (squares[rowIndex - 5][columIndex - 5] !== null &&
              squares[rowIndex - 5][columIndex - 5] !== currentCell)
          ) {
            return false;
          }

          for (let k = 0; k < 5; k += 1) {
            listCellsWin[k] = {
              x: rowIndex - k,
              y: columIndex - k
            };
          }
          this.setState({
            isWinner: true,
            listCellsWin
          });
          return true;
        }
      } else {
        counter = 1;
      }
    }

    // check dialognal left /
    counter = 1;
    for (let i = 0; i < flags.length; i += 1) {
      let rowIndex = row + flags[i];
      let columnIndex = column - flags[i];

      if (
        rowIndex < 0 ||
        rowIndex >= 20 ||
        columnIndex < 0 ||
        columnIndex >= 20
      ) {
        counter = 1;
      } else if (squares[rowIndex][columnIndex] === currentCell) {
        counter += 1;
        if (counter === 5) {
          if (flags[i] === -1) {
            // because next cell is the current node
            rowIndex += 1;
            columnIndex -= 1;
          }
          if (
            rowIndex + 1 < 20 &&
            columnIndex - 1 >= 0 &&
            (squares[rowIndex + 1][columnIndex - 1] !== null &&
              squares[rowIndex + 1][columnIndex - 1] !== currentCell) &&
            (squares[rowIndex - 5][columnIndex + 5] !== null &&
              squares[rowIndex - 5][columnIndex + 5] !== currentCell)
          ) {
            return false;
          }

          for (let k = 0; k < 5; k += 1) {
            listCellsWin[k] = {
              x: rowIndex - k,
              y: columnIndex + k
            };
          }
          this.setState({
            isWinner: true,
            listCellsWin
          });
          return true;
        }
      } else {
        counter = 1;
      }


    }
    return false;


  }

  handleResetClick() {
    this.setState({
      history: [
        {
          squares: Array(20)
            .fill(null)
            .map(() => Array(20).fill(null))
        }
      ],
      step: 0,
      isWinner: false,
      listCellsWin: null,
      isX: true
    });
  }

  jumpTo(step) {
    const { isWinner } = this.state;
    if (isWinner) {
      return;
    }
    this.setState({
      step,
      isX: step % 2 === 0
    });
  }

  render() {
    const { history, step, isWinner, isX, isEmpty, isReverse, listCellsWin } = this.state;
    const currentBoard = history[step];
    let classtoHightLightStep;
    let stepAction = history.map((currentStep, move) => {
      if (move === 0) {
        return true;
      }
      const desc = `Bước #${move} (${currentStep.coordinate.row}, ${currentStep.coordinate.column})`;
      if (step === move) {
        classtoHightLightStep = 'btn-bold';
      }
      return (
        <div key={`step_${move}`}>
          <button
            className={classtoHightLightStep}
            type="button"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </div>
      );
    });

    if (isReverse) {
      stepAction = stepAction.reverse();
    }

    let status;
    if (isEmpty) {
      status = <div className="status">
        {'X đánh đầu tiên'}
      </div>;
    } else if (isWinner) {
      status = <div className="status">
        {'Người chiến thắng là: '}
        {isX ? 'O' : 'X'}
      </div>;
    } else {
      status = <div className="status">
        {'Lượt tiếp theo: : '}
        {isX ? 'X' : 'O'}
      </div>;
    }

    return (
      <div className="game">
        <Board squares={currentBoard.squares} onClick={(row, column) => {
          this.handleClick(row, column);
        }} isWinner={isWinner} listCellsWin={listCellsWin} isX={isX}/>
        <div className="game-info">
          {status}
          <div>
            <button type="button" onClick={() => this.handleResetClick()}>
              Chơi lại
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                this.setState({
                  isReverse: !isReverse
                });
              }}
            >
              Reverse
            </button>
          </div>
          <div className="step-action">{stepAction}</div>
        </div>


      </div>
    );
  }
}