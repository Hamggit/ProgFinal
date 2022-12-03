let LivingCreature = require('./LivingCreature.js')


module.exports = class Predator extends LivingCreature{
    constructor(x, y) {
        super(x, y);
        this.energy = 4
    }
    
    move() {
        this.energy--;
        let found = super.chooseCell(0);
        let foundRand = found[Math.floor(Math.random()*found.length)];
        if (foundRand && this.energy > 0) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
        else {
            this.die()
        }
    }

    mul() {
        let found = super.chooseCell(0);
        let foundRand = found[Math.floor(Math.random()*found.length)];
        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3;
            let newPredator = new Predator(x, y);
            predatorArr.push(newPredator);
            this.energy = 4;
        }
    }
    
    eat() {
        let found =super.chooseCell(1);
        let foundRand = found[Math.floor(Math.random()*found.length)]
        let found1 = super.chooseCell(2);
        let foundRand1 = found1[Math.floor(Math.random()*found.length)]
        if (foundRand) {
            this.energy++;
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            if (this.energy >= 15) {
                this.mul();

            }
        }
        else if (foundRand1) {
            this.energy++;
            let x = foundRand1[0];
            let y = foundRand1[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            for (var i in GrassEaterArr) {
                if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }


            if (this.energy >= 14) {
                this.mul();

            }
        } else {
            this.move();
        }
    }
    die() {

        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}

