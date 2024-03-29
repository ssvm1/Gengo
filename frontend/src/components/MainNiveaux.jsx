import "../style/MainNiveaux.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Transition from "./Transition";

function MainNiveaux() {
  // Récupère et parse le thème utilisateur depuis le localStorage.
  // Si non trouvé, définit un objet vide comme valeur par défaut
  const userTheme = JSON.parse(localStorage.getItem("userTheme")) || "";

  // Récupère le score utilisateur depuis le localStorage
  // convertion en entier, avec une valeur par défaut de 0 si y'a rien dedans
  const userScoreFromLocalStorage =
    parseInt(localStorage.getItem("totalScore"), 10) || 0;
  // Utilise useState pour créer 'userScore' avec la valeur récupérée
  const [userScore, setUserScore] = useState(userScoreFromLocalStorage);

  // useEffect pour écouter les changements dans le localStorage
  useEffect(() => {
    // Définit une fonction pour gérer les changements du localStorage
    const handleStorageChange = () => {
      // Met à jour le score utilisateur en le récupérant à nouveau du localStorage
      const updatedScore =
        parseInt(localStorage.getItem("totalScore"), 10) || 0;
      setUserScore(updatedScore); // Met à jour l'état 'userScore'
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // const handlePlayTransition = () => {
  //   return <Transition />;
  // };

  return (
    <div className="container">
      {/* Bloc pour le Niveau 1 */}
      <div className="niveau1">
        <h2>Niveau 1: Écoute</h2>
        {/* Le lien change en fonction du score utilisateur :
            - Dirige vers "/ListenGameBis" si score >= 10 Sinon, dirige vers "/speech" */}
        <Link to={userScore >= 10 ? "/ListenGameBis" : "/speech"}>
          <button
            type="button"
            className="btnEnter1"
            // onClick={handlePlayTransition}
            // Style du bouton basé sur le thème utilisateur.
            style={{
              color: userTheme.color,
              backgroundColor: userTheme.backgroundColor,
              cursor: userTheme.crs,
            }}
          >
            {userScore >= 10 ? "Refaire" : "Entrer"}
          </button>
        </Link>
      </div>

      {/* Bloc pour le Niveau 2 */}
      <div className="niveau2">
        <h2>Niveau 2: Synonymes</h2>
        {/* - Si score >= 10, affiche un lien fonctionnel.
            - Si score >= 20, le lien dirige vers "/WordSynonymComponentBis".
            - Si score < 10, affiche un bouton désactivé avec un style différent. */}
        {userScore >= 10 ? (
          <Link to={userScore >= 20 ? "/WordSynonymComponentBis" : "/synonym"}>
            <button
              type="button"
              className="btnEnter2"
              // onClick={handlePlayTransition}
              style={{
                color: userTheme.color,
                backgroundColor: userTheme.backgroundColor,
                cursor: userTheme.crs,
              }}
            >
              {userScore >= 20 ? "Refaire" : "Entrer"}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="btnEnter2"
            disabled
            style={{
              color: userTheme.color,
              backgroundColor: "#cccccc",
              cursor: "not-allowed",
            }}
          >
            Verrouillé
          </button>
        )}
      </div>

      {/* Bloc pour le Niveau 3 */}
      <div className="niveau3">
        <h2>Niveau 3: Quizz</h2>
        {/* - Si score >= 20, affiche un lien fonctionnel vers "/quizz".
            - Si score < 20, affiche un bouton désactivé avec un style différent. */}
        {userScore >= 20 ? (
          <Link to={userScore >= 30 ? "/quizzBis" : "/quizz"}>
            <button
              type="button"
              className="btnEnter3"
              // onClick={handlePlayTransition}
              style={{
                color: userTheme.color,
                backgroundColor: userTheme.backgroundColor,
                cursor: userTheme.crs,
              }}
            >
              {userScore >= 30 ? "Refaire" : "Entrer"}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="btnEnter3"
            disabled
            style={{
              color: userTheme.color,
              backgroundColor: "#cccccc",
              cursor: "not-allowed",
            }}
          >
            Verrouillé
          </button>
        )}
        {/* Commenté : Icône de cadenas pour le niveau */}
        {/* <img
          src="/src/assets/cadenas.png"
          alt="icone cadenas"
          className="lock3"
        /> */}
      </div>
      {/* Bloc pour le Niveau 4 */}
      <div className="niveau4">
        <h2>Niveau 4: Mélange des mots</h2>
        {/* - Si score >= 10, affiche un lien fonctionnel.
            - Si score >= 20, le lien dirige vers "/WordSynonymComponentBis".
            - Si score < 10, affiche un bouton désactivé avec un style différent. */}
        {userScore >= 30 ? (
          <Link
            to={userScore >= 40 ? "/JeuOrdreLettresBis" : "/JeuOrdreLettres"}
          >
            <button
              type="button"
              className="btnEnter2"
              style={{
                color: userTheme.color,
                backgroundColor: userTheme.backgroundColor,
                cursor: userTheme.crs,
              }}
            >
              {userScore >= 40 ? "Refaire" : "Entrer"}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="btnEnter2"
            disabled
            style={{
              color: userTheme.color,
              backgroundColor: "#cccccc",
              cursor: "not-allowed",
            }}
          >
            Verrouillé
          </button>
        )}
      </div>
    </div>
  );
}

export default MainNiveaux;
