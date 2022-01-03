function loadImages(imagePaths){
    var grid=document.getElementById('grid');
    for(var i=0;i<imagePaths.length;i++){

    grid.innerHTML = grid.innerHTML + '<div class="grid-item"><img src="'+imagePaths[i].path+'"></div>'
    }
}


function fetchJSONData(){
    var jsonData;
    fetch('http://localhost:3000/imagePaths')
  .then((response) => response.json())
  .then((json) => {
    loadImages(json);
});
}