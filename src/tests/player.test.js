import Player from '../modules/player';

test('player has gameboard', () => {
  const player = new Player();

  expect(player.gameboard).toBeDefined();
});

test('computer makes legal attack', () => {
  const human = new Player();
  const computer = new Player('computer');

  const attack = computer.randomAttack(human.gameboard);

  expect(attack.length).toBe(2);
});

