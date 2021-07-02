
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/GiuseppeFranzese/TECFIT">
    <img src="/static/img/logo.jpg" alt="Logo" width="150" height="120">
  </a>

# TECFIT

  <p>
    Progetto universitario
    <br />
    <a href="https://github.com/GiuseppeFranzese/TECFIT"><strong>Explore the docs »</strong></a>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#authors">Authors</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

TECFIT ha l'obiettivo di guidare utenti inesperti ad entrare nel mondo del fitness, con focus bodybuilding. L'utente può interagire con il sistema fornendo i propri parametri. Il sistema prevede consigli sugli esercizi da svolgere in palestra e consigli sull'alimentazione.
E' possibile ricevere una scheda personalizzata in formato .pdf inserendo i propri dati e ricevere supporto con un chatBot.

| :exclamation:  This project was made for learning purposes only |
|-----------------------------------------------------------------|

### Built With
Questo progetto è stato realizzato utilizzando vari linguaggi di programmazione, tecnologie, framework e librerie come:

<ul>
<li>HTML5</li>
<li>CSS3</li>
<li>Bootstrap</li>
<li>Javascript (JQuery)</li>
<li>Python (Flask)</li>
</ul>




<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Browser Web per mostrare l'applicazione web
Pyhton per avviare un server locale

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/GiuseppeFranzese/TECFIT
   ```
2. Installa le librerie
   ```sh
   $ pip install -r requirements.txt
   ```
NEL CASO IN CUI CI SIA L'ERRORE: AttributeError: module 'keras.utils.generic_utils' has no attribute 'populate_dict_with_module_objects'
MODIFICARE IL FILE __ init __ .py PRESENTE NELLA CARTELLA: venv/Lib/keras/initializers E MODIFICARE LE RIGHE 24,25 CON:
from tensorflow.python.keras.utils import generic_utils
from tensorflow.python.keras.utils import tf_inspect as inspect

Eseguire prima il file train.py per addestrare il modello. Questo genererà un file chiamato chatbot_model.h5.
Dopo aver eseguito train.py, esegui app.py per inizializzare e avviare il bot.
<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com


<!-- LICENSE -->
## License
Apache license


<!-- AUTHORS -->
## Authors
The authors of this project are
- Giuseppe Franzese [@GiuseppeFranzese](https://github.com/GiuseppeFranzese)
- Giosue' Orefice [@GiosueOrefice](https://github.com/GiosueOrefice)

