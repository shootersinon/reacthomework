import React from 'react';

function App(){
      return (
         <div>
            <Header/>
            <Content/>
         </div>
      );
   }
function Header()
   {
      return (
         <div>
            <h1>Homework</h1>
         </div>
      );
   }
function Content(){
      return (
         <div>
            <h2>Content</h2>
            <p>This App2.js</p>
         </div>
      );
}
export default App;