import { useState } from "react"

export default function Home() {

    const [questions, setQuestions] = useState([
        {
            question: 'question goes here',
            answers: [
                {name: 'answer name here', correct: true},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
            ]
        },
        {
            question: 'question goes here',
            answers: [
                {name: 'answer name here', correct: true},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
            ]
        },
        {
            question: 'question goes here',
            answers: [
                {name: 'answer name here', correct: true},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
            ]
        },
        {
            question: 'question goes here',
            answers: [
                {name: 'answer name here', correct: true},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
                {name: 'answer name here', correct: false},
            ]
        }
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(undefined);
    const [points, setPoints] = useState(0);
    return (
            <div className="navigation">
                <html>
                    <head>
                        <title>CourseCreator</title>
                        <link rel="stylesheet" href="style.css">
                        </link>    
                    </head>
                    <body>
                        <div class="app">
                            <h1>Review Quiz</h1>
                            <div class="quiz">
                                <h2 id="question">{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</h2>
                                <div id="answer-buttons">
                                    <button class="btn" onClick={() => setSelectedAnswer(0)} style={{ backgroundColor: selectedAnswer === 0 ? 'black' : 'white', color: selectedAnswer === 0 ? 'white' : 'black' }}>{questions[currentQuestionIndex].answers[0].name}</button>
                                    <button class="btn" onClick={() => setSelectedAnswer(1)} style={{ backgroundColor: selectedAnswer === 1 ? 'black' : 'white', color: selectedAnswer === 1 ? 'white' : 'black' }}>{questions[currentQuestionIndex].answers[1].name}</button>
                                    <button class="btn" onClick={() => setSelectedAnswer(2)} style={{ backgroundColor: selectedAnswer === 2 ? 'black' : 'white', color: selectedAnswer === 2 ? 'white' : 'black' }}>{questions[currentQuestionIndex].answers[2].name}</button>
                                    <button class="btn" onClick={() => setSelectedAnswer(3)} style={{ backgroundColor: selectedAnswer === 3 ? 'black' : 'white', color: selectedAnswer === 3 ? 'white' : 'black' }}>{questions[currentQuestionIndex].answers[3].name}</button>
                                </div>
                                <button id="next-btn" onClick={() => {

                                    // check answer
                                    console.log('index:' + selectedAnswer);

                                    const answer = questions[currentQuestionIndex].answers[selectedAnswer];
                                    console.log({answer})
                                    // update UI
                                    if (answer.correct){
                                        setPoints((currentPoints) => currentPoints += 1);
                                        console.log(points);
                                    }

                                    // and then, go on

                                    if (currentQuestionIndex === questions.length - 1) {
                                        setCurrentQuestionIndex(0);
                                        setPoints(0);
                                    } else {
                                        setCurrentQuestionIndex((currentVal) => currentVal += 1);
                                    }

                                    setSelectedAnswer(undefined);
                                }}>Next</button>
                            </div>
                        </div>
                        <script src="script.js"></script>
                    </body>
                </html>
            </div>
    )
}