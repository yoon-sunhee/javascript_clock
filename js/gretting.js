
const form = document.querySelector('.js_form'),
    input = form.querySelector('input'),
    greeting = document.querySelector('.js_greetings');

const USER_LS = 'currentUser',
    SHOWHING_CN = 'showing';

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    
}

function askForName(){
    form.classList.add(SHOWHING_CN);
    form.addEventListener('submit', handleSubmit)
}

function paintGreeting(text){
    form.classList.remove(SHOWHING_CN);
    greeting.classList.add(SHOWHING_CN);
    greeting.innerHTML = `Hello! ${text} <br> What is your main focus for today?`;
}

function loadName(){
        const currentUser = localStorage.getItem(USER_LS);
        if(currentUser == null){
         askForName();   // 유저가 없는 경우 
        }else{
         paintGreeting(currentUser)   // 유저가 있는 경우
        }
}


function init(){
    loadName();
}

init();