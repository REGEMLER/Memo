import {generateCard,addArrOfCards,addArrOfCardsHard} from "./cards.js";
import {createStartTitle,createStartText,createBtn,createStartWindow} from "./start.js";
//Глобальные переменные 
const container = document.getElementById(`container`);
const cardList = document.getElementById(`card-list`); 
let counter = 0; 
const ArrOfReversedCards = [];
let cards = [];

const startGame = (event) => {
    if(event.target.hasAttribute(`id`)){
        const numberOfCards = event.target.id;
        const info = document.getElementById(`info`);
        const cardList = document.getElementById(`card-list`); 
        if(numberOfCards == 8 || numberOfCards == 16){
            cardList.className = `card-list`;
        }
        if(numberOfCards == 32){
            cardList.className = `card-list-big`;
        }
        info.remove();
        if(cardList.classList.contains(`card-list-big`)){
            cards = addArrOfCardsHard();
        }
        if(cardList.classList.contains(`card-list`)){
            cards =  addArrOfCards(numberOfCards);
        }
    }
}

const handler = (event) => {
    if(ArrOfReversedCards.includes(event.target) || event.target.dataset.bgnumber ===`0`){
        return;
    }
    if(event.target.hasAttribute("data-order")){
         if(ArrOfReversedCards.length >= 2){
             checkReversed();
         }
        counter++;
        let order = event.target.getAttribute(`data-order`);
        event.target.dataset.bgnumber = order;
        const twin = ArrOfReversedCards.find(i => i.dataset.order  === order);
        if(!twin){
            ArrOfReversedCards.push(event.target);
        }
        if(twin){
            event.target.dataset.bgnumber = `0`;
            twin.dataset.bgnumber = `0`;
            const index = ArrOfReversedCards.indexOf(twin);
            ArrOfReversedCards.splice(index-1,1);
            cards.splice(index-1,1);
            let index1 = cards.indexOf(event.target);
            cards.splice(index1-1,1);
        }
    }
    if(cards.length === 0){
        showCongratulations();
    }
}

//Запускается, после того, как игрок нашел все карточки
const showCongratulations = () =>{
    const final = document.createElement(`DIV`);
    final.id = `final`;
    const btn = document.createElement(`BUTTON`);
    btn.classList.add(`restart`);
    btn.textContent = `Новая игра`;
    const finalMessage = document.createElement(`P`);
    finalMessage.textContent = `Поздравляем! Вы прошли игру за ${counter} ходов`;
    final.append(finalMessage);
    final.append(btn);
    final.classList.add(`congratulations`);
    container.append(final);
    cardList.removeEventListener(`click`, handler);
    counter = 0;
    ArrOfReversedCards.length = 0;
}

//Запускается когда открыто больше двух карточек
const checkReversed = () => {
    ArrOfReversedCards.forEach(item => item.dataset.bgnumber = `100`);
    ArrOfReversedCards.length = 0;
}


//Запускается, когда игрок захочет сыграть еще раз
const restart = (event) => {
    if(event.target.classList.contains(`restart`)){
        const final = document.getElementById(`final`);
        const rest = document.getElementsByClassName(`item`);
        const cardList = document.getElementById(`card-list`);
        let arr = [...rest];
        final.remove();
        arr.forEach(item => item.remove());
        cardList.addEventListener(`click`, handler);
        createStartWindow();
    }
}

//Слушатели
cardList.addEventListener(`click`, handler);
container.addEventListener(`click`,restart)
container.addEventListener(`click`,startGame);
//Первый запуск 
createStartWindow();