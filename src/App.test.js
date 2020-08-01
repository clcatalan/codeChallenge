import { game } from './App'

test('Expect game to return correct return values according to passed arguments', () => {
  const NoArgsGame = game()
  expect(NoArgsGame).toBeDefined()
  expect(NoArgsGame.start).toThrow('Invalid game!')

  const FirstArgGame = game('title')
  expect(FirstArgGame).toBeDefined()
  expect(FirstArgGame.start).toThrow('Please provide a player list')

  const FirstArgSecondArgGame = game('title', [])
  expect(FirstArgSecondArgGame).toBeDefined()
  expect(FirstArgSecondArgGame.start).toThrow('Please provide a player list')

  const gameTitle = 'myTitle'
  const players = ['p1', 'p2', 'p3']

  const CorrectArgsGame = game(gameTitle, players)
  const values = CorrectArgsGame.start()

  expect(values.title).toBe(gameTitle)
  expect(values.players).toBe(players)
})
