const socketIO = require('socket.io');

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Función de Backend funcionando!" })
  };
};
