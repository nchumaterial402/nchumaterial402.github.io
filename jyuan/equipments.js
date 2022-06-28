
var jsonString;
var jsonObj;

function Start(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "../equipments.json", true);   
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
        if (this.status == 200) {
            var file = new File([this.response], 'temp');
            var fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                // do stuff with fileReader.result 
                jsonString = fileReader.result;
                jsonObj = JSON.parse(jsonString);
                console.log("result jsonObj length:", jsonObj.length);
                console.log("result jsonObj:", jsonObj);
                Output();
            });
            fileReader.readAsText(file);
        }
    }

    xhr.send();
}

function Output() {
    document.getElementById("equipmentsTable").innerHTML = ""; //init
    document.getElementById("equipmentsDetail").innerHTML= ""; //init

    for(var i=0;i<jsonObj.length;i++){
        document.getElementById("equipmentsTable").innerHTML += '<div class="col-md-6 col-lg-4"><a class="d-block mx-auto portfolio-item" href="#portfolio-modal-'
            +(i+1)+'"data-toggle="modal"><div class="d-flex portfolio-item-caption position-absolute h-100 w-100"><div class="my-auto portfolio-item-caption-content w-100 text-center text-white"><i class="fa fa-search-plus fa-1x"></i></div></div><h3 class="text-secondary">'
            +jsonObj[i].name+"</h3></a></div>";

        document.getElementById("equipmentsDetail").innerHTML += '<div class="modal text-center" role="dialog" tabindex="-1" id="portfolio-modal-'
            +(i+1)+'"><div class="modal-dialog modal-lg" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><div class="container text-center"><div class="row"><div class="col-lg-8 mx-auto"><h2 class="text-uppercase text-secondary mb-0">'
            +jsonObj[i].name+'</h2><hr class="star-dark mb-5">'
            +SetImgs(i)+'<p class="mb-5">'
            +jsonObj[i].description+'</p></div></div></div></div><div class="modal-footer pb-5"><a class="btn btn-primary btn-lg mx-auto rounded-pill portfolio-modal-dismiss" data-dismiss="modal" aria-label="Close" role="button" href="#"><i class="fa fa-close"></i>&nbsp;Close</a></div></div></div></div>';

    }
    
}

function SetImgs(index) {
    var text = "";
    for(var i=0;i<jsonObj[index].img.length;i++){
        text += '<img class="img-fluid mb-5" src="../assets/img/'+jsonObj[index].img[i]+'"></img>';
    }
    return text;
}
