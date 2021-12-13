import React from "react";
import { AnswerObject } from "../App";
import "../index.css";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNumber, 
    totalQuestions
}) => (
    <div>
        <p className = "text-3xl font-bold m-5">
            Question: {questionNumber} / {totalQuestions}            
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }}
        className="font-sans text-3xl text-red-700 m-5 align-center" />
        <div className="border-solid shadow-black ">
            {answers.map(answer =>(
                <div key={answer}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-5 rounded py-2 px-4 "  disabled={!!userAnswer} 
                    value = {answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </button>
                </div>
            ) )}
        </div>

    </div>
); 

export default QuestionCard;