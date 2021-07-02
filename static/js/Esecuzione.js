const searchWrapper = document.querySelector(".tec-searchInput");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".tec-autocomBox");

inputBox.onkeyup = (e) =>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        emptyArray = suggerimenti.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());

        });
       emptyArray = emptyArray.map((data)=>{
           return data = '<li>'+ data +'</li>'
       });
       console.log(emptyArray);
       searchWrapper.classList.add("active");
        showSuggerimenti(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i=0; i<allList.length; i++){
            allList[i].setAttribute("onclick","select(this)");
        }
    } else {
        searchWrapper.classList.remove("active");
    }

}

function select(element){
    let selectUserData = element.textContent;
    inputBox.value = selectUserData;
    searchWrapper.classList.remove("active");
}

function showSuggerimenti(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>' + userValue + '</li>'
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;

}

let suggerimenti = [
    "SQUAT",
    "DEADLIFTS",
    "PULL-UP",
    "ROW",
    "DIPS",
    "CHEST-CROSSES",
    "BENCH-PRESS"
]

function getJSON_Esercizi() {
        var esercizioValue = document.getElementById("cerca").value;
        esercizioValue = esercizioValue.toUpperCase();
        if(suggerimenti.includes(esercizioValue)){
             $.getJSON("http://127.0.0.1:5000/Esecuzione/Esercizi", function(result){
                  $(".esercizio").remove()
                    $(".contenitore").append(aggiungiInfo(result,esercizioValue));
                    });
         }

           /*
    $.ajax( //esegui:
        {
            url: "http://127.0.0.1:5000/Esecuzione",
            type: "POST",
            data: "esercizio=" + esercizioValue,
            success: function (data) {
                $(".esercizio").remove()
                $(".contenitore").append(aggiungiInfo(data,esercizioValue));
            },
            error: function() {
                console.log("eooo")
            }

        }
    ); */
}

function aggiungiInfo(data,esercizioValue){
    var stringHTML;
    stringHTML = "<div class='esercizio' id="+ esercizioValue + "> <div class='title text-uppercase'>" +
                  esercizioValue + "</div> <div  width:22rem'>" +
                    "<img class='img-fluid img-esercizi' src='../static/img/esecuzione/"+ esercizioValue +".jpg'/></div> <br>" +
                    "<div>" + data[esercizioValue] + "</div> </div> </div>";
    return stringHTML;
}

const node = document.getElementById("cerca");
node.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        getJSON_Esercizi(node.value);
    }
});