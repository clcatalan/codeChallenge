import React from 'react'
import logo from './logo.svg'
import './App.css'

function isParent (nodes, parent, id) {
  const curr = nodes.find(node => node.id === id)
  if (nodes.find(node => node.parent === parent && node.id === id)) return true
  else if (!curr.parent) return false
  else if (curr.parent !== parent) return isParent(nodes, parent, curr.parent)
}

function getParent (nodes, id) {
  const curr = nodes.find(node => node.id === id)
  return nodes.find(node => node.id === curr.parent)
}

function getRoot (nodes, id) {
  const curr = nodes.find(node => node.id === id)
  if (!curr.parent) { return curr } else { return getRoot(nodes, curr.parent) }
}

function generateMap (items) {
  const h = {}
  for (const node of items) {
    if (!h[node.id]) h[node.id] = []
    if (node.parent) h[node.parent] = [...h[node.parent], node]
  }
  return h
}

function convert (items) {
  const h = generateMap(items)
  const converted = []
  let memoize = []
  let prevParent = 0
  Object.keys(h).reverse().forEach(key => {
    if (h[key].length > 0) {
      const m = memoize.length > 0 ? memoize.find(m => m.parent === prevParent) : null // null {id:4, parent: 3}
      if (m) {
        memoize.forEach(m => delete m.parent)
        const curr = h[key].find(k => k.id === prevParent)
        curr.children = []
        curr.children = [...memoize]
        memoize = [...h[key]]
      } else {
        memoize = [...h[key]]
      }
      prevParent = parseInt(key)
    }
  })

  memoize.forEach(m => delete m.parent)
  converted.push({
    id: prevParent,
    children: [...memoize]
  })

  return converted
}

export const game = (title, players) => {
  return {
    start: () => {
      if (!title) {
        throw new Error('Invalid game!')
      }
      if (!players || !players.length) {
        throw new Error('Please provide a player list')
      }
      return {
        title,
        players,
        started: new Date()
      }
    }
  }
}

function App () {
  const tree = [
    { id: 1 },
    { id: 2, parent: 1 },
    { id: 3, parent: 2 },
    { id: 4, parent: 3 },
    { id: 5, parent: 2 },
    { id: 6, parent: 1 }
  ]

  console.log(isParent(tree, 1, 2)) // true
  console.log(isParent(tree, 2, 1)) // false
  console.log(isParent(tree, 1, 5)) // true*/
  console.log('-----------')

  console.log(getParent(tree, 2)) // { id: 1 }
  console.log(getParent(tree, 3)) // { id: 2, parent: 1 }
  console.log(getParent(tree, 4)) // { id: 3, parent: 2 }*/
  console.log('-----------')

  console.log(getRoot(tree, 1)) // null
  console.log(getRoot(tree, 3)) // { id: 1 }
  console.log(getRoot(tree, 4)) // { id: 1 }*/
  console.log('-----------')

  const converted = convert(tree)
  console.log(converted)
  console.log('-----------')

  const temp = game('my game', ['a', 'b', 'c'])
  temp.start()

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
