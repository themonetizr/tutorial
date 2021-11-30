import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import theme from './theme';
import ButtonAppBar from './appbar';
import TextField from '@material-ui/core/TextField';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Reward from './reward';
import history from './utils/history';
import RewardModal from './reward-modal';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Switch as Muiswitch} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            { props.value }
        </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return (<Square value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    return (
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
    );
  }
}

class Game extends React.Component {
    constructor(props) {
        super(props);

        let apikey = '4vdWpekbjsTcZF8EJFOSD5nzC82GL4NFrzY93KfUiGU';
        if (history.location.state !== undefined && history.location.state.apikey !== undefined) {
            apikey = history.location.state.apikey;
        }
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            apikey: apikey,
            closedReward: false,
            checked: true
        }
    }

  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      let winnerWasFound = false;

      const moves = history.map((step, move) => {
         const desc = move ?
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key={move} className="list-item">
                    <Button variant="contained" color="primary" onClick={() => this.jumpTo(move)}>{desc}</Button>
                </li>
            );
      });

      let status;

      if (winner) {
          status = 'Winner: ' + winner;
          winnerWasFound = true;
      } else {
          winnerWasFound = false;
          status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
      }
    return (
        <div>
          <ButtonAppBar apikey={this.state.apikey} checked={this.state.checked}/>
          <div className="api-key">
              <form noValidate autoComplete="off" className="apikey-form">
                <TextField
                 id="api-key"
                 fullWidth
                 defaultValue={this.state.apikey}
                 label="Monetizr API key"
                 variant="outlined"
                 InputProps={{className: 'apikey-input'}}
                 disabled={!this.state.checked}
                 onChange={(e) => {
                     this.setState({
                         apikey: e.target.value,
                     });
                 }} />
                 <br></br>
                 <br></br>
                 <Button variant="contained" disabled={!this.state.checked} color="primary" onClick={() => {}}>Apply</Button>
                 <FormGroup>
                  <FormControlLabel control={<Muiswitch checked={this.state.checked} onChange={(e)=> this.handleChange(e)}/>} label="Monetizr On/Off" />
                </FormGroup>
              </form>
          </div>
          <div className="game">
            <div className="game-board">
              <Board squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{ status }</div>
              <ol>{ moves }</ol>
            </div>
          </div>
          <RewardModal apikey={this.state.apikey} checked={this.state.checked} open={(winnerWasFound && this.state.checked === true & this.state.closedReward !== true ? true : false )} onClose={() => { this.setState({closedReward: true}); }} />
          <Snackbar
            open={(winnerWasFound && this.state.checked === false ? true : false )}
            autoHideDuration={5}
            message="Well, the game is completed at this moment! Go to the Game Start or reload the page."
            severity="success"
          />
        </div>
    );
  }

  jumpTo(step) {
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
      });
  }

  handleChange(e) {
    this.setState({
      checked: e.target.checked,
    });
  };

  handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1];
      const squares = current.squares.slice();

      if (calculateWinner(squares) || squares[i]) {
          return;
      }

      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{
              squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
          closedReward: false
      });
  }
}

// ========================================

export default function App() {
  return (
      <div>
        <Switch>
          <Route path="/reward">
            <Reward />
          </Route>
          <Route path="/">
            <Game />
          </Route>
        </Switch>
      </div>
  );
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={false} className="root-container">
            <Typography component="div" style={{ height: '100vh' }}>
                <Router history={history}>
                <App />
                </Router>
            </Typography>
        </Container>
    </ThemeProvider>,
  document.getElementById('root')
);


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
