const draggable_list = document.getElementById("draggable-list")
const check = document.getElementById("check")

const richestPeople = [
  "Elon Musk",
  "Larry Page",
  "Sergey Brin",
  "Jeff Bezos",
  "Mark Zuckerberg",
  "Larry Ellison",
  "Jensen Huang",
  "Bernard Arnault",
  "Rob Walton",
  "Warren Buffett"
];

const listItems = []
let dragStartIndex;

//Create function
createList();

function createList(){
    [...richestPeople]                              //to copy the exist array or list
    .map(a=>({value:a, sort:Math.random()}))  
    .sort((a,b) =>a.sort - b.sort)                      //for shuffling
    .map((a) => a.value)        
    .forEach((person, index)=>{ 
            //  console.log(person);                  

            const listItem = document.createElement("li");
            listItem.classList.add('over')

            listItem.setAttribute("data-index", index);
            listItem.innerHTML= `
            <span class="Number">${index+1}</span>
            <div class = "draggable" draggable="true">
            <p class= "person-name">${person}</p>
            <i class="fa-solid fa-grip-lines"></i>
            </div>
            `;
            listItems.push(listItem)
            draggable_list.appendChild(listItem);
    });
    addEventListener()     
}
function dragStart(){
  // console.log('Event', "dragstart")
  dragStartIndex = +this.closest("li").getAttribute('data-index')
  // console.log(typeof(dragStartIndex));
  
}

function dragEnter(){
  // console.log('Event', "dragenter")
  this.classList.add('over')
}
function dragOver(e){
  // console.log('Event', "dragover")
  e.preventDefault();
}
function dragLeave(){
  // console.log('Event', "dragleave")
  this.classList.remove('over')
}
function dragDrop(){
  // console.log('Event', "dragdrop")
  const dragEndIndex = +this.getAttribute('data-index')
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove('over')
}

function swapItems(fromIndex, toIndex){
  // console.log(123);
  const itemOne = listItems[fromIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')
  // console.log(itemOne, itemTwo)

  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}

function checkOrder(){
  listItems.forEach((listItems, index) =>{
    const personName = listItems.querySelector(".draggable").innerText.trim();

    if(personName !== richestPeople[index]){
      listItems.classList.add('wrong')
    }
    else{
      listItems.classList.remove('wrong')
      listItems.classList.add('right')
    }
  })
}

function addEventListener(){
  const draggables = document.querySelectorAll(".draggable")
  const dragListItems = document.querySelectorAll(".draggable-list li")

  draggables.forEach(draggable =>{
    draggable.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach(item =>{
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
   
  })
}
check.addEventListener("click", checkOrder);