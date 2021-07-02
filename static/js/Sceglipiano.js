const form = document.getElementById('tec-formscegli');
const Nome = document.getElementById('Nome');
const Cognome = document.getElementById('Cognome');
const Eta = document.getElementById('Eta');
const Peso = document.getElementById('Peso');
const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2');
var nameValue = Nome.value.trim();
var cognomeValue = Cognome.value.trim();
var etaValue = Eta.value.trim();
var pesoValue = Peso.value.trim();

form.addEventListener('submit', e => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
     nameValue = Nome.value.trim();
     cognomeValue = Cognome.value.trim();
     etaValue = Eta.value.trim();
     pesoValue = Peso.value.trim();
    var sessoValue;

    if(nameValue === '') {
        setErrorFor(Nome, 'Nome cannot be blank');
    } else if(isNaN(nameValue)==false) {
        setErrorFor(Nome, 'You cannot insert number');
    }
    else {
            setSuccessFor(Nome);
        }


    if(cognomeValue === '') {
        setErrorFor(Cognome, 'Cognome cannot be blank');
    }   else if(isNaN(cognomeValue)==false){
        setErrorFor(Cognome, 'You cannot insert number');
    } else {
        setSuccessFor(Cognome);
    }

    if(etaValue === '') {
        setErrorFor(Eta, 'Eta cannot be blank');
    } else if(isNaN(etaValue)){
        setErrorFor(Eta, 'Insert a number');
    }else {
        setSuccessFor(Eta);
    }

    if(pesoValue === '') {
        setErrorFor(Peso, 'Peso cannot be blank');
    }
    else if(isNaN(pesoValue)){
        setErrorFor(Peso, 'Insert a number');
    }
    else{
        setSuccessFor(Peso);
    }

      if(radio1.checked){
        sessoValue = "Maschio"
    }
    else {
        sessoValue = "Femmina"
    }
    console.log(cognomeValue + nameValue + etaValue + pesoValue + "ciao")
    if(nameValue !='' && cognomeValue!='' && etaValue!='' && pesoValue!='') {
        console.log("ciaoo")
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/ScegliPiano",
             data: "nome=" + nameValue + "&cognome=" + cognomeValue + "&eta=" + etaValue + "&peso=" + pesoValue +
                        "&sesso=" + sessoValue,
            dataType: "html",
            success: function (msg) {
                Nome.disabled = true;
                Cognome.disabled = true;
                Eta.disabled = true;
                Peso.disabled = true;
                radio2.disabled = true;
                radio1.disabled = true;
                document.getElementById("tec-buttonDownload").style.display = "block";
            },
            error: function () {
                alert("Chiamata fallita, si prega di riprovare...");
            }

        });

    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'tec-formControlScegli error';
    small.innerText =  message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'tec-formControlScegli success';
}


function loadDoc() {
    if (nameValue !== '' && cognomeValue !== '' && etaValue !== '' && pesoValue !== '') {
        axios({
            url: 'http://localhost:5000/static/Scheda.pdf',
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Scheda_TECFIT.pdf');
            document.body.appendChild(link);
            link.click();
        });
    }
}

