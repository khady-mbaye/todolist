let form=document.querySelector("form");
let text=document.getElementById("text");
let list = document.querySelector(".list")
let todoCon=document.querySelector(".todo-con")
let array = []
form.addEventListener('submit', (e)=>{
    // e.preventDefault();
    addtodo();
})
let todos=JSON.parse(localStorage.getItem("todos"));
if(todos){
    todos.forEach(element => {
        addtodo(element)
    });
}
function addtodo(elem) {
    let todoColl=document.createElement("div");
    todoColl.classList.add("todocoll")
    let todotext=text.value;
    if(elem){
        todotext=elem.text;
    }
    if(todotext){
    todoColl.innerHTML=`
    <div class="todo-li">
    <div class="check ${elem && elem.complete?"active-check":""}"><img src="./images/icon-check.svg" alt=""></div>
    <p class="ptag ${elem && elem.complete?"complete":""}">${todotext}</p>
    <button class="close"><img src="./images/icon-cross.svg" alt=""></button>
  </div>
  <div class="hr"></div>`;
    todoCon.appendChild(todoColl);
    updateLs()
    }
    array.push(todotext)
    console.log(todotext)
    let close=todoColl.querySelector(".close");
    close.addEventListener("click", ()=>{
        todoColl.remove();
        updateLs();
        array.splice(0,1)
       left.innerText=`${array.length} items left`

    })
    if(array.length===5){
        list.style.cssText = ' margin:5px;position: relative;height: 350px;overflow-y: auto;'
    }
    let check=todoColl.querySelector(".check");
    check.addEventListener('click', ()=>{
        check.classList.toggle("active-check")
        todoColl.children[0].children[1].classList.add("complete")  
        updateLs()
    })
    text.value="";
}

function updateLs() {
    let ptag=document.querySelectorAll(".ptag")
    let arr=[];
    ptag.forEach(element => {
        arr.push({
            text:element.innerText,
            complete:element.classList.contains("complete")
        })
    });
    localStorage.setItem("todos",JSON.stringify(arr));
}
let info=document.querySelectorAll(".choice p")
let todoli=document.querySelectorAll(".todocoll")
console.log(info);
info.forEach(element => {
   element.addEventListener("click", ()=>{
    info.forEach(item => {
        item.classList.remove("active");
    });
    element.classList.add("active")
    if(element.innerText=="Active"){
        todoli.forEach(elem => {
            if(!elem.children[0].children[1].classList.contains("complete")){
                elem.style.display="block";
            }else{
                elem.style.display="none";
            }
        });
    }else if(element.innerText=="Completed"){
        todoli.forEach(elem => {
            if(elem.children[0].children[1].classList.contains("complete")){
                elem.style.display="block";
            }else{
                elem.style.display="none";
            }
        });
    }else{
        todoli.forEach(elem => {
            elem.style.display="block";
        });
    }
   })
});
let clear=document.querySelector(".clear");
clear.addEventListener("click", ()=>{
    todoli.forEach(elem => {
        if(elem.children[0].children[1].classList.contains("complete")){
            elem.remove()
            updateLs();
        }
    });
})
let left=document.querySelector(".left");
function setitem() {
    left.innerText=`${array.length} items left`

    
}
setitem();
/////////////////////////////////////////////////////////////////////////////////////////////
let banner = document.querySelector(".banner")
let body = document.querySelector("body")
let soleil = document.getElementById("sun")
let lune = document.getElementById("lune")
let bloc = document.querySelector(".bloc")
let infochange = document.querySelector(".info")
let listchange = document.querySelector(".list")
let li = document.querySelector(".todo-con")
soleil.addEventListener("click" , ()=>{
    body.style.backgroundColor = "#eee"
    banner.style.backgroundImage = "url('images/bg-desktop-light.jpg')"
    bloc.style.backgroundColor = "#fff"
    li.style.color = "hsl(235, 21%, 11%)"
    listchange.style.backgroundColor = "#fff"
    listchange.style.color = "hsl(235, 21%, 11%)"
    infochange.style.backgroundColor= "#fff"
    text.style.backgroundColor = "#fff"
    text.addEventListener('focus', function() {
        this.style.color = "hsl(235, 21%, 11%)";
      });
    
    soleil.style.display = "none"
    lune.style.display = "block"
})
lune.addEventListener("click" , ()=>{
    body.style.backgroundColor = "hsl(235, 21%, 11%)"
    banner.style.backgroundImage = "url('images/bg-desktop-dark.jpg')"
    bloc.style.backgroundColor = "hsl(235, 21%, 11%)"
    li.style.color = "white"
    listchange.style.backgroundColor = "hsl(235, 21%, 11%)"
    listchange.style.color = "#fff"
    infochange.style.backgroundColor= "hsl(235, 21%, 11%)"
    text.style.backgroundColor = "hsl(235, 21%, 11%)"
    text.addEventListener('focus', function() {
        this.style.color = "#fff";
      });
     lune.style.display = "none"
    soleil.style.display = "block"
})


































































































































































































































































































































































































































































