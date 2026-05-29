import Ship from './ship.js';

export default class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.hitAttacks=[];
  }

placeShip(length, startCoord, direction = 'horizontal') {
  const ship = new Ship(length);

  const coordinates = [];

  const [x, y] = startCoord;

  for (let i = 0; i < length; i++) {
    if (direction === 'horizontal') {
      coordinates.push([x, y + i]);
    } else {
      coordinates.push([x + i, y]);
    }
  }

   if (this.isOutOfBounds(coordinates)) {
    return false;
   }

  if (this.isOverlapping(coordinates)){
    return false;
  }

  this.ships.push({
    ship,
    coordinates,
  });

  return true;
}

receiveAttack(coord) {
    if(this.alreadyAttacked(coord)){
        return;
    }

  let hit = false;

  this.ships.forEach((item) => {
    item.coordinates.forEach((position) => {
      if (
        position[0] === coord[0] &&
        position[1] === coord[1]
      ) {
        item.ship.hit();

        this.hitAttacks.push(coord);

        hit = true;
       
        document.dispatchEvent(
          new CustomEvent("shipHit")
       );

       if (item.ship.isSunk()) {

          document.dispatchEvent(
             new CustomEvent("shipSunk")
         );
        }
        
      }
    });
  });

  if (!hit) {
    this.missedAttacks.push(coord);
  }
  return hit;
}


 allShipsSunk() {
  return this.ships.every((item) => item.ship.isSunk());
 };


alreadyAttacked(coord) {
  const missed = this.missedAttacks.some(
    (attack) =>
      attack[0] === coord[0] &&
      attack[1] === coord[1]
  );

  const hit = this.hitAttacks.some(
    (attack) =>
      attack[0] === coord[0] &&
      attack[1] === coord[1]
  );

  return missed || hit;
}

isOverlapping(newCoordinates) {
  return this.ships.some((item) => {
    return item.coordinates.some((existingCoord) => {
      return newCoordinates.some((newCoord) => {
        return (
          existingCoord[0] === newCoord[0] &&
          existingCoord[1] === newCoord[1]
        );
      });
    });
  });
}

isOutOfBounds(coordinates) {
  return coordinates.some((coord) => {
    const [x, y] = coord;

    return (
      x < 0 ||
      x > 9 ||
      y < 0 ||
      y > 9
    );
  });
  return true;
}

randomizeShips(shipLengths) {
  shipLengths.forEach((length) => {
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);

      const y = Math.floor(Math.random() * 10);

      const direction =
        Math.random() < 0.5
          ? 'horizontal'
          : 'vertical';

      placed = this.placeShip(
        length,
        [x, y],
        direction
      );
    }
  });
}


}

