let games = [];


const createGame = (id,player1,player2)=>{

  game = {
    id,
    player1,
    player2,
    turn:player1,
    blocks:[],
    status:'waiting',
    winner:null
  }

  games.push(game)

  return game;
}


const findGame = (id) => games.find(game => game.id === id) 

const updateGame = (game) =>{
  const index = games.findIndex(game => game.id === game.id);
  if(index !== -1){
    games[index]=game
  }
}
module.exports = {
  createGame,
  findGame,
  updateGame
}