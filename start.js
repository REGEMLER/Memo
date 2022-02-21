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


export {createStartTitle,createStartText,createBtn,createStartWindow};