import React from 'react';
import { nanoid } from 'nanoid';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [["","",""],
      ["","",""],
      ["","",""]],
      hoverCells: false,
      pieces: {"x": "/assets/x.svg",
      "o": "/assets/o.svg",
      "": ""},
      selectedPiece: "x",
      updatePieceToPlay: ()=>{
        this.setState({
          selectedPiece: this.state.selectedPiece==="x" ? "o" : "x"
       });

     },
     startGame: ()=>{
      let newCells = [["","",""],
      ["","",""],
      ["","",""]];
       if(this.state.selectedPiece==="o"){
        newCells[1][1]="x";
       }
       else{
        newCells[1][1]="";
       }
       this.setState({
        cells: [...newCells],
        hoverCells: true
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
            checked={this.state.selectedPiece === "x"}
              onChange={this.state.updatePieceToPlay} /> 
              <label className="form-check-label">Play with X</label>
            </div>
            <div>
            <input type="radio" value="black" name="color" className="form-check-input"
            checked={this.state.selectedPiece === "o"}
            onChange={this.state.updatePieceToPlay}  /> 
            <label className="form-check-label">Play with O</label>
            </div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={this.state.startGame}>start</button>
          </div>
          <div className="board">
            {
              this.state.cells.map(
                (row)=>{
                  return(
                    <div className="rowBoard" key={nanoid()}>
                      {
                        row.map(
                          (cell)=>{
                            return(
                              <div className={"cell-properties "+(this.state.hoverCells===true ? "hover-cells" : "")} key={nanoid()}>
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