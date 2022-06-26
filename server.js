var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(8080);


matrix = []
function createMatrix(matlen) {

    for (let i = 0; i < matlen; i++) {
        matrix[i] = []
        for (let j = 0; j < matlen; j++) {
            matrix[i][j] = 0
        }
    }



}

createMatrix(60)

io.sockets.emit('send matrix', matrix)

grassArr = []
GrassEaterArr = []
predatorArr = []
bombArr = []
waterArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Water = require("./Water")
bomb = require("./bomb")




function createObject(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y)
                GrassEaterArr.push(gre)
            }
            if (matrix[y][x] == 3) {
                let pr = new Predator(x, y)
                predatorArr.push(pr)
            }
            if (matrix[y][x] == 4) {
                let bm = new bomb(x, y)
                bombArr.push(bm)
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}
function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
        // console.log(grassArr.length);
    }
    for (let i in GrassEaterArr) {
        GrassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in bombArr) {
        bombArr[i].explode()
    }
    for (let i in waterArr) {
        waterArr[i].GrassCreate()
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 2000)


function fills1() {
    for (let i = 0; i < 4; i++) {
        let x = Math.floor(Math.random() * 60)
        let y = Math.floor(Math.random() * 60)
        if (matrix[y][x] == 0 || 1) {
            matrix[y][x] = 2

            let gre = new GrassEater(x, y)
            GrassEaterArr.push(gre)
        }
    }
}



function fills3() {
    for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * 60)
        let y = Math.floor(Math.random() * 60)
        if (matrix[y][x] == 0 || 1 || 2 || 3) {
            matrix[y][x] = 4
            let pr = new bomb(x, y)
            bombArr.push(pr)
        }
    }
}




function fills2() {
    for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * 60)
        let y = Math.floor(Math.random() * 60)
        if (matrix[y][x] == 0 || 1 || 2) {
            matrix[y][x] = 3
            let pr = new Predator(x, y)
            predatorArr.push(pr)
        }
    }
}



function fills() {
    for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * 60)
        let y = Math.floor(Math.random() * 60)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            let gr = new Grass(x, y)
            grassArr.push(gr)

        }
    }

}
function fills4() {
    for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * 60)
        let y = Math.floor(Math.random() * 60)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            let gr = new Water(x, y)
            waterArr.push(gr)
        }
    }
}
function clean(){
    for (let i = 0; i < 60; i++) {
        matrix[i] = []
        for (let j = 0; j < 60; j++) {
            matrix[i][j] = 0
        }
    }

}






io.on("connection", function (socket) {
    createObject(matrix)
    socket.on("grass", fills)
    socket.on("barev", fills1)
    socket.on("predator", fills2)
    socket.on("water", fills4)
    socket.on("bomb", fills3)
    socket.on("clean",clean)
}

)

