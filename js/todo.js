const toDoform = document.querySelector('.js_toDoform'),
    toDoinput = toDoform.querySelector('input'),
    toDoList = document.querySelector('.js_toDoList');

const TODOS_LS = 'toDos';


let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });//toDod의 id는 숫자이고 li의 id가 문자열이기때문에 숫자로 바꾸기 위해 parseInt를 씀
    toDos = cleanToDos
    saveToDos();
}//filter는 마치 forEach에서 function을 실행하는것 같이 각각의 item과 같이 실행됨

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;
    delBtn.innerText = 'X';
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoinput.value;
    paintToDo(currentValue);
    toDoinput.value = '';
}

function loadToDos(){
     const loadedtoDos = localStorage.getItem(TODOS_LS);
     if(loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos);//string -> object로 변환하기 위해 parse사용.
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });//forEach는 기본적으로 함수를 실행하는데,array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜줌.
     }
}   

function init(){
    loadToDos();
    toDoform.addEventListener('submit', handleSubmit);
}

init();