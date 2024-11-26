const boardSize = 20;
let playerPosition = 0;

// Lista de perguntas
let questions = [
    {
        question: "Qual é o nome do hidrocarboneto de fórmula C2H6?",
        answer: "ETANO",
    },
    {
        question: "Como se chama o alcano de cadeia linear com cinco carbonos?",
        answer: "PENTANO"
    },
    {
        question: "Qual é a fórmula molecular do propino?",
        answer: "C3H4"
    },
    {
        question: "Qual é o nome do alceno de fórmula C2H4?",
        answer: "ETENO"
    },
    {
        question: "Como se chama o alcano de cadeia linear com oito carbonos?",
        answer: "OCTANO"
    },
    {
        question: "Qual é a fórmula molecular do butino?",
        answer: "C4H6"
    },
    {
        question: "Qual é o nome do alcano com fórmula molecular C3H8?",
        answer: "PROPANO"
    },
    {
        question: "Como se chama o alceno com três carbonos?",
        answer: "PROPENO"
    },
    {
        question: "Qual é a fórmula molecular do metano?",
        answer: "CH4"
    },
    {
        question: "Qual é o nome do alcano de cadeia linear com dez carbonos?",
        answer: "DECANO"
    },
    {
        question: "Como se chama o alcino com dois carbonos?",
        answer: "ETINO"
    },
    {
        question: "Qual é a fórmula molecular do hexano?",
        answer: "C6H14"
    },
    {
        question: "Qual é o nome do alceno de fórmula C4H8?",
        answer: "BUTENO"
    },
    {
        question: "Como se chama o alcino com quatro carbonos?",
        answer: "BUTINO"
    },
    {
        question: "Qual é a fórmula molecular do nonano?",
        answer: "C9H20"
    },
    {
        question: "Qual é o nome do hidrocarboneto aromático mais simples?",
        answer: "BENZENO"
    },
    {
        question: "Como se chama o alcano cíclico com seis carbonos?",
        answer: "CICLO-HEXANO"
    },
    {
        question: "Qual é a fórmula molecular do pentino?",
        answer: "C5H8"
    },
    {
        question: "Qual é o nome do alceno com cinco carbonos?",
        answer: "PENTENO"
    },
    {
        question: "Como se chama o alcano de cadeia linear com sete carbonos?",
        answer: "HEPTANO"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const rollDiceButton = document.getElementById('rollDice');
    const questionContainer = document.getElementById('questionContainer');
    const questionText = document.getElementById('questionText');
    const answerInput = document.getElementById('answerInput');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const questionsRemaining = document.getElementById('questionsRemaining');

    // Inicializa o tabuleiro
    for (let i = 0; i < boardSize; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = 'square-' + i;
        square.textContent = i + 1;
        board.appendChild(square);
    }

    // Marca a posição inicial do jogador
    updatePlayerPosition();

    // Embaralha as perguntas no início do jogo
    shuffleArray(questions);
    updateQuestionsRemaining();

    rollDiceButton.addEventListener('click', () => {
        if (questions.length === 0) {
            alert('Não há mais perguntas disponíveis.');
            return;
        }

        // Seleciona e remove a próxima pergunta
        const randomQuestion = questions.shift();

        questionText.textContent = randomQuestion.question;
        questionContainer.classList.remove('hidden');

        submitAnswerButton.onclick = () => {
            const userAnswer = answerInput.value.toUpperCase().trim();
            const normalizedUserAnswer = userAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            const normalizedCorrectAnswer = randomQuestion.answer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if (normalizedUserAnswer === normalizedCorrectAnswer) {
                alert('Resposta correta!');
                movePlayer();
            } else {
                alert(`Resposta incorreta. A resposta correta era: ${randomQuestion.answer}.`);
            }
            answerInput.value = '';
            questionContainer.classList.add('hidden');
            updateQuestionsRemaining();
            checkWinCondition();
        };
    });

    function movePlayer() {
        playerPosition += 1;
        if (playerPosition >= boardSize) {
            playerPosition = boardSize - 1;
        }
        updatePlayerPosition();
    }

    function updatePlayerPosition() {
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('player');
        });
        const currentSquare = document.getElementById('square-' + playerPosition);
        currentSquare.classList.add('player');
    }

    function checkWinCondition() {
        if (playerPosition === boardSize - 1) {
            alert('Parabéns! Você completou o jogo.');
            rollDiceButton.disabled = true;
        }
    }

    // Função para embaralhar o array de perguntas
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Atualiza o contador de perguntas restantes
    function updateQuestionsRemaining() {
        questionsRemaining.textContent = `Perguntas restantes: ${questions.length}`;
    }
});
