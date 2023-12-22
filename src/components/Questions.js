import React, { useState, useEffect } from 'react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Haetaan kysymykset
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:3001/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: selectedOption });
  };

  return (
    <div>
      <h1>Yleistietovisa!</h1>
      <h2>Kysymykset</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.question_text} <br />
            Vaihtoehdot:
            <ul>
              <li>
                <button onClick={() => handleAnswerSelect(question.id, question.option1)}>1) {question.option1}</button>
              </li>
              <li>
                <button onClick={() => handleAnswerSelect(question.id, question.option2)}>2) {question.option2}</button>
              </li>
              <li>
                <button onClick={() => handleAnswerSelect(question.id, question.option3)}>3) {question.option3}</button>
              </li>
              <li>
                <button onClick={() => handleAnswerSelect(question.id, question.option4)}>4) {question.option4}</button>
              </li>
            </ul>
            {selectedAnswers[question.id] ? (
              <>
                Valittu vastaus: {selectedAnswers[question.id]} <br />
                Oikea vastaus: {question.correct_option}
              </>
            ) : null}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;