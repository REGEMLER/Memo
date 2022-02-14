const container = document.getElementById(`container`);
const cardList = document.getElementById(`card-list`); 
let counter = 0; 
const ArrOfmodels = [];
const ArrOfReversedModels = [];
const ArrOfReversedCards = [];



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
        const modelA = {id, reverssed: false, anchor: cardItemA};
        const modelB = {id: id + 100, reverssed: false, anchor: cardItemB};
        cardItemA.id = id;  
        cardItemB.id = id + 100;
        ArrOfmodels.push(modelA,modelB);
        arr.push(cardItemA,cardItemB);
    }
    return arr.sort(()=> Math.random()-0.5)
}



const cards = addArrOfCards();

const addCard = (arr) => {
    arr.forEach(element => {
        cardList.append(element);
    });
}
 
const handler = (event) => {
    counter++;
    if(ArrOfReversedCards.length >= 2){
        ArrOfReversedCards[0].className = `item`; 
        ArrOfReversedCards.shift();
    }
    if(event.target.hasAttribute(`bgNumber`)){
        const target = cards.find(i => i.id == event.target.id);
        const cleckedModel = ArrOfmodels.find(i => i.id == event.target.id);
        cleckedModel.reverssed = true; 
        ArrOfReversedModels.push(cleckedModel);
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
        alert(`Вы нашли все карточки за ${counter} ходов`)
    }
}

addCard(cards);


cardList.addEventListener(`click`, handler)

