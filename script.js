const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');

const car = document.createElement('div')

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false

}

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic:3
}

function getQuantityElement(heightElement) {
   return document.documentElement.clientHeight / heightElement + 1;
}

function startGame()  {
    start.classList.add('hide');
    gameArea.innerHTML = '';
    
    for(let i = 0; i < getQuantityElement(100); i++ ){

        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line)
}
    for (let i = 0; i < getQuantityElement(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(./image/enemy.png) center / cover no-repeat'; 
        gameArea.appendChild(enemy);

    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = 'auto'
    car.style.bottom ='10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {

    if(setting.start){
        setting.score += setting.speed;

        score.innerHTML = 'SCORE<br>' + setting.score;
        moveRoad();
        moveEnemy();

        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x += setting.speed;
        }
        if(keys.ArrowUp  && setting.y > 0){
            setting.y -= setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px'
        car.style.top = setting.y + 'px';

       requestAnimationFrame(playGame); 
    }
       
}

function startRun(e)  {
    e.preventDefault();
    keys[e.key] = true;
}

function stopRun(e)  {
    e.preventDefault();
    keys[e.key] = false;
}

const moveRoad = () => {
    let lines = document.querySelectorAll('.line');

    lines.forEach((line) => {

        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if(line.y >= document.documentElement.clientHeight){
            line.y = -100;
        }
    })

}

const moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item) => {

        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (
            carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left && 
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top){
                setting.start = false;
                console.log('LNG');
                start.classList.remove('hide');
                score.style.top = start.offsetHeight;
            }

        item.y += setting.speed / 2;
        item.style.top = item.y + 'px'

    if (item.y >= document.documentElement.clientHeight){
        item.y = -100 * setting.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    }
 });
}
const string = `asdasdasdasd 8565655 asdasdasd 6565985494894984 asdasd45`
const number = string.match(/\d[]/g);

console.log(number);


