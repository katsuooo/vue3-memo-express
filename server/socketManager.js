/*
 socket manager
*/
var memoEvent = require('./events/memoEvent.js');


function socketManager(server){
    io = require('socket.io')(server);
    io.on('connection', function(socket){
        memoEvent(socket);
    });
};

module.exports = socketManager;