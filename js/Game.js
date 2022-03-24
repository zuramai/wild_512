class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.score = 0;
        this.blocks = [];
        this.tempatBlocks = [];
        this.soundStatus = true;
        this.status = "play";
        this.blockH = 100;
        this.blockW = 100;
        this.highScore = localStorage.getItem('highScore') || 0;
        this.totalMoves = 0;
        this.numberAdded = 0;
        this.restartButton = {
            x: 540,
            y: 370,
            w: 150,
            h: 40,
        }
        this.musicBtn = {
            x: 600,
            y: 450,
            w: 100,
            h: 20,
            status: true
        }
    }

    /*
    *
    * Initial Game (When Start Button Clicked)
    */
    init() {
        this.initBoard();
        this.generateNewNumber('init');
        requestAnimationFrame(() => {
            this.render()
        });
    }

    
    /*
    *
    * To Restart The Game
    */
    restart() {
        this.blocks = [];
        this.initBoard();
        this.generateNewNumber('init');
        this.score = 0;
        this.status = "play"
    }

    /*
    *
    * Initial Board Layout
    */
    initBoard() {
        for(var i = 1; i<=4;i++) {
            for(var j = 1;j<=4;j++) {
                this.blocks.push({
                    number: false,
                    x: this.blockW * j + (j*10) - 70,
                    y: this.blockH * i + (i*10) - 80,
                    row: i,
                    column: j,
                });
                this.tempatBlocks.push({
                    number: false,
                    x: this.blockW * j + (j*10) - 70,
                    y: this.blockH * i + (i*10) - 80,
                    row: i,
                    column: j,
                })
            }
        }
    }

    /*
    *
    * Draw Board and some Components
    */
    drawBoard() {
    
        this.ctx.fillStyle = "#faf8ef";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.drawImage(document.getElementById('logo2'),485,10)
        this.tempatBlocks.forEach((block,index) => {
            let color = "#cdc1b4";
            this.ctx.fillStyle = color;
            this.ctx.fillRect(block.x, block.y, this.blockH, this.blockW)
        })
        this.blocks.forEach((block,index) => {
            let color = "#cdc1b4";
            let textColor = "#776e65"
            let left = 0;
            if(block.number == 2) {
                color = "#eee4da";
                textColor = "#776e65"
            }else if(block.number == 'w') {
                color = "#17a2b8"
                textColor = "#fff"
            }else if(block.number == 4) {
                color = "#ede0c8"
                textColor = "#776e65"
            }else if(block.number == 8) {
                color = "#f2b179"
                textColor = "#776e65"
            }else if(block.number == 16) {
                color = "#f59563"
                textColor = "#fff";
                left = -15
            }else if(block.number == 32) {
                color = "#f47939"
                textColor = "#fff";
                left = -15
            }else if(block.number == 64) {
                color = "#f47939"
                textColor = "#fff";
                left = -15
            }else if(block.number == 128) {
                color = "#d13636"
                textColor = "#fff";
                left = -25
            }else if(block.number == 256) {
                color = "#fc0000"
                textColor = "#fff";
                left = -25
            }else if(block.number == 512) {
                color = "#7275ff"
                textColor = "#fff";
                left = -25
            }

            // draw restart button
            this.ctx.fillStyle = "#0e68c8";
            this.ctx.fillRect(this.restartButton.x, this.restartButton.y, this.restartButton.w, this.restartButton.h)
            this.ctx.fillStyle = '#fff';
            this.ctx.font = "18px Arial";
            this.ctx.fillText("Restart Game",this.restartButton.x+15, this.restartButton.y+25)

            // draw background
            this.ctx.fillStyle = color;
            this.ctx.fillRect(block.x, block.y, this.blockH, this.blockW)
          
            // draw block number
            if(block.number !== false) {
                this.ctx.fillStyle = textColor;
                this.ctx.font = "48px Arial";
                this.ctx.fillText(block.number,block.x + this.blockW/2-15 + left,block.y+this.blockH/2+19)
            }

            // draw music button
            this.ctx.fillStyle = (this.musicBtn.status == true?"#dfd130":"7b7b7b");
            this.ctx.fillRect(this.musicBtn.x, this.musicBtn.y, this.musicBtn.w, this.musicBtn.h)
            this.ctx.fillStyle = '#fff';
            this.ctx.font = "14px Arial";
            this.ctx.fillText("Music",this.musicBtn.x+this.musicBtn.w/4, this.musicBtn.y+this.musicBtn.h/2+5)
            
            // draw score added
            this.ctx.strokeStyle = "#555";
            this.fillStyle = "#fff";
            this.ctx.fillRect(520, 310, 180, 40);
            this.ctx.strokeRect(520, 310, 180, 40);
            this.ctx.fillStyle = '#444';
            this.ctx.font = "18px Arial";
            this.ctx.fillText("Score Gained: "+this.numberAdded,550, 335)
        });
        this.ctx.fillStyle= "#8f7a66";
        this.ctx.fillRect(500, 0, 5, 720)
        this.drawScore();
    }

    /*
    *
    * Helper for randomize number
    */
    randomNumber(length) {
        return  Math.floor(Math.random() * length)
    }

    /*
    *
    * When Player Win The Game
    */
    gameOver() {
        if(this.score >= this.highScore) {
            this.highScore = this.score;
        }
        localStorage.setItem('highScore',this.score);
        this.status = 'over';
    }

    /*
    *
    * Draw Game Over Screen
    */
    drawGameOverScreen() {
        this.ctx.fillStyle = "rgba(0,0,0,.5)";
        this.ctx.fillRect(0, 0, 500, 720)

        this.ctx.fillStyle ="#fff";
        this.ctx.font = "32px Arial";
        this.ctx.fillText('Game Over', this.canvas.width/2 - 200, 200);
    }

    /*
    *
    * When Player Win The Game
    */
    win() {
        if(this.score >= this.highScore) {
            this.highScore = this.score;
        }
        localStorage.setItem('highScore',this.score);
        this.status = 'win';
    }

    /*
    *
    * Draw the Win Screen
    */
    drawWinScreen() {
        this.ctx.fillStyle = "rgba(0,0,0,.5)";
        this.ctx.fillRect(0, 0, 500, 720)

        this.ctx.fillStyle ="#fff";
        this.ctx.font = "32px Arial";
        this.ctx.fillText('You Win!', this.canvas.width/2 - 200, 200);
    }

    /*
    *
    * Generate new number in random block
    */
    generateNewNumber(status) {
        let checkBlockNumber = this.blocks.map((block, index) =>{
            if(block.number == false) {
                return index;
            }
        });
        let emptyBlocks = [];
        checkBlockNumber.forEach(blockNumber => {
            if(blockNumber !== undefined && this.blocks[blockNumber].number == false) {
                emptyBlocks.push(blockNumber)
            }
        })

        if(status == 'init') {
            let randomIndex = this.randomNumber(this.blocks.length);
            let randomIndex2 =  this.randomNumber(this.blocks.length);

            let randomIndex3 = this.randomNumber(this.blocks.length);
            let randomIndex4 =  this.randomNumber(this.blocks.length);
            this.blocks[randomIndex].number = 2;
            this.blocks[randomIndex2].number = 2;
            this.blocks[randomIndex3].number = 4;
            this.blocks[randomIndex4].number = 4;
        }else if(status == 'ingame'){
            let keubah = false;
            while(keubah == false) {
                let randomIndex = this.randomNumber(emptyBlocks.length);
                let yangkeambil = emptyBlocks[randomIndex];
                if(this.blocks[yangkeambil] == undefined) {
                    this.gameOver();
                    break;
                }
                if(this.blocks[yangkeambil].number == false) {
                    keubah = true;
                    if(this.totalMoves % 8 == 0) {
                        this.blocks[yangkeambil].number = 'w';
                    }else{
                        let count = 1;
                        this.blocks[yangkeambil].number = 2;
                        let xAwal = this.blocks[yangkeambil].x;

                        this.blocks[yangkeambil].x -= 10;
                        
                        let interval = setInterval(() => {
                            this.blocks[yangkeambil].x += 1;
                           
                            if(this.blocks[yangkeambil].x >= xAwal) {
                                clearInterval(interval)
                            }
                        }, 1);
                    }
                }else{
                }
            }
            
        }
    }
    
    /*
    *
    * Check destination block if there can be moved/doubled or not
    * 
    */
    check(index, to) {
        let angka = 1;
        if(to == 'top') angka = -4;
        else if(to == 'left') angka = -1;
        else if(to == 'right') angka = +1;
        else if(to == 'bottom') angka = +4;

        if(this.blocks[index+angka] !== undefined) {
            if((this.blocks[index].column == 1 && to == 'left') || (this.blocks[index].column == 4 && to == 'right') || (this.blocks[index].row == 1 && to == 'top')|| (this.blocks[index].row == 4 && to == 'bottom')) {
                // Mentok Ke Kiri
                this.doNothing();
            }else if(this.blocks[index].number == 'w') {
                let kirinya = this.blocks[index+angka].number;
                if(kirinya == false) {
                    kirinya = 'w'
                    this.blocks[index].number = false;
                }else{
                    this.blocks[index+angka].number = kirinya * 2;
                    this.blocks[index].number = false;
                }
            }else if(this.blocks[index+angka].number !== this.blocks[index].number && this.blocks[index+angka].number !== false) {
                this.doNothing();
            }else if(this.blocks[index+angka].number == this.blocks[index].number ) {
                // Combine
                this.blocks[index+angka].number += this.blocks[index].number;
                this.blocks[index].number = false;
            }else if(this.blocks[index+angka].number == false) {
                // Only Move
                let count = 0;
                // this.moveAnimation(index, index+angka, to)
                this.blocks[index+angka].number = this.blocks[index].number;
                this.blocks[index].number = false;
                // let intervalAnimate = setInterval(() => {
                //     this.blocks[index].x += angka;
                //     if(this.blocks[index].x <= this.blocks[index+angka].x) {
                //         clearInterval(intervalAnimate)
                //     }
                // }, 20)
                this.check(index+angka, to);

            }
        }
    }

    /*
    *
    * Move the numbers after check() finished
    * 
    */
    move(to) {
        
        this.blocks.forEach((block,index) => {
            if(block.number !== false) {
                this.check(index, to)
            }
        })
        
        this.totalMoves += 1;

        this.generateNewNumber('ingame');
        this.countScore();
    }

    /*
    *
    * Actually you do nothing here
    * 
    */
    doNothing() {

    }

    /*
    *
    * Count total score after all moves done
    * 
    */
    countScore() {
        let scoreNow = this.score;

        let score = 0;
        this.blocks.forEach(block => {
            if(block.number == 512) {
                game.win();
                return;
            }
            if(block.number == 'w') {
                score += 0;
            }else {
                score += block.number;
            }
        });
        console.log(score, scoreNow);
        this.numberAdded = score - scoreNow;
        this.score = score;
    }

    /*
    *
    * Draw Score after countScore finish
    * 
    */
    drawScore() {
        this.ctx.fillStyle = "#000";
        this.ctx.font = "16px Arial";
        this.ctx.fillText('Your Score: '+this.score, 520, 250)

        this.ctx.fillStyle = "#000";
        this.ctx.font = "16px Arial";
        this.ctx.fillText('High Score: '+this.highScore, 520, 270)
    }

    /*
    *
    * The loop 
    * 
    */
    render() {
        this.ctx.fillStyle="#fff";
        this.ctx.font = "32px Arial";
        this.ctx.fillText('Your Score: '+this.score, 100,100);
        this.drawBoard();
        if(this.status == 'over') {
            this.drawGameOverScreen();
        }else if(this.status == 'win') {
            this.drawWinScreen();
        }
        requestAnimationFrame(() => {
            this.render()
        })
    }
}
