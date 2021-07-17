let players = [];


const createPlayers = (id,name,gameId)=>{

  player = {
    id,
    name,
    gameId
  }

  players.push(player)


  return player;
}

const findPlayer = (id) => players.find(player => player.id === id) 

const deletePlayer = (id)=>{
  const removePlaer = players.filter(player => player.id !== id);
  players= removePlaer;

}

module.exports = {
  createPlayers,
  deletePlayer,
  findPlayer
}