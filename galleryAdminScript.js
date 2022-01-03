//var imagePaths;
var editBtn;
var modal;
var imageId;
  
function loadImagesWithOptions(imagePaths){

    console.log(imagePaths);

    modal = document.getElementById("myModal");

    var btn = document.getElementById("ani-btn");

    var span = document.getElementsByClassName("close")[0];
 
    btn.onclick = function(){
        modal.style.display="block";
        imageId=-1;
    }

    span.onclick = function() {
        modal.style.display = "none";
        closeAllErrors();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        closeAllErrors();
        }
    }

    var editBtn=[];
    var remBtn=[];

    console.log(btn.onclick);

    var grid=document.getElementById('grid');
    grid.innerHTML="";
    for(let i=0;i<imagePaths.length;i++){

        grid.innerHTML = grid.innerHTML + '<div class="grid-item"><img src="'+imagePaths[i].path+'"><br><button class="edit-btn" id="edit-btn-'+imagePaths[i].id+'">Edit</button><button id="rem-btn-'+imagePaths[i].id+'" class="rem-btn">Remove</button></div>' 
    }



    for(let i=0;i<imagePaths.length;i++){
        editBtn.push(document.getElementById("edit-btn-"+imagePaths[i].id));
        editBtn[i].onclick=function(){
            modal.style.display="block";
            imageId=imagePaths[i].id;
        }
    }

    for(let i=0;i<imagePaths.length;i++){
        remBtn.push(document.getElementById("rem-btn-"+imagePaths[i].id));
        remBtn[i].onclick=function(){
            removeImage(imagePaths[i].id);
        }
    }

}

function addImage(url){
    fetch('http://localhost:3000/imagePaths', {
  method: 'POST',
  body: JSON.stringify({
    path:url
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {console.log(json);   
    fetchJSONData()});
}

function submitModal(buttonId){
    let name = document.getElementById("img-name").value;
    let url = document.getElementById("img-url").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("img-date").value;

    var expression = 
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    var regex = new RegExp(expression); 

    if(name==""){
        document.getElementById('name-error').style.display="block";
        return false;
    }
    if(url==""|| !url.match(regex)){
        document.getElementById('url-error').style.display="block";
        return false;
    }
    if(description.length<10){
        document.getElementById('desc-error').style.display="block";
        return false;
    }
    console.log(date);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' +dd;
    console.log(today);
    if(date=="" || date>today){
        document.getElementById('date-error').style.display="block";
        return false;
    }
    modal.style.display="none";
    closeAllErrors();
    if(imageId===-1){
        addImage(url);
    }
    else{
        editImage(url);
    }
}


function editImage(url){
    fetch('http://localhost:3000/imagePaths/'+imageId, {
  method: 'PUT',
  body: JSON.stringify({
    id:imageId,
    path:url
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {console.log(json);   
    fetchJSONData()});
}

function fetchJSONData(){
    var jsonData;
    fetch('http://localhost:3000/imagePaths')
  .then((response) => response.json())
  .then((json) => {
    //console.log(json);
    loadImagesWithOptions(json);
});
}


function removeImage(imageIndex){
    fetch('http://localhost:3000/imagePaths/'+imageIndex, {
  method: 'DELETE',
}).then(fetchJSONData());
}


function closeAllErrors(){
    document.getElementById('name-error').style.display="none";
        document.getElementById('url-error').style.display="none";
        document.getElementById('desc-error').style.display="none";
        document.getElementById('date-error').style.display="none";
}