import React from 'react';
import { nanoid } from 'nanoid';
import Game from './../classes/Game';
import x from '../assets/x.svg';
import x_row from '../assets/x_row.svg';
import x_column from '../assets/x_column.svg';
import x_diagonal1 from '../assets/x_diagonal1.svg';
import x_diagonal2 from '../assets/x_diagonal2.svg';
import o from '../assets/o.svg';
import o_row from '../assets/o_row.svg';
import o_column from '../assets/o_column.svg';
import o_diagonal1 from '../assets/o_diagonal1.svg';
import o_diagonal2 from '../assets/o_diagonal2.svg';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game("",""),
      gameStatus: "",
      cells: [["","",""],
      ["","",""],
      ["","",""]],
      hoverCells: false,
      symbols: {"x": x,
      "x_row": x_row,
      "x_column": x_column,
      "x_diagonal1": x_diagonal1,
      "x_diagonal2": x_diagonal2,
      "o": o,
      "o_row": o_row,
      "o_column": o_column,
      "o_diagonal1": o_diagonal1,
      "o_diagonal2": o_diagonal2,
      "": ""},
      humanSymbol: "x",
      computerSymbol: "o",
      symbolToPlay: "",
      level: "hard",
      updateLevel: async ()=>{
        await this.setState({
          level: this.state.level==="hard" ? "easy" : "hard" 
       });
      },
      cloneDeep: (_cells)=>{
        let newCells=[]
        _cells.forEach(rows=>{
          newCells.push([]);
          rows.forEach(cell=>{
            newCells.at(-1).push(cell);
          });
        });
        return newCells
      },
      updatehumanSymbol: async ()=>{
        this.state.clearBoard();
        await this.setState({
          gameStatus: "",
          humanSymbol: this.state.humanSymbol==="x" ? "o" : "x",
          computerSymbol: this.state.computerSymbol==="x" ? "o" : "x"
       });
     },
     clearBoard: async ()=>{
      let newCells = [["","",""],
      ["","",""],
      ["","",""]];
      await this.setState({
          cells: newCells
       });
     },
     humanPlay: async (i, j)=>{
       if(this.state.symbolToPlay===this.state.humanSymbol && this.state.cells[i][j]==="" && this.state.gameStatus==="playing"){
        await this.state.updateCells(i,j, this.state.humanSymbol);
         await this.setState({
          symbolToPlay: this.state.computerSymbol
       });
       if(this.state.game.any_winner(this.state.cells)===true){
         const winnerCells = this.state.game.winnerCells(this.state.cells);
         winnerCells["coords"].forEach(cell=>{
           this.state.updateCells(cell[0], cell[1], winnerCells[this.state.humanSymbol]);
         });
        await this.setState({
          gameStatus: "you win"
        });
        return;
      }
       this.state.computerPlay();
       }
     },
     computerPlay: async ()=>{
      let computerMove= this.state.game.select_move(this.state.cells, this.state.level==="easy");
      if(computerMove["available_cells"]===0){
        await this.setState({
          gameStatus: "draw"
       });
       return;
      }
      await this.state.updateCells(computerMove['i'],computerMove['j'], this.state.computerSymbol)
      await this.setState({
        symbolToPlay: this.state.humanSymbol
     });
     if(this.state.game.any_winner(this.state.cells)===true){
      const winnerCells = this.state.game.winnerCells(this.state.cells);
      winnerCells["coords"].forEach(cell=>{
        this.state.updateCells(cell[0], cell[1], winnerCells[this.state.computerSymbol]);
      });
      await this.setState({
        gameStatus: "computer wins"
      });
      return;
    }
     if(computerMove["available_cells"]===1){
      await this.setState({
        gameStatus: "draw"
     });
     }
     },
     updateCells: async (i,j, symbol)=>{
      let newCells = this.state.cloneDeep(this.state.cells);
      newCells[i][j]=symbol;
      await this.setState({
       cells: newCells
    });
     },
     startGame: async ()=>{
       await this.setState({
        game: new Game(this.state.computerSymbol, this.state.humanSymbol)
       })
       await this.state.clearBoard();
       if(this.state.humanSymbol==="o"){
        let computerMove= this.state.game.select_move(this.state.cells, this.state.level==="easy");
        await this.state.updateCells(computerMove['i'],computerMove['j'],this.state.computerSymbol);
       }
       await this.setState({
        gameStatus: "playing",
        hoverCells: true,
        symbolToPlay: this.state.humanSymbol
     });
     }
    };
  }

  displayContent = ()=>{
      return (
        <div className="boardContent">
          <div className="form-check">
            <div>
            <input data-testid="radio-x" type="radio" value="x" name="symbol" className="form-check-input"
            checked={this.state.humanSymbol === "x"}
              onChange={this.state.updatehumanSymbol} /> 
              <label className="form-check-label">Play with X</label>
            </div>
            <div>
            <input data-testid="radio-o" type="radio" value="o" name="symbol" className="form-check-input"
            checked={this.state.humanSymbol === "o"}
            onChange={this.state.updatehumanSymbol}  /> 
            <label className="form-check-label">Play with O</label>
            </div>
            <div>
            <input data-testid="radio-easy" type="radio" value="easy" name="level" className="form-check-input"
            checked={this.state.level === "easy"}
              onChange={this.state.updateLevel} /> 
              <label className="form-check-label">easy</label>
            </div>
            <div>
            <input data-testid="radio-hard" type="radio" value="hard" name="level" className="form-check-input"
            checked={this.state.level === "hard"}
            onChange={this.state.updateLevel}  /> 
            <label className="form-check-label">hard</label>
            </div>
          </div>
          <div>
            <button data-testid="button-start" className="btn btn-primary" onClick={this.state.startGame}>start</button>
          </div>
          <div className="board">
            {
              this.state.cells.map(
                (row, i)=>{
                  return(
                    <div data-testid="div-board" className="rowBoard" key={nanoid()}>
                      {
                        row.map(
                          (cell, j)=>{
                            return(
                              <div data-testid={`div-${i}-${j}`} className={"cell-properties "+(this.state.hoverCells===true ? "hover-cells" : "")} key={nanoid()} onClick={()=>this.state.humanPlay(i,j)}>
                                <img data-testid={`img-${i}-${j}`} alt="" src={this.state.symbols[cell]} height="60px" width="60px" className={cell==="" ? "invisible" : ""} />
                              </div>
                            )
                          }
                        )
                      }
                    </div>
                  )
                }
              )
            }
          </div>
          <div>
            <h1>{this.state.gameStatus}</h1>
          </div>
        </div>
      )
  }

  render() {
    return <div>
      {this.state.brand}
      {this.displayContent()}
    </div>;
  }
}

export default Board;