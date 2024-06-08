import './App.css';
import React from 'react';
import { UserProvider } from './UserContext';
import EnterIngredients from './components/enterIngredients';
import DisplayRecipe from './components/displayRecipe';
import UserAuthentication from './components/UserAuthentication';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <div className='sideBar'>

          <div className='sideBarTitle'>
          <img className='pickleLogo' src={require('./components/styles/logopickle.png')} alt='pickle'/>
          <h1 className='title'>PICKLE RECIPE</h1>
          <h3 className='subtitle'>Clean your Fridge & Reduce Food Waste</h3>
          </div>
          <UserAuthentication />
          <EnterIngredients />
        </div>
        <DisplayRecipe />
      </UserProvider>
    </div>
  );
}

export default App;
