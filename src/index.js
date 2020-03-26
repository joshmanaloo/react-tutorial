import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {" "}
      {/*every square that when clicked*/}{" "}
      {/* props.onClick;  //gives a value of 'X */} {props.value}{" "}
    </button>
  );
}

class Board extends React.Component {
  // constructor(props) {
  //   //constructing the board
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null), //Make an array of nine filled with null
  //     xIsNext: true //initial that x is true for the first move
  //   };
  // }



  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} //Calls square class and adds value!
        onClick={
          () => this.props.onClick(i) /*This calls the handleClick method*/
        }
      />
    );
  }

  render() {
    // const status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    // const winner = calculateWinner(this.state.squares); //pass on current state of squares
    // let status;
    // if (winner) {
    //   status = "Winner: " + winner; //check if there is winner
    // } else {
    //   status = "Next player: " + (this.state.xIsNext ? "X" : "O"); //tell it is someone's turn
    // }

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)} {this.renderSquare(1)} {this.renderSquare(2)}{" "}
        </div>
        <div className="board-row">
          {this.renderSquare(3)} {this.renderSquare(4)} {this.renderSquare(5)}{" "}
        </div>
        <div className="board-row">
          {this.renderSquare(6)} {this.renderSquare(7)} {this.renderSquare(8)}{" "}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {  //constructor for the game!
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); //if we go back in time, then make a new move from that point and throw and change that future
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //make a copy of squares
    // squares[i] = 'X';  //add X to the current square

    if (calculateWinner(squares) || squares[i]) {
      //if we have a winner, or is current square is filled
      return; //return nothing
    }

    squares[i] = this.state.xIsNext ? "X" : "O"; //asks if xisNext is true then 'X' else 'O'
    this.setState({
      history: history.concat([{
          squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    }); //set the state of the square to X in the board
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,  //keep track of the step in every state
      xIsNext: (step%2) === 0 //if even that means x is next
    })
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

        return(
          <li key = {move}>  {/*//every move creates a list item and button */}
          <button onClick={()=> this.jumpTo(move)}>{desc}</button>  {/* //onlclick calls a method to jump into that move*/}
          </li>
        );
    });

    let status;

    if (winner) {status = 'Winner: ' + winner;}

    else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div> {status} </div>
          <ol> {moves} </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
