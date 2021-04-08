import React from 'react';

const App =()=>{
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
const Header =()=>
   {
      return (
         <div>
            <h1>Homework</h1>
         </div>
      );
   }
const Content =()=>{
      return (
         <div>
            <h2>Content</h2>
            <p>This App3.js</p>
         </div>
      );
}
export default App;