//Selectors
button = document.getElementById("gumb");
button_container = document.getElementById("gumb-container");
item = document.getElementsByClassName("item");
form = document.getElementById("naslov");
task_container = document.getElementsByClassName("items");

//Listeners
button.addEventListener("click",addtodo);

//Variables
var todos =[];

//Functions

function addtodo () {

    input = document.createElement("input");
    input.setAttribute("type","text");
    input.addEventListener("keydown", inputtodo);
    button.remove();
    form.appendChild(input);
    input.focus();
}

function inputtodo(e) {
    if (e.key === "Enter") {
        if(todos.find(element=>element==input.value)){
            console.log("Already added");
            refresh_btn();
            return;
        } 
        else {
        todos.push(input.value);
        refresh_btn();
        refresh(); 
        }
   } 
}

function refresh_btn () {

    input.remove();
    button_container.appendChild(button);

}

function refresh() {

    if (task_container.length > 0 && item[0]){
        item[0].remove();
    }
    else if (todos.length==0) {
        addnotask(); 
        return;
    }
    //Create notdone icon
    ikona = document.createElement("img");
    ikona.src = "./icons/notdone.svg";
    ikona.id = "ikona";
    ikona.alt ="notdone";
    //Create trash icon
    let ikona1 = document.createElement ("img");
    ikona1.src = "./icons/trash.svg";
    ikona1.id = "ikona1";
    
    for (i=0; i<todos.length; i++) {
        var task = document.createElement("li");
        var task_div = document.createElement("div");
        task.classList.add('items');
        task_div.classList.add('task_container');
        task.innerHTML += todos[i];
        task_div.appendChild(task);
        task_div.appendChild(ikona);
        task_div.appendChild(ikona1);
    }
    task_container[0].appendChild(task_div);

    for (i=0; i < todos.length; i++) {
        task_container[0].children[i].children[1].addEventListener("click",fun);
        task_container[0].children[i].children[2].addEventListener("click",fun_delete);
   }   
}

function fun() {

    if (this.alt == "notdone") {
         this.src = "./icons/done.svg";
         this.alt = "done";
         this.parentElement.children[0].classList.add('li-done');
    }
    else {
         this.src = "./icons/notdone.svg";
         this.alt = "notdone";
         this.parentElement.children[0].classList.remove('li-done')
    }
} 

function fun_delete(e) {

for (i=0; i < todos.length; i++) {

    if (todos[i] == e.target.parentElement.firstChild.textContent){
         e.target.parentElement.remove();
         todos = todos.slice(0, i).concat(todos.slice(i + 1, todos.length));
    }
 }
 if (todos.length==0) addnotask();
}

function addnotask () {
    let notask = document.createElement("li");
    notask.classList.add('item');
    notask.innerText += "No tasks!";
    task_container[0].appendChild(notask);
}
