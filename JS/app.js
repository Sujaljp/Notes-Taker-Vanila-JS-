console.log('Hello this is app.js');
let addBtn = document.querySelector('#addBtn');
let addTxt = document.querySelector('#addTxt');
let delBtn = document.getElementById('delBtn')
let notes = localStorage.getItem('notes');
let notesObj;
if (notes == null) {
    notesObj = [];
} else {
    notesObj = JSON.parse(notes);
}
showNotes();
addBtn.addEventListener('click',function(){
    if(addTxt.value === ''){
        return;
    }
    notesObj.push(addTxt.value);
    addTxt.value = "";
    console.log(notesObj)
    localStorage.setItem('notes',JSON.stringify(notesObj));
    notes = localStorage.getItem('notes');
    showNotes();
})

function showNotes() {
    let notesElm = document.getElementById('notes');

    if(notesObj.length==0){
        notesElm.innerHTML="No notes added yet please add some..."
    } else {

        let html ="";
        notesObj.forEach(function (element,index) {
            html+=`<div class="cardBody mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index+1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="del(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>`
        });
        notesElm.innerHTML=html

    }
    
}

function del(index){
    notesObj.splice(index, 1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    notes = localStorage.getItem('notes');
    showNotes();
}

//search
let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('cardBody');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            console.log(cardTxt);
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })

})


