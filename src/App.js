import './App.css';
import React from 'react';
import EnterIngredients from './components/enterIngredients';
import DisplayRecipe from './components/displayRecipe';

function App() {
  return (
    <div className="App">
        <EnterIngredients />
        <DisplayRecipe />
    </div>
  );
}

export default App;
