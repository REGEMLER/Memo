//Создание одной карточки 
const generateCard = () => {
    const card = document.createElement(`DIV`);
    card.classList.add(`item`); 
    card.dataset.bgnumber = `100`;
    return card;
}

//Создание колоды карт на 16 или 32 карты
const addArrOfCards = (n) => {
    const cardList = document.getElementById("card-list");
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
    const cardList = document.getElementById("card-list");
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

export {generateCard,addArrOfCards,addArrOfCardsHard};


