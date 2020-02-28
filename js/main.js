const canvas = document.getElementById('canvas')

let game = new Game(canvas)
let audio = document.getElementById('bgm')
document.addEventListener('keypress',function(e) {
    if(e.key == "a" || e.key == "ArrowLeft") game.move('left');
    else if(e.key == "d" || e.key == "ArrowRight") game.move('right');
    else if(e.key == "s" || e.key == "ArrowDown") game.move('bottom');
    else if(e.key == "w"  || e.key == "ArrowTop") game.move('top');
});

$(document).ready(function() {
    $('.instructions').slideDown(400)
})

let btnStart = document.getElementById('btn-start');
btnStart.addEventListener('click', function(e) {
    // START GAME
    game.init();
    audio.play();
    audio.loop = true;
    $('.container').css('display','none');
    $('.canvas').css('display','flex');
});


canvas.addEventListener('click', function(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseLocation= {
        x: e.clientX - rect.x,
        y: e.clientY - rect.y,
    }

    if(mouseLocation.x >= game.restartButton.x &&
        mouseLocation.x <= game.restartButton.x + game.restartButton.w &&
        mouseLocation.y >= game.restartButton.y &&
        mouseLocation.y <= game.restartButton.y + game.restartButton.h) {
            game.restart();
        }
    if(mouseLocation.x >= game.musicBtn.x &&
        mouseLocation.x <= game.musicBtn.x + game.musicBtn.w &&
        mouseLocation.y >= game.musicBtn.y &&
        mouseLocation.y <= game.musicBtn.y + game.musicBtn.h) {
            if(game.musicBtn.status == false) {
                game.musicBtn.status = true;
                audio.play();    
            }else{
                game.musicBtn.status = false;
                audio.pause();
            }
            
        }
});
