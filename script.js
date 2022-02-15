const container = document.getElementById(`container`);
const cardList = document.getElementById(`card-list`); 
let counter = 0; 
let num;
const ArrOfReversedCards = [];


const start = () => {
    const info = document.createElement(`DIV`);
    const text = document.createElement(`P`);
    text.textContent = "Перед Вами появляются карточки разложенные рубашкой вверх, при клике, они перевернутся. Если карточки совпадают - они изчезнут с игрового стола, если нет - перевернутся обратно. Ваша цель угадать все карточки. Выбирайте сложность и удачи! "
    const title = document.createElement(`H1`);
    title.textContent = "Добро пожаловать в игру!"
    const btn1 = document.createElement(`BUTTON`);
    btn1.id = `btn1`;
    btn1.textContent = `Easy`
    btn1.classList.add(`btn`);
    const btn2 = document.createElement(`BUTTON`);
    btn2.classList.add(`btn`);
    btn2.id = `btn2`;
    btn2.textContent = ` Not Esya`
    info.classList.add(`info`);
    info.append(title);
    info.append(text);
    info.append(btn1);
    info.append(btn2);
    container.append(info);
}

start();
container.addEventListener(`click`, function(event){
    if(event.target.className === `btn`){
        event.target.id === `btn1` ? num = 16 : num = 32;
        event.target.display = `none`;
        console.log(num)
    }
})


const generateCard = number => {
    const card = document.createElement(`DIV`);
    card.classList.add(`item`); 
    card.setAttribute("bgNumber", number)
    return card;
}



const addArrOfCards = () => {
    let arr = [];
    for(let i = 1; i <= 16; i++){
        const cardItemA = generateCard(i);
        const cardItemB = generateCard(i);
        const id = i;
        cardItemA.id = id;  
        cardItemB.id = id + 100;
        arr.push(cardItemA,cardItemB);
    }
     return arr.sort(()=> Math.random()-0.5)
}

const addCard = (arr) => {
    arr.forEach(element => {
        cardList.append(element);
    });
}
 

const handler = (event) => {

    if(ArrOfReversedCards.length >= 2){
        ArrOfReversedCards[0].className = `item`; 
        ArrOfReversedCards.shift();
    }

    if(event.target.hasAttribute(`bgNumber`)){
        counter++;
        const target = cards.find(i => i.id == event.target.id);
        let number = event.target.getAttribute(`bgNumber`);
        event.target.classList.add(`item${number}`);
        const twin = ArrOfReversedCards.find(i => i.className == event.target.className);
        ArrOfReversedCards.push(event.target);
        if(twin){
            event.target.classList.add(`item-checked`);
            ArrOfReversedCards.pop();
            twin.classList.add(`item-checked`);
            const index = ArrOfReversedCards.indexOf(twin);
            ArrOfReversedCards.splice(index-1,1);
            cards.splice(index-1,1);
            let index1 = cards.indexOf(target);
            cards.splice(index1-1,1);
        }
    }

    if(cards.length === 0){
        const final = document.createElement(`DIV`);
        const finalMessage = document.createElement(`P`);
        finalMessage.textContent = `Поздравляем! Вы прошли игру за ${counter} ходов`;
        final.append(finalMessage);
        final.classList.add(`congratulations`);
        container.append(final);
    }
}

const cards = addArrOfCards();
addCard(cards);
cardList.addEventListener(`click`, handler);










////////////////////////////////////////////////////////// Нерабочий вариант с атрибутами
// const generateCard = number => {
//     const card = document.createElement(`DIV`);
//     card.classList.add(`item`); 
//     card.dataset.bgnumber = `100`;
//     return card;
// }

// const handler = (event) => {

//     if(ArrOfReversedCards.length >= 2){
//         ArrOfReversedCards[0].dataset.bgnumber = `100`;
//         ArrOfReversedCards.shift();
//     }

//     if(event.target.classList.contains("item")){
//         counter++;
//         const target = cards.find(i => i.id == event.target.id);
//         let number = event.target.order;
//         event.target.dataset.bgnumber = number;
//         const twin = ArrOfReversedCards.find(i => i.order  == event.target.order);
//         ArrOfReversedCards.push(event.target);
//         console.log(cards);
//         if(twin){
//             event.target.dataset.bgnumber = `0`;
//             ArrOfReversedCards.pop();
//             twin.dataset.bgnumber = `0`;
//             const index = ArrOfReversedCards.indexOf(twin);
//             ArrOfReversedCards.splice(index-1,1);
//             cards.splice(index-1,1);
//             let index1 = cards.indexOf(target);
//             cards.splice(index1-1,1);
//         }
//     }

//     if(cards.length === 0){
//         alert(`Вы нашли все карточки за ${counter} ходов`)
//     }
// }

// const addArrOfCards = () => {
//     let arr = [];
//     for(let i = 1; i <= 4; i++){
//         const cardItemA = generateCard(i);
//         const cardItemB = generateCard(i);
//         const id = i;
//         cardItemA.id = id;  
//         cardItemB.id = id + 100;
//         cardItemA.order = i;  
//         cardItemB.order = i;
//         arr.push(cardItemA,cardItemB);
//     }
//     return arr.sort(()=> Math.random()-0.5)
// }