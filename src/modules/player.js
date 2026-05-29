import Gameboard from './gameboard.js';

/*export default class Player {
  constructor(type = 'real') {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  randomAttack(enemyBoard) {
  let x;
  let y;

  let validAttack = false;

  while (!validAttack) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);

    if (!enemyBoard.alreadyAttacked([x, y])) {
      validAttack = true;
    }
  }

  enemyBoard.receiveAttack([x, y]);

  return [x, y];
}*/

export default class Player {

    constructor(type = 'human') {

        this.type = type;

        this.gameboard = new Gameboard();

        this.previousMoves = [];

        this.targetQueue = [];

    }

    // EASY AI


    randomAttack(enemyBoard) {

        let row;
        let col;

        do {

            row = Math.floor(Math.random() * 10);

            col = Math.floor(Math.random() * 10);

        } while (
            this.previousMoves.some(
                move =>
                    move.row === row &&
                    move.col === col
            )
        );



        this.previousMoves.push({ row, col });

        enemyBoard.receiveAttack([row, col]);



        return { row, col };

    }



    // MEDIUM AI
    

    mediumAttack(enemyBoard) {

        let move;



        // ATTACK NEARBY CELLS FIRST

        while (this.targetQueue.length > 0) {

            move = this.targetQueue.shift();



            const alreadyPlayed =
                this.previousMoves.some(
                    prev =>
                        prev.row === move.row &&
                        prev.col === move.col
                );



            if (!alreadyPlayed) break;
        }



        // OTHERWISE RANDOM

        if (
            !move ||
            this.previousMoves.some(
                prev =>
                    prev.row === move.row &&
                    prev.col === move.col
            )
        ) {

            do {

                move = {
                    row: Math.floor(Math.random() * 10),
                    col: Math.floor(Math.random() * 10)
                };

            } while (
                this.previousMoves.some(
                    prev =>
                        prev.row === move.row &&
                        prev.col === move.col
                )
            );
        }



        this.previousMoves.push(move);



        const hit = enemyBoard.receiveAttack([
            move.row,
            move.col
        ]);



        // IF HIT, QUEUE NEIGHBOR CELLS

        if (hit) {

            const directions = [
                { row: -1, col: 0 },
                { row: 1, col: 0 },
                { row: 0, col: -1 },
                { row: 0, col: 1 }
            ];



            directions.forEach(dir => {

                const newRow = move.row + dir.row;

                const newCol = move.col + dir.col;



                if (
                    newRow >= 0 &&
                    newRow < 10 &&
                    newCol >= 0 &&
                    newCol < 10
                ) {

                    this.targetQueue.push({
                        row: newRow,
                        col: newCol
                    });

                }

            });

        }



        return move;

    }


    // HARD AI
  

    hardAttack(enemyBoard) {

        let move;



        // PRIORITIZE TARGET QUEUE

        while (this.targetQueue.length > 0) {

            move = this.targetQueue.shift();



            const alreadyPlayed =
                this.previousMoves.some(
                    prev =>
                        prev.row === move.row &&
                        prev.col === move.col
                );



            if (!alreadyPlayed) break;
        }



        // SMART CHECKERBOARD HUNT MODE

        if (
            !move ||
            this.previousMoves.some(
                prev =>
                    prev.row === move.row &&
                    prev.col === move.col
            )
        ) {

            do {

                move = {
                    row: Math.floor(Math.random() * 10),
                    col: Math.floor(Math.random() * 10)
                };

            } while (

                (
                    move.row + move.col
                ) % 2 !== 0 ||

                this.previousMoves.some(
                    prev =>
                        prev.row === move.row &&
                        prev.col === move.col
                )

            );

        }



        this.previousMoves.push(move);



        const hit = enemyBoard.receiveAttack([
            move.row,
            move.col
        ]);



        // IF HIT, HUNT NEIGHBORS

        if (hit) {

            const directions = [
                { row: -1, col: 0 },
                { row: 1, col: 0 },
                { row: 0, col: -1 },
                { row: 0, col: 1 }
            ];



            directions.forEach(dir => {

                const newRow = move.row + dir.row;

                const newCol = move.col + dir.col;



                if (
                    newRow >= 0 &&
                    newRow < 10 &&
                    newCol >= 0 &&
                    newCol < 10
                ) {

                    this.targetQueue.push({
                        row: newRow,
                        col: newCol
                    });

                }

            });

        }



        return move;

    }

}
  

