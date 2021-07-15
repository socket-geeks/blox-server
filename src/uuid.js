var faker = require('faker');

const randomId = ()=>{
  
  const id = faker.datatype.uuid().split('-')
  
  return id[0]
}

module.exports = randomId