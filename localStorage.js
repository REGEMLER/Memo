const getResults = () => {
    let list = null;
    let results = null;
    let LSR = localStorage.getItem("results");
    if(LSR){
        results = JSON.parse(LSR); 
    }
    list = results ?  results : [];
    return list;
}

const setResult = (clicks) => {
    const oldResults = getResults();
    const date = new Date();
    const time = date.toLocaleString();
    let newResult = `${time} - You win for ${clicks} clicks`; 
    const newresults = [...oldResults, newResult];
    if(newresults.length > 10) {
        newresults.shift(); 
    }
    const ls = JSON.stringify(newresults);
    localStorage.setItem("results", ls);
}

export {setResult, getResults};