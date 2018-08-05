
//Кнопка начало игры 
var button = document.getElementById("keyStart");
button.addEventListener("click", put);

// Функция для размешивания и раскладки всех карт на стол по нажатию на кнопку и начинаем игру
function put() {

// Делаю массив из всех карт
var deckOfCards = new Array();
for (let i = 0; i<52; i++) {
    deckOfCards[i] = "content/Cards/" + i + ".png"
}

// Делаю массив для игры из 9 случайных карт и повторяю их в массиве
var cardsForGame = new Array();
for (let i = 0; i<9; i++) {
    let randomNamber = Math.floor(Math.random() * deckOfCards.length);
    cardsForGame[i] = cardsForGame[i+9] = deckOfCards[randomNamber];
    deckOfCards.splice(randomNamber, 1);
}

// Перемешиваю массив в случайном порядке Нашел на просторах инета........

function shuffle(array) {
    var currentIndex = array.length; 
    var temporaryValue; 
    var randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  var cardsForGameRandom = shuffle(cardsForGame);

//Разложил
    for (let i = 0; i<cardsForGameRandom.length; i++) {
    let card = document.getElementById(i);
    card.src = cardsForGameRandom[i];

    // Таймер отсчета 5 секунд с выводом на экран
    let start = 5;
    document.getElementById("countdown").innerHTML = start + " sec";
    let sI = setInterval (function() {
        start--;
        document.getElementById("countdown").innerHTML = start + " sec";
        if (start < 0) {
            clearInterval (sI);
            document.getElementById("countdown").innerHTML ="";
        }
    }, 1000);

    //счетчик времени
    let timeGameSecond = 0;
    let timeGameMinute = 0;
    document.getElementById("time").innerHTML = timeGameSecond;
    setTimeout (function(){
            let sIntrvalTime = setInterval (function(){
                timeGameSecond++;
                if (timeGameSecond > 59) {
                    timeGameMinute++;
                    document.getElementById("timeMin").innerHTML = timeGameMinute;
                    timeGameSecond = 0;
                    document.getElementById("time").innerHTML = timeGameSecond;
                } else {
                   document.getElementById("time").innerHTML = timeGameSecond;
                }

                // Проверка выигрыша для остановки счетчика
                let j = 0;
                         for (let i = 0; i<18; i++) {
                             let strWin = document.getElementById(i).src;
                             strWin.indexOf("/w.png") != -1 ? j++ : j ;
                         }
                         if (j == 18) {
                             clearInterval(sIntrvalTime); 
                            }
                if (timeGameMinute > 100) {
                    clearInterval(sIntrvalTime);
                    document.getElementById("countdown").innerHTML = "You forgot about the game";
                }

            }, 1000)
    }, 5000)
}; 
   //Через 5 сек перевернул обратно
setTimeout (turn, 5000);

//функция для переворачивания карт
function turn () {
    for (let i=0; i<18; i++) { 
    document.getElementById(i).src = "content/Cards/00.png";
    }
}

// нужна глобальная переменная для подсчета ходов
var hod = 0;

//Переменная счета
var scoreGame = 0;

//массив из 2х элементов для сравнения (по src) карт при переворачивании 
var arrForSimile = new Array();
arrForSimile.length = 2;

// Массив для сохранения номера id открытых карт
var twoOpenCards = new Array();
twoOpenCards.length = 2;

// Сама игра. при нажатии на карту переворачиваем карту.
document.body.onclick = function (event) {
    
    var target = event.target;
    var strSrc = document.getElementById(target.id).src;
    if (target.className == "img" && strSrc.indexOf("00.png") != -1) {

        //записываем путь карты в массив для сравнения length = 2
        if (hod % 2 == 0) {
            var cardIdOne = event.target.id;
            twoOpenCards[0] = cardIdOne;
            document.getElementById(cardIdOne).src = cardsForGameRandom[cardIdOne];
            arrForSimile[0]=cardsForGameRandom[cardIdOne];
            hod++;
        } else {
            var cardIdTwo = event.target.id;
            twoOpenCards[1] = cardIdTwo;
            document.getElementById(cardIdTwo).src = cardsForGameRandom[cardIdTwo];
            arrForSimile[1]=cardsForGameRandom[cardIdTwo];
            hod++;
            }
        
        // начинается проверка если перевернуты 2 карты и есть два id
        if (twoOpenCards[0] != undefined && twoOpenCards[1] != undefined) {

                // цикл для подсчет анераскрытых/раскрытых карт
            let j = 0;
                         for (let i = 0; i<18; i++) {
                             let strWin = document.getElementById(i).src;
                             strWin.indexOf("/w.png") != -1 ? j++ : j ;
                         }

                //если карты обе одинаковые - вставляем w
                if (arrForSimile[0] === arrForSimile[1] && hod %2 == 0) {
                    setTimeout (function(){
                    document.getElementById(twoOpenCards[0]).src = "content/Cards/w.png";
                    document.getElementById(twoOpenCards[1]).src = "content/Cards/w.png";
                    delete twoOpenCards[0];
                    delete twoOpenCards[1];
                    
                    //Как только 2 карты открыли прибавляем очки по формуле - кол-во нераскрытых карт * 42
                    scoreGame += (18-j)*42;
                    document.getElementById("score").innerHTML = scoreGame;
                    }, 200)
                    
                } else {
                    setTimeout (function(){
                    document.getElementById(twoOpenCards[0]).src = "content/Cards/00.png";
                    document.getElementById(twoOpenCards[1]).src = "content/Cards/00.png";
                    delete twoOpenCards[0];
                    delete twoOpenCards[1];

                    //Если карты не совпали мы отнимаем очки по формуле - кол-во раскрытых карт * 42 
                    scoreGame -= j*42;
                    document.getElementById("score").innerHTML = scoreGame;
                    },200)
                    
                }
            }
        }
      
    }
}

//Кнопка начало игры ЗАНОВО
var buttonReStart = document.getElementById("reStartRun");
buttonReStart.addEventListener("click", reStar);

//Функция для рестарта(возвращает все на 0)
function reStar() {
        alert ("Функционал в разработке")
}



