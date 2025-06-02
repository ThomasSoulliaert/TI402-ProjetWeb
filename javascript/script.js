/* Header */

// Evénement qui se déclenche à chaque fois que l'utilisateur fait défiler la page
window.addEventListener("scroll", function () {
    const header = document.querySelector("header"); // Sélectionne l'élément <header> dans la page
    
    // Si la position verticale du défilement (scrollY) est supérieure à 0
    if (window.scrollY > 0) {
        header.classList.add("shrink"); // Si oui, ajoute la classe "shrink" au header (réduit la taille et change le style en fonction du css)
    } else {
        header.classList.remove("shrink"); // Sinon (quand on est en haut de la page), on retire la classe "shrink"
    }
});



/*Quiz */
let essai = 0;
let derniereSoumission = [];
let peutSoumettre = true;

function quizAlert() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("mail").value.trim();
  const naissance = document.getElementById("date_naissance").value.trim();

  if (!nom || !prenom || !email || !naissance) {
    alert("Veuillez remplir tous les champs avant de commencer le quiz.");
    return;
  }

  alert("Vous êtes sur le point de commencer le quiz !");
  quizConfirm();
}

let quizStarted = false;
function quizConfirm() {
  if (quizStarted) return;
  const confirmationUtilisateur = confirm("Êtes-vous sûr de vouloir continuer ?");
  if (confirmationUtilisateur) {
    let timer = 3;
    const confirmation = document.createElement("p");
    confirmation.id = "countdown";
    confirmation.textContent = `Le quiz commence dans ${timer} secondes...`;
    confirmation.style.color = "red";
    confirmation.style.fontSize = "1.5em";
    confirmation.style.fontWeight = "bold";
    confirmation.style.textAlign = "center";
    document.body.insertBefore(confirmation, document.body.children[1]);

    const interval = setInterval(() => {
      timer--;
      confirmation.textContent = `Le quiz commence dans ${timer} secondes...`;

      if (timer === 0) {
        clearInterval(interval);
        confirmation.remove();
        alert("C'est parti !");
        document.getElementById("quiz-form").style.display = "block";
        document.getElementById("quiz-form").scrollIntoView({ behavior: "smooth" });
        quizStarted = true;
      }
    }, 1000);
  } else {
    alert("Quiz annulé.");
  }
}

document.getElementById("submit-btn").addEventListener("click", submitQuiz);

function submitQuiz() {
  const totalQuestions = 20;

  if (!peutSoumettre) {
    alert("Veuillez modifier au moins une réponse avant de renvoyer.");
    return;
  }

  const reponsesActuelles = [];
  for (let i = 1; i <= totalQuestions; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);
    reponsesActuelles.push(checked ? checked.value : null);
  }

  if (JSON.stringify(reponsesActuelles) === JSON.stringify(derniereSoumission)) {
    alert("Vous n'avez rien changé depuis la dernière soumission.");
    return;
  }

  derniereSoumission = [...reponsesActuelles];
  peutSoumettre = false;

  const answeredQuestions = reponsesActuelles.filter(r => r !== null).length;
  if (answeredQuestions < totalQuestions) {
    if (!confirm(`Il manque ${totalQuestions - answeredQuestions} réponses. Êtes-vous sûrs de vouloir soumettre ?`)) {
      return;
    }
  }

  essai++;
  let score = 0;
  const bonnesReponses = {
    q1: "c", q2: "b", q3: "b", q4: "c", q5: "c", q6: "b", q7: "c", q8: "b", q9: "b", q10: "d",
    q11: "c", q12: "b", q13: "c", q14: "b", q15: "c", q16: "a", q17: "b", q18: "b", q19: "b", q20: "c"
  };

  for (let i = 1; i <= totalQuestions; i++) {
    const qName = "q" + i;
    const reponse = document.querySelector(`input[name="${qName}"]:checked`);
    if (reponse) {
      if (reponse.value === bonnesReponses[qName]) {
        score += 1;
      } else {
        score -= 0.5;
      }
    }
  }

  const oldScore = document.getElementById("score-display");
  if (oldScore) oldScore.remove();

  const scoreDisplay = document.createElement("p");
  scoreDisplay.id = "score-display";
  scoreDisplay.textContent = `Essai n°${essai} : Votre score est ${score} / 20`;
  scoreDisplay.style.fontSize = "1.2em";
  scoreDisplay.style.fontWeight = "bold";
  scoreDisplay.style.color = score >= 10 ? "green" : "red";
  scoreDisplay.style.marginTop = "20px";

  document.getElementById("quiz-form").appendChild(scoreDisplay);
}

// Réactivation de la soumission si une réponse est changée
document.querySelectorAll('input[type="radio"]').forEach(input => {
  input.addEventListener('change', () => {
    peutSoumettre = true;
  });
});