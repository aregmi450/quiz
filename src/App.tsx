// main file for our project 
import React, {useState} from 'react';
import {fetchQuizQuestions} from './API';
//components
import QuestionCard from './components/QuestionCard';
//TYPES
import {QuestionState, Difficulty } from './API';
import "./index.css";


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const TOTAL_QUESTIONS = 10;
const App = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  // console.log(questions);


const startTrivia = async() => {
  setLoading(true);
  setGameOver(false);

  const newQuestions = await fetchQuizQuestions(
    TOTAL_QUESTIONS,
    Difficulty.EASY
  );
  setQuestions(newQuestions);
  setScore(0);
  setUserAnswers([]);
  setNumber(0);
  setLoading(false);
}

const checkAnswer
= (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!gameOver) {
    //users answers
    const answer = e.currentTarget.value;
    //check answer against the correct value 
    const correct = questions[number].correct_answer === answer;
    //add score if answer is correct
    if(correct) setScore(prev => prev + 1);
    //save answer in the array 
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject
    ]);
  }
};  

const nextQuestion = () => {
  const nextQuestion = number + 1;
  if(nextQuestion === TOTAL_QUESTIONS) {
    setGameOver(true);
  } else {
    setNumber(nextQuestion)
  }
}
return (
    <div className= "App">
    <h1 className="font-sans text-5xl text-green-600 m-5 align-center" > QUIZ ME </h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className='bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r m-5 text-center' onClick={startTrivia}>
          Start
        </button>
      ): null} 
    {!gameOver ? <p className='bg-yellow-500 hover:bg-orange-700 text-white py-2 px-4 rounded inline-flex items-center m-5'>Score: {score}</p> : null }
      {loading && <p className='font-sans text-5xl text-blue-700 m-5 align-center'>Loading Questions ...</p>}
      {!loading && !gameOver && (
      <QuestionCard 
      questionNumber={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
      />
      )}
      {!gameOver && 
      !loading && 
      userAnswers.length === number + 1 && 
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r m-5' onClick={nextQuestion}> Next
      </button>
      ): null}
    </div>
  );
}

export default App;
