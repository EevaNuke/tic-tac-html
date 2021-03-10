'use strict';

function Square(props) {
  return /*#__PURE__*/React.createElement("button", {
    className: props.winning ? 'square winning' : 'square',
    onClick: props.onClick
  }, "  ", props.value);
}

class Board extends React.Component {
  renderSquare(i) {
    {
      /* zad5 od: */
    }
    let winning = false;

    if (this.props.winning.squares.indexOf(i) >= 0) {
      winning = true;
    }

    {
      /* :do zad5 */
    }
    return /*#__PURE__*/React.createElement(Square, {
      value: this.props.squares[i],
      onClick: () => this.props.onClick(i),
      winning: winning
    });
    {
      /* zad5: winning */
    }
  }

  render() {
    {
      /* return (
      	<div>
      		<div className="board-row">
      			{this.renderSquare(0)}
      			{this.renderSquare(1)}
      			{this.renderSquare(2)}
      		</div>
      		<div className="board-row">
      			{this.renderSquare(3)}
      			{this.renderSquare(4)}
      			{this.renderSquare(5)}
      		</div>
      		<div className="board-row">
      			{this.renderSquare(6)}
      			{this.renderSquare(7)}
      			{this.renderSquare(8)}
      		</div>
      	</div>
      )				zad3:	*/
    }
    const board = [];

    for (let i = 0; i < 3; i++) {
      const squares = [];

      for (let j = 0; j < 3; j++) squares.push( /*#__PURE__*/React.createElement("span", {
        key: i * 3 + j
      }, this.renderSquare(i * 3 + j)));

      board.push( /*#__PURE__*/React.createElement("div", {
        className: "board-row",
        key: i
      }, squares));
    }

    return /*#__PURE__*/React.createElement("div", null, board);
  }

}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        col: null,
        row: null
      }],
      stepNumber: 0,
      xIsNext: true,
      sortAsc: true,
      winning: {
        result: null,
        squares: []
      }
    };
    {
      /* zad1: history col i row; zad4: sortAsc; zad5: winning */
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    const col = i % 3 + 1;
    {
      /* zad1 */
    }
    const row = Math.floor(i / 3) + 1;
    {
      /* zad1 */
    }
    this.setState({
      history: history.concat([{
        squares: squares,
        col: col,
        row: row
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
    {
      /* zad1: history col i row */
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      winning: {
        result: null,
        squares: []
      }
    });
    {
      /* zad5: winning */
    }
  }

  toggleSort() {
    {
      /* zad4 od: */
    }
    this.setState({
      sortAsc: !this.state.sortAsc
    });
    {
      /* :do zad4 */
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let moves = history.map((step, move) => {
      {
        /* w zad4: const na let */
      }
      const desc = move ? 'Go to move #' + move + ' [' + step.col + ',' + step.row + ']' : 'Go to game start';
      {
        /* zad1: [col, row] */
      }
      return /*#__PURE__*/React.createElement("li", {
        key: move
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => this.jumpTo(move),
        className: this.state.stepNumber == move ? 'bold' : 'none'
      }, desc));
      {
        /* zad2: className, CSS: .bold { font-weight: bold; } */
      }
    });
    let sort_desc = 'Sortuj malejąco';
    {
      /* zad4 od: */
    }

    if (!this.state.sortAsc) {
      moves = moves.reverse();
      sort_desc = 'Sortuj rosnąco';
    }

    let sort = /*#__PURE__*/React.createElement("button", {
      onClick: () => this.toggleSort()
    }, sort_desc);
    {
      /* :do zad4 */
    }
    let status;

    if (winner) {
      {
        /* status = "Winner: " + winner; */
      }
      status = "Winner: " + winner.result;
      {
        /* zad5 */
      }
      this.state.winning = winner;
      {
        /* zad5 */
      }
    } else {
      if (moves.length == 10) {
        {
          /* zad6 od: */
        }
        status = "No more moves! The end.";
      } else {
        {
          /* :do zad6 */
        }
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "game"
    }, /*#__PURE__*/React.createElement("div", {
      className: "game-board"
    }, /*#__PURE__*/React.createElement(Board, {
      squares: current.squares,
      onClick: i => this.handleClick(i),
      winning: this.state.winning
    })), /*#__PURE__*/React.createElement("div", {
      className: "game-info"
    }, /*#__PURE__*/React.createElement("div", null, status), /*#__PURE__*/React.createElement("div", null, sort), /*#__PURE__*/React.createElement("ol", null, moves)));
    {
      /* zad5: Board winning; zad4: div sort */
    }
  }

} // ========================================

ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById('root'));

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      {
        /* return squares[a]; */
      }
      return {
        result: squares[a],
        squares: [a, b, c]
      };
      {
        /* zad5 */
      }
    }
  }

  return null;
}