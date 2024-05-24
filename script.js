const soal = [
    {
        answer: 'undefined',
        hint: 'instruktur terganteng UwU',
    },
    {
        answer: 'saras',
        hint: 'growth mindset',
    },
    {
        answer: 'ardi',
        hint: '"kasarnya gitu guys"',
    },
    {
        answer: 'radit',
        hint: 'Coba perhatiin',
    },
    {
        answer: 'boom',
        hint: 'markicop',
    },
    {
        answer: 'farhan',
        hint: 'figma boy ',
    },
    {
        answer: 'null',
        hint: 'Instruktur Tercantik xixi',
    },
    {
        answer: 'kayla',
        hint: 'Manis, Manis banget',
    },
    {
        answer: 'fm',
        hint: 'Kantin Terbaik',
    },
    {
        answer: 'reiza',
        hint: 'Batch 16 termoeda',
    }
];

// const pemain = [
//     {
//         id: 1,

//     }
// ]
let score = 0;
let displayScore = document.querySelector(`.display-score`);

let soalLength = soal.length;

let typingInput = document.querySelector('.typing-input');
let inputs = document.querySelector('.inputs');
let hintTxt = document.querySelector('.hint span');
let remainingGuessTxt = document.querySelector('.guess-left span');
let wrongLetterTxt = document.querySelector('.wrong-letter span');
let resetBtn = document.querySelector('.reset-btn');

let counterHeart = 5;
let remainingGuess = 5;

let counterSoal = 0;
let soalAcak, hintShowed, incorrect = [], correct = [];

function gameLose () {
    if (window.confirm(`NOOO kamu kalah, score kamu ${score}; Mulai ulang?`)) {
        resetGame();
    }
}

function gameWin () {
    if (window.confirm(`Yeay Kamu Menang. Score kamu ${score}. Itu artinya kamu sangat meng-hacktiv`)) {
        resetGame();
    }
}

function genereateKotakInput (answerLength) {
    for (let i = 0; i < answerLength; i++)  {
        // console.log();
        let kotak = document.createElement('input');
        kotak.setAttribute('type', 'text');
        kotak.setAttribute('id', 'inputBlock');
        // kotak.setAttribute('disable',''); 
        inputs.appendChild(kotak);
        // console.log('loop ke',i);
    }
}

// ==== LOGIC HATI =====
function genereateHeart (counter) {
    for (let i = 0; i < counter; i++)  {
        // console.log();
        let heart = document.createElement('div');
        heart.setAttribute('class', 'heart');
        heart.innerText = "❤";
        remainingGuessTxt.parentElement.appendChild(heart);
        // console.log('loop ke',i);
    }
}
// ==== LOGIC HATI =====

function randomSoal () {
    // ===== LOGIC KALO SOAL NGURUT =====
    soalAcak = soal[counterSoal]
    console.log(counterSoal, 'soal acak ke');
    answerLength = soalAcak.answer.length;
    counterSoal++;
    console.log(counterSoal,'Counter Soal', );
    // ===== LOGIC KALO SOAL NGURUT =====

    // ===== LOGIC KALO SOAL NGACAK =====
    // soalAcak = soal[Math.floor(Math.random()*soalLength)];
    // answerLength = soalAcak.answer.length;
    // ===== LOGIC KALO SOAL NGACAK =====

    // ==== LOGIC HATI =====
    let allHearts = document.querySelectorAll('.heart');
    console.log(allHearts);
    allHearts.forEach(e => e.remove());
    // ==== LOGIC HATI =====

    hintTxt.innerHTML = soalAcak.hint;
    // switch (soalAcak.level) {
    //     case 1:
    //         remainingGuess = 5;
    //         // ==== LOGIC HATI =====
    //         counterHeart = 5;
    //          // ==== LOGIC HATI =====    
    //         break;
    //     case 2:     
    //        remainingGuess = 2;
    //        // ==== LOGIC HATI =====
    //         counterHeart = 2;
    //         // ==== LOGIC HATI =====
    //         break; 
    // }

    // console.log(soalAcak); 
    // console.log(remainingGuess);
    // console.log(answerLength);
    // remainingGuessTxt.innerHTML = remainingGuess;
    incorrect = []; correct = [];
    genereateKotakInput(answerLength);
    // ==== LOGIC HATI =====
    genereateHeart(counterHeart);
    // ==== LOGIC HATI =====
}

function answerCheck (e) {
    console.log(remainingGuess,'remaining guess');
    // displayScore.innerHTML = score;

    //ubah keyCode jadi String
    let huruf = String.fromCharCode(e.keyCode).toLowerCase();
    console.log(huruf);

    //cek apakah yg diteken huruf , cek apakah huruf yg bener diteken untuk kesekian kalinya.
    if (!(/^[a-zA-Z]+$/.test(huruf)) || correct.includes(huruf) || incorrect.includes(huruf)) {
        // console.log('ini angka');
        return;
    }

    //kalo jawaban salah:
    if (!soalAcak.answer.includes(huruf)) {
        if (remainingGuess > 0) remainingGuess--;
        // remainingGuessTxt.innerHTML = remainingGuess;
        incorrect.push(huruf);

        // ==== LOGIC HATI =====
        if (counterHeart > 0) counterHeart--;
        let heartElement = document.querySelectorAll('.heart');
        console.log(counterHeart,'counter Heart');
        heartElement[0].remove();
        // ==== LOGIC HATI =====

        //call fungsi kekalahan huaaaa
        if (remainingGuess === 0) {
            //lakukan fungsi kalah, nampilin page kalah
            gameLose();
            // document.body.style.backgroundColor = 'red';
            
            // ======================SEMENTARAAAAAAAA==================
            // setTimeout(() => {
            //     location.reload();
            // }, 2000);
            // ======================SEMENTARAAAAAAAA==================
        }

        return;
        // console.log(incorrect,83);
    }
    
    console.log(correct,90);
    
    //mengisi kotak kalo jawaban bener
    const masukan = document.querySelectorAll(".inputs input");
    const masukanLength = masukan.length;
    for (let i = 0; i < masukanLength; i++) {
        console.log(masukan[i], 92);
        if (soalAcak.answer[i] === huruf) {
            masukan[i].value = huruf
            correct.push(huruf);
            
        }
    }
    // if (incorrect.includes(huruf)) {
    //     incorrect.push(huruf);
    //     remainingGuess--;
    // }
    setTimeout(() => {
        if (correct.length === answerLength) {
            score+=20;
            wrongLetterTxt.innerHTML = score;
            //Call fungsi kemenangan cihuyy
            if (score === 20*soalLength){
                gameWin();
                return
            }
            console.log(score,'score =======');
            while (inputs.firstChild) {
                inputs.removeChild(inputs.firstChild);
            }
            randomSoal();
        };
    }, 2000);
    console.log('huruf nih');
    console.log(correct,112);
}

function resetGame () {
    score = 0;
    wrongLetterTxt.innerHTML = score;
    counterSoal = 0;

    // ==== LOGIC HATI =====
    counterHeart = 5;
    let allHearts = document.querySelectorAll('.heart');
    console.log(allHearts);
    allHearts.forEach(e => e.remove());
    // ==== LOGIC HATI =====

    while (inputs.firstChild) {
        inputs.removeChild(inputs.firstChild);
    }
    remainingGuess = 5;
    randomSoal();
};

randomSoal();
document.addEventListener('keydown', (e) => answerCheck(e));
resetBtn.addEventListener('click',resetGame);
    // answerCheck(e);});

