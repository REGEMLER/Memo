//Глобальные переменные 
const container = document.getElementById(`container`);
const cardList = document.getElementById(`card-list`); 
let counter = 0; 
const ArrOfReversedCards = [];
let cards = [];

//Создание стартового окна
const createStartTitle = (text) => {
    const h1 = document.createElement(`H1`);
    h1.textContent = text;
    return h1;
}
const createStartText = (text) => {
    const p = document.createElement(`P`); 
    p.textContent = text;
    return p; 
}

const createBtn = (name,id) => {
    const btn = document.createElement(`BUTTON`);
    btn.classList.add(`btn`);
    btn.id = id;
    btn.textContent =  name;
    return btn;
}
const createStartWindow = () => {
    const info = document.createElement(`DIV`);
    info.id = `info`;
    info.classList.add(`info`);
    const title = createStartText(`Добро пожаловать в игру!`);
    const text = createStartText( "Перед Вами появляются карточки разложенные рубашкой вверх, при клике по карточкам они будут переворачиваться. Помните, что одновременно на экране не может быть больше двух перевернутых карточек. Если карточки совпадают - они изчезнут с игрового стола. Ваша цель отыскать все карточки. Выбирайте сложность и удачи!");
    const btn1 = createBtn("Easy", 8);
    const btn2 = createBtn("Normal", 16);
    const btn3 = createBtn("Hard", 32);
    info.append(title);
    info.append(text);
    info.append(btn1);
    info.append(btn2);
    info.append(btn3);
    container.append(info);
    return info;
}


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




//Создание одной карточки 
const generateCard = () => {
    const card = document.createElement(`DIV`);
    card.classList.add(`item`); 
    card.dataset.bgnumber = `100`;
    return card;
}

//Создание колоды карт на 16 или 32 карты
const addArrOfCards = (n) => {
    let arr = [];
    for(let i = 1; i <= n; i++){
        const cardItemA = generateCard();
        const cardItemB = generateCard();
        cardItemA.dataset.order = i;  
        cardItemB.dataset.order = i;
        arr.push(cardItemA,cardItemB);
    }
     let arrSort =  arr.sort(()=> Math.random()-0.5);
    arrSort.forEach(element => {
        cardList.append(element);
    });
    return arrSort;
}


//Создание колоды карт на 64
const addArrOfCardsHard = () => {
    let arr = [];
    for(let i = 1; i <= 16; i++){
        const cardItemA = generateCard(i);
        const cardItemB = generateCard(i);
        const cardItemC = generateCard(i);
        const cardItemD = generateCard(i);
        cardItemA.dataset.order = i;  
        cardItemB.dataset.order = i;
        cardItemC.dataset.order = i;
        cardItemD.dataset.order = i;
        arr.push(cardItemA,cardItemB,cardItemC,cardItemD);
    }
    let arrSort =  arr.sort(()=> Math.random()-0.5);
    arrSort.forEach(element => {
        cardList.append(element);
    });
        return arrSort;
}

//Ход игры
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
        ArrOfReversedCards.push(event.target);
        if(twin){
            event.target.dataset.bgnumber = `0`;
            ArrOfReversedCards.pop();
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
    ArrOfReversedCards[0].dataset.bgnumber = `100`; 
    ArrOfReversedCards.shift();
}


//Запускается, когда игрок захочет сыграть еще раз
const restart = (event) => {
    if(event.target.classList.contains(`restart`)){
        const final = document.getElementById(`final`);
        const rest = document.getElementsByClassName(`item`);
        let arr = [...rest];
        final.remove();
        arr.forEach(item => item.remove());
        cardList.addEventListener(`click`, handler);
        // cards =  addArrOfCards();
        createStartWindow();
    }
}

//Слушатели
cardList.addEventListener(`click`, handler);
container.addEventListener(`click`,restart)
container.addEventListener(`click`,startGame);
//Первый запуск 
createStartWindow();








// Вариант с классами
// const generateCard = number => {
//     const card = document.createElement(`DIV`);
//     card.classList.add(`item`); 
//     card.setAttribute("bgNumber", number)
//     return card;
// }


// const addArrOfCards = () => {
//     let arr = [];
//     for(let i = 1; i <= 4; i++){
//         const cardItemA = generateCard(i);
//         const cardItemB = generateCard(i);
//         const id = i;
//         cardItemA.id = id;  
//         cardItemB.id = id + 100;
//         arr.push(cardItemA,cardItemB);
//     }
//      let arrSort =  arr.sort(()=> Math.random()-0.5);
//      arrSort.forEach(element => {
//         cardList.append(element);
//     });
//     return arrSort;
// }


 

// const handler = (event) => {
//     if(ArrOfReversedCards.includes(event.target) || cards.includes(!event.target)){
//         return;
//     }
//     if(ArrOfReversedCards.length >= 2){
//         checkReversed();
//     }

//     if(event.target.hasAttribute(`bgNumber`)){
//         counter++;
//         let number = event.target.getAttribute(`bgNumber`);
//         event.target.classList.add(`item${number}`);
//         const twin = ArrOfReversedCards.find(i => i.className == event.target.className);
//         ArrOfReversedCards.push(event.target);
//         if(twin){
//             event.target.classList.add(`item-checked`);
//             ArrOfReversedCards.pop();
//             twin.classList.add(`item-checked`);
//             const index = ArrOfReversedCards.indexOf(twin);
//             ArrOfReversedCards.splice(index-1,1);
//             cards.splice(index-1,1);
//             let index1 = cards.indexOf(event.target);
//             cards.splice(index1-1,1);
//         }
//     }
//     if(cards.length === 0){
//         showCongratulations();
//     }
// }

// const showCongratulations = () =>{
//     const final = document.createElement(`DIV`);
//     final.id = `final`;
//     const btn = document.createElement(`BUTTON`);
//     btn.classList.add(`restart`);
//     btn.textContent = `Новая игра`;
//     const finalMessage = document.createElement(`P`);
//     finalMessage.textContent = `Поздравляем! Вы прошли игру за ${counter} ходов`;
//     final.append(finalMessage);
//     final.append(btn);
//     final.classList.add(`congratulations`);
//     container.append(final);
//     cardList.removeEventListener(`click`, handler);
//     counter = 0;
//     ArrOfReversedCards.length = 0;

// }

// const checkReversed = () => {
//     ArrOfReversedCards[0].className = `item`; 
//     ArrOfReversedCards.shift();
// }

// const restart = (event) => {
//     if(event.target.classList.contains(`restart`)){
//         const final = document.getElementById(`final`);
//         const rest = document.getElementsByClassName(`item`);
//         let arr = [...rest];
//         final.remove();
//         arr.forEach(item => item.remove());
//         cardList.addEventListener(`click`, handler);
//         cards =  addArrOfCards();
//     }
// }


// Обработчики 
// cardList.addEventListener(`click`, handler);
// container.addEventListener(`click`,restart)
// container.addEventListener(`click`,startGame);
// let cards = addArrOfCards();
// createStartWindow();



