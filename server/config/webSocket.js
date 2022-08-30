
var webSocketServer = require('websocket').server; 
var http = require('http');
var server = http.createServer(function(request, response) {});
process.title = 'WierzbaChat';
var webSocketsServerPort = 2137;

var history = [ ];
var clients = [ ];
var users = [ ];

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}   

function log(){console.log(clients.length)}

function update(){
    clients.forEach(client => client.sendUTF(JSON.stringify({ type: 'server', data: "update"})));
}

server.listen(webSocketsServerPort, () => {console.log("WebSocket server on port " + webSocketsServerPort);});
var wsServer = new webSocketServer({httpServer: server});

wsServer.on('request', function(request) {
console.log((new Date()) + ' Connection from origin '+ request.origin + '.');
var connection = request.accept(null, request.origin); 
var index = clients.push(connection) - 1;
var userName = false;
var userColor = false;

console.log((new Date()) + ' Connection accepted.');

if (history.length > 0) {
    connection.sendUTF(
        JSON.stringify({ type: 'history', data: history} ));
}



connection.on('message', function(message) {
    if (message.type === 'utf8') {
        switch(message.utf8Data)
        {
            case "!users":
            {
                var obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities("current users: " + users.toString()),
                    author: "Server",
                    color: "gold"
                };
                history.push(obj);
                history = history.slice(-100);
                var json = JSON.stringify({ type:'message', data: obj });
                connection.sendUTF(json);
                break
            }
            case "!undo":
            {
                let temp = history.indexOf(history.reverse().find(x => x.author == userName))
                if(temp > -1)history.splice(temp,1);
                history.reverse()
                clients.forEach(client => client.sendUTF(JSON.stringify({ type: 'history', data: history})));

                break
            }
            case "!cls":
            {
                //history = [];
                //clients.forEach(client => client.sendUTF(JSON.stringify({ type: 'history', data: history} )));
                connection.sendUTF(JSON.stringify({ type: 'history', data: []} ));
                break
            }
            default: 
            {
                if (userName === false) {
                    userName = htmlEntities(message.utf8Data);
                    users.push(userName);
                    userColor = "linear-gradient(to right,"+getRandomHEXColor()+","+getRandomHEXColor()+")";
                    connection.sendUTF(JSON.stringify({ type:'color', data: userColor }));
                    console.log((new Date()) + ' User is known as: ' + userName );
                } 
                else
                {
                    console.log((new Date()) + ' Received Message from ' + userName + ': ' + message.utf8Data);
                    var obj = {
                        time: (new Date()).getTime(),
                        text: htmlEntities(message.utf8Data),
                        author: userName,
                        color: userColor
                    };
                    history.push(obj);
                    history = history.slice(-100);
                    var json = JSON.stringify({ type:'message', data: obj });
                    clients.forEach(client => client.sendUTF(json))  
                    console.log(clients.length)
                }
            }
        }
    }
});
connection.on('close', function(connection) {
    if (userName !== false && userColor !== false) {
    console.log((new Date()) + " Peer " + userName + "disconnected, all users: " + (clients.length-1));
    users.splice(userName, 1);
    clients.splice(index, 1);
    }
});
});
  
function getRandomHEXColor() {
    const SEED = '0123456789abcdef';
    let output = '#';
    while (output.length < 7) 
        output += SEED[Math.floor(Math.random() * SEED.length)];
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(output);
    return result ? "rgba(" + parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16) + ",0.6)": null;
}
module.exports = () => {
    return {
        update:update,
        log:log,
    }
}
