import React from 'react';
import logo from './logo.svg';
import './App.css';



function isParent(nodes, parent, id) {
  if(nodes.find(node => node.parent === parent && node.id === id)) return true
  else if(!nodes.find(node => node.id === id).parent) return false
  else if(nodes.find(node => node.id === id).parent !== parent){
    return isParent(nodes, parent, nodes.find(node => node.id === id).parent)
  }
}


function getParent(nodes, id) {
  let curr = nodes.find(node => node.id === id)
  return nodes.find(node => node.id === curr.parent)
  
}

function getRoot(nodes, id) {
  // Your Implementation Here
  if(!nodes.find(node => node.id === id).parent) return nodes.find(node => node.id === id);
  else{
    return getRoot(nodes, nodes.find(node => node.id === id).parent)
  }
}




function convert(items) {
  // Your Implementation Here
}

//console.log(getRoot(tree, 3)) // { id: 1 }


function App() {

  const tree = [
      { id: 1 }, 
      { id: 2, parent: 1 }, 
      { id: 3, parent: 2 },
      { id: 4, parent: 3 }, 
      { id: 5, parent: 2 }, 
      { id: 6, parent: 1 }]

  //is a parent of b? s
  /*console.log(isParent(tree, 1, 2)) // true
  console.log(isParent(tree, 2, 1)) // false
  console.log(isParent(tree, 1, 5)) // true*/
  
  /*
  console.log(getParent(tree, 2)) // { id: 1 }
  console.log(getParent(tree, 3)) // { id: 2, parent: 1 }
  console.log(getParent(tree, 4)) // { id: 3, parent: 2 }*/
  
  
  console.log(getRoot(tree, 1)) // null
  console.log(getRoot(tree, 3)) // { id: 1 }
  console.log(getRoot(tree, 4)) // { id: 1 }


  
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

}

export default App;
