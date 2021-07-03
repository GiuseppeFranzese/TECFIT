
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/GiuseppeFranzese/TECFIT">
    <img src="/static/img/logo.jpg" alt="Logo" width="150" height="120">
  </a>

# TECFIT

  <p>
    University project
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
    <li><a href="#license">License</a></li>
    <li><a href="#authors">Authors</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

TECFIT is a web application and aims to guide inexperienced users to enter the world of fitness, with a focus on bodybuilding. The user can interact with the system by providing his own parameters. The system provides advice on exercises to be done in the gym and advice on nutrition.
It is possible to receive a personalized card in .pdf format by entering your data and receive support with a chatBot.

| :exclamation:  This project was made for learning purposes only |
|-----------------------------------------------------------------|

### Built With
This project was built using various programming languages, technologies, frameworks and libraries such as:

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

Browser Web

Pyhton

### Installation

1. Create a virtual environment(venv) by terminal: **> py -m venv venv**
2. Move to the folder venv/Scripts: **> cd venv/Scripts**
3. Now activate the virtual environment writing in the terminal "activate": **> activate**
4. Go to project folder and install requirements by requirements.txt file: **> pip install -r requirements.txt** 



IF THERE IS THE ERROR: AttributeError: module 'keras.utils.generic_utils' has no attribute 'populate_dict_with_module_objects'
MODIFY THE FILE __ init __ .py PRESENT IN THE FOLDER: venv/Lib/keras/initializers AND EDIT THE LINES 24,25 WITH:
from tensorflow.python.keras.utils import generic_utils
from tensorflow.python.keras.utils import tf_inspect as inspect

Run the train.py file first to train the model. This will generate a file called chatbot_model.h5.
After running train.py, run app.py to initialize and start the bot.

<!-- LICENSE -->
## License
Apache license 2.0


<!-- AUTHORS -->
## Authors
The authors of this project are
- Giuseppe Franzese [@GiuseppeFranzese](https://github.com/GiuseppeFranzese)
- Giosue' Orefice [@GiosueOrefice](https://github.com/GiosueOrefice)

