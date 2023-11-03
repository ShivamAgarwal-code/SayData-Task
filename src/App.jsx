import './App.css';
import icon from './icon.jpg';
import Main from './Components/Layout/Main/Main';
import { useState } from 'react';
import Sidebar from './Components/Layout/Sidebar/Sidebar';
function App() {
  const [isSelected,setIsSelected]=useState("Home");
  return (
    <>
      <div className="App">  {/* This Layout  is divided into two components sidebar and main */}
        <Sidebar isSelected={isSelected} setIsSelected={setIsSelected}/>
        <Main img={icon} isSelected={isSelected}/>
      </div>
    </>
  );
}

export default App;
