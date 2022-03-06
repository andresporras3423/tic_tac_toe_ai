class Game{
  constructor(){

  }

  select_move = (cells)=>{
    let available_cells=[];
    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(cells[i][j]===""){
          available_cells.push({"i": i,"j": j});
        }
      }
    }
    return available_cells[Math.floor(Math.random()*available_cells.length)];
  }
}

export default Game;