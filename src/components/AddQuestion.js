import React, { useState } from 'react';

// Luodaan kentät
const AddQuestion = ({ onAddQuestion }) => {
  const [newQuestion, setNewQuestion] = useState({
    question_text: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correct_option: '',
  });
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const addQuestion = async () => {
    // Kenttien tarkistus
    if (
      !newQuestion.question_text ||
      !newQuestion.option1 ||
      !newQuestion.option2 ||
      !newQuestion.option3 ||
      !newQuestion.option4 ||
      !newQuestion.correct_option
    ) {
      setMessage('Täytä kaikki kentät ennen kysymyksen lisäämistä.');
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      const result = await response.json();

      // Tarkistaa, onko lisäys onnistunut
      if (result.message === 'Kysymys lisätty!') {
        // Näyttää viestin ja asettaa onnistumis tilan
        setMessage('Kysymys lisätty onnistuneesti!');
        setSuccess(true);

        // Nollaa lomakkeen
        setNewQuestion({
          question_text: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correct_option: '',
        });

       
      } else {
        // Näyttää virheviestin
        setMessage('Virhe kysymyksen lisäämisessä');
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);

      // Näyttää virheviestin
      setMessage('Virhe kysymyksen lisäämisessä');
      setSuccess(false);
    }
  };

  return (
    <div>
      <h2>Lisää uusi kysymys</h2>
      {message && <p style={{ color: success ? 'green' : 'red' }}>{message}</p>}
      <label>Kysymys: </label>
      <input type="text" name="question_text" value={newQuestion.question_text} onChange={handleInputChange} />
      <br />
      <label>Vaihtoehto 1: </label>
      <input type="text" name="option1" value={newQuestion.option1} onChange={handleInputChange} />
      <br />
      <label>Vaihtoehto 2: </label>
      <input type="text" name="option2" value={newQuestion.option2} onChange={handleInputChange} />
      <br />
      <label>Vaihtoehto 3: </label>
      <input type="text" name="option3" value={newQuestion.option3} onChange={handleInputChange} />
      <br />
      <label>Vaihtoehto 4: </label>
      <input type="text" name="option4" value={newQuestion.option4} onChange={handleInputChange} />
      <br />
      <label>Oikea vastaus (1, 2, 3 tai 4): </label>
      <input type="number" name="correct_option" value={newQuestion.correct_option} onChange={handleInputChange} />
      <br />
      <button onClick={addQuestion}>Lisää kysymys</button>
    </div>
  );
};

export default AddQuestion;