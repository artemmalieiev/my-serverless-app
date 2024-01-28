exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};

const users = [
  {id: 1, name: 'Artem'},
  {id: 2, name: 'David'},
]
