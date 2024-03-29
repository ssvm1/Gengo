/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CardQuizz from "../components/CardQuizz";
import AnswerBillesComponent from "../components/AnswerBillesComponent";
import Results from "../components/Results";

function Quizz() {
  const [totalScore, setTotalScore] = useState(() => {
    const storedScore = localStorage.getItem("totalScore");
    const parsedScore = storedScore ? parseInt(storedScore, 10) : 20;
    return Number.isNaN(parsedScore) ? 20 : Math.max(parsedScore, 20);
  });

  const [count, setCount] = useState(0);

  const [finished, setFinished] = useState(false);

  useEffect(() => {
    localStorage.setItem("totalScore", totalScore.toString());
  }, [totalScore]);

  const [answerBullets, setAnswerBullets] = useState(Array(10).fill(""));

  // Import themes
  const userThemeFromLocalStorage =
    JSON.parse(localStorage.getItem("userTheme")) || "";
  const [userTheme] = useState(userThemeFromLocalStorage);

  const incrementCount = (cardId, isRight) => {
    if (isRight) {
      setCount((prevCount) => Math.min(prevCount + 1, 30));
      setTotalScore((prevTotalScore) => Math.min(prevTotalScore + 1, 30));
      answerBullets[cardId - 1] = "correct";
    } else {
      answerBullets[cardId - 1] = "notcorrect";
    }

    // get div element from HTML page to put the score inside
    const divScore = document.getElementById("score");
    divScore.innerHTML = count.toString();

    // changed element of answer array into correct
    const updatedBullets = [...answerBullets];
    updatedBullets[cardId - 1] = isRight ? "correct" : "notcorrect";
    setAnswerBullets(updatedBullets);

    if (cardId === 10) {
      const header = document.getElementById("headerQuizz");
      header.classList.add("cardsHide");
      setFinished(true);
    }
  };

  // useEffect(() => {
  //   const storeScore = localStorage.getItem("totalScore");
  //   if (storeScore && parseInt(storeScore, 10 > 30) {
  //     localStorage.setItem("totalScore", 30);
  //     setCount(30);
  //   })
  // } []);

  const levelTitle3 = "Niveau 3: Quizz fini !";
  return (
    <>
      <motion.div
        className="slide-in1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-in2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out1"
        style={{
          backgroundColor: userTheme.backgroundColor,
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="slide-out2"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="myLevelBodyQ">
        <div id="headerQuizz" className="headerQuizz">
          <Link
            to="/Menu"
            className="leaveQuizz"
            style={{
              color: userTheme.color,
              backgroundColor: userTheme.backgroundColor,
              cursor: userTheme.crs,
            }}
          >
            {" "}
            Quitter
          </Link>
          <p className="levelQuizz">Niveau 3: Quizz</p>
          <div className="scoreQuizz">
            <div>Score:</div>
            <div id="score">0</div>
          </div>
        </div>
        <div className="gameQ">
          <div
            id="divResults"
            className={finished ? "containerResult" : "cardsHide"}
          >
            <Results score={count} level={levelTitle3} />
          </div>

          {finished ? (
            <Link
              to="/Menu"
              className="leaveQuizz"
              style={{
                color: userTheme.color,
                backgroundColor: userTheme.backgroundColor,
                cursor: userTheme.crs,
              }}
            >
              {" "}
              Quitter
            </Link>
          ) : (
            <div className="pageContainer">
              <CardQuizz incrementCount={incrementCount} />
            </div>
          )}
        </div>

        <div className="pageContainer">
          <AnswerBillesComponent answers={answerBullets} />
        </div>
      </div>
    </>
  );
}

export default Quizz;
