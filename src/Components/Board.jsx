import React, {Component} from 'react'
import Square from "./Square";

export default class Board extends Component {
    renderSquare(i) {
        return <Square value={i}/>;
    }

    render() {
        const status = 'Lượt tiếp theo: X'
        return (
            <div>
                <div className="status">{status}</div>
                <div className="row">{this.renderSquare('X')}</div>
            </div>
        )
    }
}