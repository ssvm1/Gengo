import React, { useState } from "react";
import "../style/CardQuizz.css";
import PropTypes from "prop-types";
// import Speech from "react-text-to-speech";
// import speaker from "../assets/speak.png";

const quizzAnimal = [
  {
    question: "Qu'est-ce qu'un animal arboricole ?",
    answer1: "Un animal qui mangent les feuilles.",
    answer2: "Un animal qui vit dans les arbres.",
    validAnswer: 2,
  },
  {
    question: "Quel animal est doté d'un exosquelette ?",
    answer1: "Tortue",
    answer2: "Méduse",
    validAnswer: 1,
  },
  {
    question: "Quel est le plus grand oiseau du monde ?",
    answer1: "Autruche",
    answer2: "Condor",
    validAnswer: 1,
  },
  {
    question:
      "Quel animal est capable de survivre dans des environnements extrêmes, tels que les volcans sous-marins ?",
    answer1: "Limace de mer",
    answer2: "Tardigrade",
    validAnswer: 2,
  },
  {
    question:
      "Quel est l'oiseau capable de voler en arrière et de rester immobile dans l'air ?",
    answer1: "Colibri",
    answer2: "Faucon",
    validAnswer: 1,
  },
  {
    question: "Quel serpent est capable de cracher du venin sur ses proies ?",
    answer1: " Cobra",
    answer2: "Vipère",
    validAnswer: 1,
  },
  {
    question:
      "Quelle créature marine est souvent appelée -licorne des mers- en raison de sa longue corne torsadée ?",
    answer1: "Raie manta",
    answer2: "Narval",
    validAnswer: 2,
  },
  {
    question: "Quel est le plus grand reptile volant connu de l'histoire ?",
    answer1: "Quetzalcoatlus",
    answer2: "Archaeopteryx",
    validAnswer: 1,
  },
  {
    question: "Quel est le seul mammifère capable de vol actif ?",
    answer1: "Écureuil volant",
    answer2: "Chauve-souris",
    validAnswer: 2,
  },
  {
    question:
      "Quel insecte réalise la migration la plus longue par rapport à sa taille, parcourant des milliers de kilomètres ?",
    answer1: "Papillon monarque",
    answer2: "Criquet migrateur",
    validAnswer: 1,
  },
  {
    question: "",
    answer1: "",
    answer2: "",
    validAnswer: 0,
  },
];

// const startBtn = <img src={speaker} alt="speak" className="speakerQuizz" />;

function CardQuizz({ incrementCount }) {
  CardQuizz.propTypes = {
    incrementCount: PropTypes.func.isRequired,
  };

  const [card, setCard] = useState(0);

  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  function handleClick() {
    const choice1 = document.getElementById("input1");
    const choice2 = document.getElementById("input2");

    if (choice1.checked === false && choice2.checked === false) {
      return;
    }

    setCard(card + 1);

    const { validAnswer } = quizzAnimal[card];

    if (
      (choice1.checked === true && validAnswer === 1) ||
      (choice2.checked === true && validAnswer === 2)
    ) {
      incrementCount(card + 1, true);
    } else {
      incrementCount(card + 1, false);
    }

    choice1.checked = false;
    choice2.checked = false;
  }

  return (
    <div
      id="quizzCard"
      className={card === 10 ? "cardsHide" : "questionCardContainer"}
    >
      {/* <div className="listenContainer"> */}
      {/* <Speech
          text={quizzAnimal[card].question}
          pitch={1.5}
          rate={1.5}
          volume={0.5}
          startBtn={startBtn}
        /> */}
      {/* </div> */}
      <h4 className="questionQ">{quizzAnimal[card].question}</h4>
      <div className="inputCardContainer">
        <div className="inputRadio1">
          <input type="radio" id="input1" name="choice" value="input1" />
          <label htmlFor="input1">{quizzAnimal[card].answer1}</label>
        </div>
        <div className="inputRadio2">
          <input type="radio" id="input2" name="choice" value="input2" />
          <label htmlFor="input2">{quizzAnimal[card].answer2}</label>
        </div>
      </div>
      <div>
        <button
          id="buttonValidate"
          type="submit"
          className="buttonValidate"
          onClick={handleClick}
          style={{
            color: userTheme.color,
            backgroundColor: userTheme.backgroundColor,
            cursor: userTheme.crs,
          }}
        >
          Valider
        </button>
      </div>
    </div>
  );
}

export default CardQuizz;
