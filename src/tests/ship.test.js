import Ship from '../modules/ship';

test('creates ship with correct length', () => {
  const ship = new Ship(3);

  expect(ship.length).toBe(3);
});

test('ship starts with 0 hits', () => {
  const ship = new Ship(3);

  expect(ship.hits).toBe(0);
});

test('hit increases hits count', () => {
  const ship = new Ship(3);

  ship.hit();

  expect(ship.hits).toBe(1);
});

test('ship sinks when hits equal length', () => {
  const ship = new Ship(2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});