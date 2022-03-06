import React from 'react';
import { nanoid } from 'nanoid';
import Game from './../classes/Game';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game(),
      cells: [["","",""],
      ["","",""],
      ["","",""]],
      hoverCells: false,
      pieces: {"x": "/assets/x.svg",
      "o": "/assets/o.svg",
      "": ""},
      humanPiece: "x",
      computerPiece: "o",
      pieceToPlay: "",
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
      updatehumanPiece: async ()=>{
        this.state.clearBoard();
        await this.setState({
          humanPiece: this.state.humanPiece==="x" ? "o" : "x",
          computerPiece: this.state.computerPiece==="x" ? "o" : "x"
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
       if(this.state.pieceToPlay===this.state.humanPiece && this.state.cells[i][j]===""){
        await this.state.updateCells(i,j, this.state.humanPiece);
         await this.setState({
          pieceToPlay: this.state.computerPiece
       });
       this.state.computerPlay();
       }
     },
     computerPlay: async ()=>{
      let computerMove= this.state.game.select_move(this.state.cells);
      await this.state.updateCells(computerMove['i'],computerMove['j'], this.state.computerPiece)
      await this.setState({
        pieceToPlay: this.state.humanPiece
     });
     },
     updateCells: async (i,j, piece)=>{
      let newCells = this.state.cloneDeep(this.state.cells);
      newCells[i][j]=piece;
      await this.setState({
       cells: newCells
    });
     },
     startGame: async ()=>{
       await this.state.clearBoard();
       if(this.state.humanPiece==="o"){
        await this.state.updateCells(1,1,this.state.computerPiece);
       }
       await this.setState({
        hoverCells: true,
        pieceToPlay: this.state.humanPiece
     });
     }
    };
  }

  displayContent = ()=>{
      return (
        <div className="boardContent">
          <div className="form-check">
            <div>
            <input type="radio" value="white" name="color" className="form-check-input"
            checked={this.state.humanPiece === "x"}
              onChange={this.state.updatehumanPiece} /> 
              <label className="form-check-label">Play with X</label>
            </div>
            <div>
            <input type="radio" value="black" name="color" className="form-check-input"
            checked={this.state.humanPiece === "o"}
            onChange={this.state.updatehumanPiece}  /> 
            <label className="form-check-label">Play with O</label>
            </div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={this.state.startGame}>start</button>
          </div>
          <div className="board">
            {
              this.state.cells.map(
                (row, i)=>{
                  return(
                    <div className="rowBoard" key={nanoid()}>
                      {
                        row.map(
                          (cell, j)=>{
                            return(
                              <div className={"cell-properties "+(this.state.hoverCells===true ? "hover-cells" : "")} key={nanoid()} onClick={()=>this.state.humanPlay(i,j)}>
                                <img src={this.state.pieces[cell]} height="40px" width="40px" className={cell==="" ? "invisible" : ""} />
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