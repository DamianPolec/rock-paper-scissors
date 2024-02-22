// stan
// score
//plyer pick
// ai pick

const plahyerWinsKey = 'playerWins';
const AIWinsKey = 'AIWins';

const winningResults = {
    paper:['rock'],
    rock: ['scissors'],
    scissors: ['paper'],
}

let state = {
    playerWins: Number(localStorage.getItem(plahyerWinsKey)) || 0,
    AIWins: Number(localStorage.getItem(AIWinsKey)) || 0,
    playerPick: null,
    AIPick: null,
};
const renderScore =()=>{
    const pointsElement = document.querySelector(".points");
    pointsElement.innerText = state.playerWins - state.AIWins;
};
const bindPickEvent = ()=>{
document.querySelectorAll('.options button').forEach((button)=>{
    button.addEventListener('click', pick)
    });
};

const pick = (e)=>{
    pickByPlayer(e.currentTarget.dataset.pick);
    pickByAI();
    hidenOptions();
    showFight();
};

const pickByPlayer = (pickedOption)=>{
 state = {
    ...state,
    playerPick: pickedOption,
 }
}

const pickByAI =()=>{
    const options = ["rock", "paper", "scissors"];
    const AIPick = options[Math.floor(Math.random() * options.length)];

    state = {
        ...state,
        AIPick,
    }
}
const hidenOptions = ()=>{
    document.querySelector(".options").classList.add("slide-left");
}

const button = document.querySelector('.result__button');
button.addEventListener('click', again = () => {
    document.querySelector(".options").classList.remove("slide-left");
    document.querySelector(".fight").classList.remove("slide-left");
    document.querySelector(".options").classList.remove("hidden");
    
})


const showFight = ()=>{
    document.querySelector(".fight").classList.add("slide-left");
    createElementPickByPlayer();
    createElementPickByAI();
    showResult();
};

const showResult = () =>{
    const text=document.querySelector(".result__text");
    if(state.AIPick === state.playerPick){
       text.textContent = 'Remis';
    }
    else if (winningResults[state.playerPick].includes(state.AIPick)){
        localStorage.setItem(plahyerWinsKey, state.playerWins +1);
        text.textContent = 'Wygrałeś!';
        state = {
            ...state,
            playerWins: state.playerWins +1,
            
        }
    } else{
        localStorage.setItem(plahyerWinsKey, state.AIWins + 1);
        text.textContent = 'Przegrałeś!';
        state = {
            ...state,
            AIWins: state.AIWins +1,
    }
};
    setTimeout(renderResult, 500);

};
const renderResult = () =>{
    document.querySelector('.result').classList.add('shown');
}

const createElementPickByPlayer = () =>{
    const playerPick = state.playerPick;

 
    const pickContainerElement = document.querySelector(
        ".pick__container--player"
    );
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(playerPick));
};
const createElementPickByAI =() =>{
    const AIPick = state.AIPick;

 
    const pickContainerElement = document.querySelector(
        ".pick__container--ai"
    );
    pickContainerElement.innerHTML = "";
    pickContainerElement.appendChild(createPickElement(AIPick));
}
const createPickElement = (option) =>{
    const pickElement =document.createElement('div');
    pickElement.classList.add("button", `button--${option}`);

    const imageContainerElement = document.createElement('div');
    imageContainerElement.classList.add("button__img--container");

    const imgElement = document.createElement('img');
    imgElement.src = `images/icon-${option}.svg`;
    imgElement.alt = option;

    imageContainerElement.appendChild(imgElement);

    pickElement.appendChild(imageContainerElement);
    return pickElement;

}
const init = ()=>{
renderScore();
bindPickEvent();
}

init();