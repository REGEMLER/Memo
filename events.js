import {getResults} from "./localStarage.js";

const showCongratulations = () =>{
    return function (ArrOfReversedCards, handler, counter) {
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
        ArrOfReversedCards.length = 0;
    }
}

const checkReversed = () => {
    return function(ArrOfReversedCards){
        ArrOfReversedCards.forEach(item => item.dataset.bgnumber = `100`);
        ArrOfReversedCards.length = 0;
    }
}

const showResults = () => {
    const list = document.querySelector(".results");
    if(list.classList.contains("results-visible")) {
        list.classList.remove("results-visible"); 
        list.innerHTML = "";
    } else {
        list.classList.add("results-visible");
        const results = getResults();
        for (let result of results) {
            const li = document.createElement("li");
            li.textContent = result;
            list.append(li);
        }
    }
    list.addEventListener("click", () => {
        list.classList.remove("results-visible"); 
        list.innerHTML = "";
    })
}

export {showCongratulations, checkReversed, showResults};