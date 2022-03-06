class Game{
  constructor(){

  }

  select_move = (cells)=>{
    let available_cells=this.available_moves(cells);
    let selected_move = available_cells[Math.floor(Math.random()*available_cells.length)];
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
}

export default Game;