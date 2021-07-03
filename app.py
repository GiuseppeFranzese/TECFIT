# libraries
import random
import numpy as np
import pickle
import json
from flask import Flask, render_template, request, send_file, jsonify
from flask_ngrok import run_with_ngrok
import nltk
from keras.models import load_model
from nltk.stem import WordNetLemmatizer
from flask_cors import CORS
import pdfkit

lemmatizer = WordNetLemmatizer()

# chat initialization
model = load_model("chatbot_model.h5")
intents = json.loads(open("intents.json").read())
words = pickle.load(open("words.pkl", "rb"))
classes = pickle.load(open("classes.pkl", "rb"))

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
run_with_ngrok(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/Alimentazione/")
def Alimentazione():
    return render_template("Alimentazione.html")


@app.route("/ScegliPiano/")
def scegliPiano():
    return render_template("ScegliPiano.html")


@app.route("/Esecuzione/")
def Esecuzione():
    return render_template("Esecuzione.html")


@app.route("/Alimentazione/Consigli", methods=["POST"])
def inviaConsigli():
    nome = request.form["nome"]
    with open("static/json/" + nome + ".json") as file:
        data = json.load(file)
    return data


@app.route("/Esecuzione/Esercizi", methods=["GET"])
def inviaEsercizi():
    with open("static/json/Esercizi.json") as file:
        data = json.load(file)
    return data


@app.route("/ScegliPiano", methods=["POST"])
def scegliPiano2():
    nome = request.form["nome"]
    cognome = request.form["cognome"]
    eta = request.form["eta"]
    peso = request.form["peso"]
    sesso = request.form["sesso"]
    with open("templates/scheda.html", 'w') as f:
        f.write('''<!DOCTYPE html>
    <html>
    <head>
    <style>
    .Tipo{
        font-weight: bold;
        font-family: inherit;
        color: #2c3e50;
    }
    table,td{
        border: 1px solid #000;
    }
    table{
        width: 100%;
    }
    .testo{
        text-align: center;
    }
    .immagine{
        width:190px;
        height:120px;
    }
    .num{
        font-size: 1.5rem;
    }

    </style>
    </head>
    <body>
     <table>
        <tr>
          <td>
            <img src="http://127.0.0.1:5000/static/img/home/bodybuilder.png" style="width: 100px; height:100px; margin-left:10rem">
            <br><label class="Tipo" style="margin-left:11rem;"> TECFIT</label></td>
          <td><label class="Tipo">Name</label>: ''' + nome.upper() + '''
          <label class="Tipo"> Surname</label>: ''' + cognome.upper() + '''
          <br><label class="Tipo">Age</label>: ''' + eta.upper() + '''
          <br><label class="Tipo">Weight</label>: ''' + peso.upper() + '''
            <label class="Tipo"> Gender</label>: ''' + sesso.upper() + '''
        </tr>
        <tr>
          <td class="Tipo testo"> EXERCISE </td>
          <td class="Tipo testo" style="text-align: center"> N. REP</td>
        </tr>
        <tr>
          <td class="Tipo testo">Chest Crosses
          <br><img class="immagine" src="http://127.0.0.1:5000/static/img/esecuzione/Chest-crosses.jpg">
          </td>
          <td class="testo num">3x8</td>
        </tr>
        <tr>
          <td class="Tipo testo">Bench-Press
          <br><img class="immagine" src="http://127.0.0.1:5000/static/img/esecuzione/Bench-Press.jpg">
          </td>
          <td class="testo num">3x10</td>
        </tr>
        <tr>
          <td class="Tipo testo">Military Press
          <br><img class="immagine" src="http://127.0.0.1:5000/static/img/esecuzione/militarypress.jpg">
          </td>
          <td class="testo num">3x6</td>
        </tr>
        <tr>
          <td class="Tipo testo">Leg Extension
          <br><img class="immagine" src="http://127.0.0.1:5000/static/img/esecuzione/legextension.jpg">
          </td>
          <td class="testo num">4x8</td>
        </tr>
        <tr>
          <td class="Tipo testo">Squat
          <br><img class="immagine" src="http://127.0.0.1:5000/static/img/esecuzione/Squat.jpg">
          </td>
          <td class="testo num">3x10</td>
        </tr>
        <tr>
          <td class="Tipo testo">Row
          <br><img class="immagine" src="http://127.0.0.1:5000/static/img/esecuzione/Row.jpg">
          </td>
          <td class="testo num">3x8</td>
        </tr>
        <tr>
          <td class="Tipo testo">Dips
          <br><img class="immagine" src="http://127.0.0.1:5000/static/img/esecuzione/dips.jpg">
          </td>
          <td class="testo num">3x8</td>
        </tr>
      </table>
    </body>
    </html>''')
    createPdf()
    return "create"


@app.route("/static/Scheda.pdf", methods=["GET"])
def inviaScheda():
    return send_file("static/Scheda.pdf")


@app.route("/", methods=["POST"])
def chatbot_response():
    msg = request.form["msg"]
    if msg.startswith('my name is'):
        name = msg[11:]
        ints = predict_class(msg, model)
        res1 = getResponse(ints, intents)
        res = res1.replace("{n}", name)
    elif msg.startswith('hi my name is'):
        name = msg[14:]
        ints = predict_class(msg, model)
        res1 = getResponse(ints, intents)
        res = res1.replace("{n}", name)
    else:
        ints = predict_class(msg, model)
        res = getResponse(ints, intents)
    return res


# chat functionalities
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words


# return bag of words array: 0 or 1 for each word in the bag that exists in the sentence
def bow(sentence, words, show_details=True):
    # tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # bag of words - matrix of N words, vocabulary matrix
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)


def predict_class(sentence, model):
    # filter out predictions below a threshold
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def getResponse(ints, intents_json):
    tag = ints[0]["intent"]
    list_of_intents = intents_json["intents"]
    for i in list_of_intents:
        if i["tag"] == tag:
            result = random.choice(i["responses"])
            break
    return result


def createPdf():
    pdfkit.from_file("templates/scheda.html", "static/Scheda.pdf")


if __name__ == "__main__":
    app.run()