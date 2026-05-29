import Gameboard from '../modules/gameboard';

test('creates empty gameboard', () => {
  const board = new Gameboard();

  expect(board.missedAttacks).toEqual([]);
});

test('places ship on board', () => {
  const board = new Gameboard();

  board.placeShip(2, [0, 0]);

  expect(board.ships.length).toBe(1);
});

test('attack hits ship', () => {
  const board = new Gameboard();

  board.placeShip(2, [0, 0]);

  board.receiveAttack([0, 0]);

  expect(board.ships[0].ship.hits).toBe(1);
});

test('records missed attacks', () => {
  const board = new Gameboard();

  board.receiveAttack([5, 5]);

  expect(board.missedAttacks).toContainEqual([5, 5]);
});

test('reports all ships sunk', () => {
  const board = new Gameboard();

  board.placeShip(1, [0, 0]);

  board.receiveAttack([0, 0]);

  expect(board.allShipsSunk()).toBe(true);
});

test('places ship across multiple coordinates', () => {
  const board = new Gameboard();

  board.placeShip(3, [0, 0]);

  expect(board.ships[0].coordinates).toEqual([
    [0,0],
    [0,1],
    [0,2],
  ]);
});


test('cannot attack same coordinate twice', () => {
  const board = new Gameboard();

  board.receiveAttack([1,1]);
  board.receiveAttack([1,1]);

  expect(board.missedAttacks.length).toBe(1);
});


test('places ship horizontally', () => {
  const board = new Gameboard();

  board.placeShip(3, [0,0], 'horizontal');

  expect(board.ships[0].coordinates).toEqual([
    [0,0],
    [0,1],
    [0,2],
  ]);
});


test('places ship vertically', () => {
  const board = new Gameboard();

  board.placeShip(3, [0,0], 'vertical');

  expect(board.ships[0].coordinates).toEqual([
    [0,0],
    [1,0],
    [2,0],
  ]);
});

test('detects overlapping ships', () => {
  const board = new Gameboard();

  board.placeShip(3, [0,0], 'horizontal');

  const result = board.placeShip(3, [0,2], 'vertical');

  expect(result).toBe(false);
});

test('allows non-overlapping ships', () => {
  const board = new Gameboard();

  board.placeShip(3, [0,0], 'horizontal');

  const result = board.placeShip(3, [3,3], 'vertical');

  expect(result).toBe(true);
});

test('prevents horizontal ships going off board', () => {
  const board = new Gameboard();

  const result = board.placeShip(
    4,
    [0,8],
    'horizontal'
  );

  expect(result).toBe(false);
});

test('prevents vertical ships going off board', () => {
  const board = new Gameboard();

  const result = board.placeShip(
    4,
    [8,0],
    'vertical'
  );

  expect(result).toBe(false);
});

test('allows ships within board boundaries', () => {
  const board = new Gameboard();

  const result = board.placeShip(
    4,
    [0,5],
    'horizontal'
  );

  expect(result).toBe(true);
});

test('randomizeShips places all ships', () => {
  const board = new Gameboard();

  board.randomizeShips([5,4,3,2]);

  expect(board.ships.length).toBe(4);
});




