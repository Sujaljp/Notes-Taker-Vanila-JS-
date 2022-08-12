console.log('Hello this is app.js');
let addBtn = document.querySelector('#addBtn');
let addTitle = document.querySelector('#addTitle');
let addTxt = document.querySelector('#addTxt');
let delBtn = document.getElementById('delBtn')
let notes = localStorage.getItem('notes');
let titles = localStorage.getItem('titles');
let notesObj;
let notesTitle;
if (notes == null) {
    notesObj = [];
    notesTitle = [];
} else {
    notesObj = JSON.parse(notes);
    notesTitle = JSON.parse(titles)
}
showNotes();
addBtn.addEventListener('click',function(){
    if(addTxt.value === ''){
        return;
    }
    notesTitle.push(addTitle.value)
    notesObj.push(addTxt.value);
    addTitle.value = '';
    addTxt.value = "";
    console.log(notesObj)
    localStorage.setItem('titles',JSON.stringify(notesTitle));
    localStorage.setItem('notes',JSON.stringify(notesObj));
    titles = localStorage.getItem('titles');
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
            html+=`<div class="card cardBody mx-2 my-2" style="width: 20rem;">
            <div class="card-body">
              <h5 class="card-title">${notesTitle[index]}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="del(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
          </div>`
        });
        notesElm.innerHTML=html

    }
    
}

function del(index){
    notesTitle.splice(index, 1);
    notesObj.splice(index, 1);
    localStorage.setItem('titles',JSON.stringify(notesTitle));
    localStorage.setItem('notes',JSON.stringify(notesObj));
    titles = localStorage.getItem('titles');
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


