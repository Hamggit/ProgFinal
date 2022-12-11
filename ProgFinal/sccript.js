
var socket = io();
side = 20
var time = ""
var grasss = 0
var grasseater = 0
var Predator = 0
var Bomb = 0
var Water = 0

function setup() {
    createCanvas(side * 30, side * 30)
    background('#acacac')
    
}
setInterval(
    function () {
        socket.on('time', (yearTime) => {

            time = yearTime

        })
        socket.on('grassLength',(grass) => {
            grasss =  grass
            
            
        })
        socket.on('grasEaterLength',(graseater) => {
            grasseater =  graseater
        })
        socket.on('Predatorlength',(predator) => {
            Predator =  predator
        })
        socket.on('bomblength',(bomb) => {
            Bomb =  bomb
        })
        socket.on('whaterlength',(water) => {
            Water =  water
        })
        myFunction()

    }, 500
)
function myFunction() {
    document.getElementById("Water").innerHTML = Water;
    document.getElementById("myText").innerHTML = grasss;
    document.getElementById("mygrasseater").innerHTML = grasseater;
    document.getElementById("Predator").innerHTML = Predator;
    document.getElementById("Bomb").innerHTML = Bomb;
    document.getElementById("time").innerHTML = time;
}
function nkarel(matrix) {
    // console.log(matrix);
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (time == "summer") {
                    fill("green");
                }
                else if (time == "winter") {
                    fill("#ffffff");
                } 
            
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red")
            }else if (matrix[y][x] == 4) {
                fill("black")
            }else if(matrix[y][x] == 5){
                fill("blue")
            }

            rect(x * side, y * side, side, side);
        }
    }
}

setInterval(function(){

    socket.on('send matrix', nkarel)

},500)

 
function fills1(){
    socket.emit("grasseater")
}
function fills2(){
    socket.emit("predator")
}
function fills4(){
    socket.emit("water")
}
function fills3(){
    socket.emit("bomb")
}
function fills(){
    socket.emit("grass")
}
function clean(){
    socket.emit("clean")
}

