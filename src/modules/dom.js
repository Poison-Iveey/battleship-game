export function renderBoard(board, container, onAttack = null, clickable = true, gameOver = false, showShips = false) {
  container.innerHTML = '';

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');

    cell.classList.add('cell');

    // CREATE COORDINATES FIRST
    const x = Math.floor(i / 10);
    const y = i % 10;

    
   const hasShip = board.ships.some((item) => {
     return item.coordinates.some((coord) => {
       return (
         coord[0] === x &&
         coord[1] === y
      );
    });
  });

  if(hasShip && showShips){
    cell.classList.add('ship');
  }


    // STORE COORDINATES IN HTML
    cell.dataset.x = x;
    cell.dataset.y = y;

    // CHECK MISSES
    const missed = board.missedAttacks.some(
      (coord) => coord[0] === x && coord[1] === y
    );

    if (missed) {
      cell.classList.add('miss');
    }

    // CHECK HITS
    const hit = board.hitAttacks.some(
      (coord) => coord[0] === x && coord[1] === y
    );

    if (hit) {
      cell.classList.add('hit');
    }

    // CLICK EVENT
    if (!missed && !hit && clickable && !gameOver) {
  cell.addEventListener('click', () => {
  board.receiveAttack([x, y]);

  if (onAttack) {
    onAttack();
  }
});

}

    container.appendChild(cell);
  }
}

