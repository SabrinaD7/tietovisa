import React from 'react';
import './App.css';
import Questions from './components/Questions';
import AddQuestion from './components/AddQuestion'


function App() {
  return (
    <div className="App">
   <Questions/>
   <AddQuestion/>
    </div>
  );
}

export default App;