function caricaConsigli(nome){
    if(document.getElementById(nome) == null){
        getJSON_Consigli(nome);
    }
}


function getJSON_Consigli(nome) {
    $("#Bulk").remove();
    $("#Slimming").remove();
    /*
    $.getJSON("http://127.0.0.1:5000/Alimentazione/Consigli", {"nome": nome},function(result){
              $("#click").append(aggiungiInfo(result));
                });
    */
    $.ajax( //esegui:
        {
            url: "http://127.0.0.1:5000/Alimentazione/Consigli",
            type: "POST",
            data: "nome=" + nome,
            success: function (data) {
                $("#click").append(aggiungiInfo(data));
            },
            error: function() {
                console.log("eooo")
            }

        }
    );

}

function aggiungiInfo(data){
    var i;
    var stringAlimenti = "<ul>";
    for(i=0;i<data.alimenti.length;i++){
        stringAlimenti += "<li>" + data.alimenti[i] + ";</li>";
    }
    stringAlimenti += "</ul>";

    var stringAlimenti2 = "<ul>";
    for(i=0;i<data.alimenti2.length;i++){
        stringAlimenti2 += "<li>" + data.alimenti2[i] + ";</li>";
    }
    stringAlimenti2 += "</ul>";
    var stringHTML = "<div id="+data.title +"> <div class='title text-uppercase'>"+ data.title + "</div>" +
                     "<div class='info'>"+ data.info + stringAlimenti +
                     "<label style='font-weight: bold; font-size: 1.3rem;'>" + data.periodo + "</label>" +
                     stringAlimenti2 + "</ul></div></div> ";
     return stringHTML


}