class Game{
  constructor(computerSymbol, humanSymbol){
    this.computerSymbol = computerSymbol;
    this.humanSymbol = humanSymbol;
    this.sols= [{"coords": [[0,0],[0,1],[0,2]], "x": "x_row", "o": "o_row"},
    {"coords": [[1,0],[1,1],[1,2]], "x": "x_row", "o": "o_row"},
    {"coords": [[2,0],[2,1],[2,2]], "x": "x_row", "o": "o_row"},
    {"coords": [[0,0],[1,0],[2,0]], "x": "x_column", "o": "o_column"},
    {"coords": [[0,1],[1,1],[2,1]], "x": "x_column", "o": "o_column"},
    {"coords": [[0,2],[1,2],[2,2]], "x": "x_column", "o": "o_column"},
    {"coords": [[0,0],[1,1],[2,2]], "x": "x_diagonal1", "o": "o_diagonal1"},
    {"coords": [[0,2],[1,1],[2,0]], "x": "x_diagonal2", "o": "o_diagonal2"}]
  }

  select_move = (cells, play_poorly=false)=>{
    let available_cells=this.available_moves(cells);
    let selected_move = this.best_position(cells, available_cells.length, play_poorly);
    return {...selected_move, ...{"available_cells": available_cells.length}};
  }

  available_moves = (cells)=>{
    let available_cells=[];
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(cells[i][j]===""){
          available_cells.push({"i": i,"j": j});
        }
      }
    }
    return available_cells;
  }

  any_winner = (cells)=>{
    if(this.row_solution(cells) || this.column_solution(cells) || this.diagonal_solution(cells)){
      return true;
    }
    return false;
  }
  row_solution = (cells)=>{
    let row1 = cells[0].join("");
    let row2 = cells[1].join("");
    let row3 = cells[2].join("");
    if(row1==="ooo" || row1==="xxx") return true;
    if(row2==="ooo" || row2==="xxx") return true;
    if(row3==="ooo" || row3==="xxx") return true;
    return false;
  }

  column_solution = (cells)=>{
    let column1 = `${cells[0][0]}${cells[1][0]}${cells[2][0]}`;
    let column2 = `${cells[0][1]}${cells[1][1]}${cells[2][1]}`;
    let column3 = `${cells[0][2]}${cells[1][2]}${cells[2][2]}`;
    if(column1==="ooo" || column1==="xxx") return true;
    if(column2==="ooo" || column2==="xxx") return true;
    if(column3==="ooo" || column3==="xxx") return true;
    return false;
  }

  diagonal_solution = (cells)=>{
    let diagonal1 = `${cells[0][0]}${cells[1][1]}${cells[2][2]}`;
    let diagonal2 = `${cells[2][0]}${cells[1][1]}${cells[0][2]}`;
    if(diagonal1==="ooo" || diagonal1==="xxx") return true;
    if(diagonal2==="ooo" || diagonal2==="xxx") return true;
    return false;
  }
  // maxPlayer is always computer player
  minimax = (position, depth, maxPlayer, play_poorly)=>{
    const winner = this.any_winner(position);
    if(winner && maxPlayer) return -100-depth;
    if(winner && !maxPlayer) return 100+depth;
    if(depth===0) return 0;
    const available_moves = this.available_moves(position);
    let best_score= play_poorly ? 200 : (maxPlayer ? -200 : 200);
    available_moves.forEach((move)=>{
      const new_pos = this.positionAfterMove(position, move, maxPlayer ? this.computerSymbol : this.humanSymbol);
      const new_score =this.minimax(new_pos, depth-1, !maxPlayer);
      if(play_poorly){
        if(best_score>new_score) best_score=new_score;
      }
      else{
        if(maxPlayer && best_score<new_score) best_score=new_score;
        else if(!maxPlayer && best_score>new_score) best_score=new_score;
      }
    });
    return best_score;
  }

  best_position = (position, depth, play_poorly)=>{
    const available_moves = this.available_moves(position);
    let best_score = play_poorly ? 200 : -200;
    let best_moves = [];
    available_moves.forEach((move)=>{
      const new_pos = this.positionAfterMove(position, move, this.computerSymbol);
      const new_score =this.minimax(new_pos, depth-1, false, play_poorly);
      if(best_score===new_score){
        best_moves.push(move);
      }
      else if((play_poorly && best_score>new_score) || (!play_poorly && best_score<new_score)){
        best_score=new_score;
        best_moves = [move];
      }
    });
    return best_moves[Math.floor(Math.random()*best_moves.length)];
  }
  
  positionAfterMove= (position, move, symbol)=>{
    let new_pos = this.deepClone(position);
    new_pos[move["i"]][move["j"]]= symbol;
    return new_pos;
  }
  
  deepClone = (_cells)=>{
    let newCells=[]
        _cells.forEach(rows=>{
        newCells.push([]);
        rows.forEach(cell=>{
        newCells.at(-1).push(cell);
       });
      });
    return newCells
  }

  winnerCells = (cells)=>{
    const winners = ["xxx","ooo"]
    for(let i=0; i<this.sols.length; i++){
      const nSol=this.sols[i]["coords"];
      if(winners.includes(cells[nSol[0][0]][nSol[0][1]]+
        cells[nSol[1][0]][nSol[1][1]]+
        cells[nSol[2][0]][nSol[2][1]]))
        return this.sols[i];
    }
  }
}
export default Game;