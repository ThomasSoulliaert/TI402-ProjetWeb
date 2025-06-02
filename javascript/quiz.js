/* === Quiz : Contrôle de lancement et logique de réponse === */

// Variables globales
let essai = 0;
let derniereSoumission = [];
let peutSoumettre = true;
let quizStarted = false;
let timerInterval;
let tempsRestant = 600; // 600 secondes = 10 minutes

// Vérifie les champs avant de commencer
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

// Confirmation utilisateur + compte à rebours
function quizConfirm() {
    if (quizStarted) return;

    const confirmationUtilisateur = confirm("Êtes-vous sûr de vouloir continuer ?");
    if (!confirmationUtilisateur) {
        alert("Quiz annulé.");
        return;
    }

    // Affichage compte à rebours de 3 secondes
    let timer = 3;
    const countdownDiv = document.createElement("div");
    countdownDiv.id = "countdown";
    countdownDiv.style.position = "fixed";
    countdownDiv.style.top = "50%";
    countdownDiv.style.left = "50%";
    countdownDiv.style.transform = "translate(-50%, -50%)";
    countdownDiv.style.fontSize = "5em";
    countdownDiv.style.fontWeight = "bold";
    countdownDiv.style.color = "#0077b6";
    countdownDiv.style.zIndex = "1000";
    countdownDiv.style.background = "#fff";
    countdownDiv.style.padding = "30px";
    countdownDiv.style.borderRadius = "20px";
    countdownDiv.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";
    countdownDiv.textContent = timer;
    document.body.appendChild(countdownDiv);

    const interval = setInterval(() => {
        timer--;
        if (timer > 0) {
            countdownDiv.textContent = timer;
        } else {
            clearInterval(interval);
            countdownDiv.remove();
            lancerQuiz();
        }
    }, 1000);
}

// Démarrage du quiz + affichage du formulaire
function lancerQuiz() {
    alert("C'est parti !");
    document.getElementById("quiz-form").style.display = "block";
    document.getElementById("quiz-form").scrollIntoView({ behavior: "smooth" });
    quizStarted = true;
    demarrerChrono();
}

// Gestion de la soumission du quiz
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

  // Bloque la soumission si rien n'a changé
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

    // Calcul du score
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

    // Affiche le score à l'utilisateur
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

// Réactive la soumission si modification d'une réponse
document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', () => {
        peutSoumettre = true;
    });
});

// Chronomètre principal (10 minutes)
function demarrerChrono() {
    const chrono = document.createElement("div");
    chrono.id = "chrono";
    chrono.style.position = "sticky";
    chrono.style.top = "0";
    chrono.style.backgroundColor = "#fff";
    chrono.style.border = "2px solid #0077b6";
    chrono.style.padding = "10px";
    chrono.style.marginBottom = "20px";
    chrono.style.fontSize = "1.5em";
    chrono.style.fontWeight = "bold";
    chrono.style.color = "#d00000";
    chrono.style.textAlign = "center";
    chrono.style.zIndex = "999";

    chrono.textContent = formatTemps(tempsRestant);
    document.getElementById("quiz-form").prepend(chrono);

    timerInterval = setInterval(() => {
        tempsRestant--;
        if (tempsRestant <= 0) {
            clearInterval(timerInterval);
            document.getElementById("chrono").textContent = "Temps écoulé !";
            document.getElementById("submit-btn").disabled = true;
            alert("Temps écoulé ! Le quiz est terminé.");
        } else {
            document.getElementById("chrono").textContent = formatTemps(tempsRestant);
        }
    }, 1000);
}

// Formatage du temps en mm:ss
function formatTemps(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `Temps restant : ${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
}