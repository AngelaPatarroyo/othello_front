import Swal from 'sweetalert2';
import { Tile } from './Tile';

const TileChecker = ({ x, y, endGame, matriz, setMatriz,
    setTurn, turn, allowDiagonal, black, white, boardSize, setEndGame, empty }) => {

    const checkTile = () => {
        /* If the game is over, prevent further moves */
        if (endGame) {
            Swal.fire({
                icon: 'info',
                title: 'Game Over',
                text: 'The game has already ended!',
            });
            return false; // Prevent further moves
        }

        const value = turn ? black : white;
        const oppositeColor = turn ? white : black;
        /* Create a copy of the matrix to update it during the game */
        const newMatriz = [...matriz];

        /* If the tile is empty, check if a move can be made */
        if (newMatriz[x][y] === empty) {
            let shouldFlip = false;

            /* Check all adjacent positions (-1, 0, 1) in rows and columns */
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    /* If i and j are 0, continue with the rest of the verifications without checking that tile */
                    if (i === 0 && j === 0) {
                        continue;
                    }

                    /* Check if diagonal, horizontal or vertical moves are allowed  */
                    if (allowDiagonal || i === 0 || j === 0) {
                        /* If the neighboring tile contains a token of the opposite color */
                        if (matriz[x + i]?.[y + j] === oppositeColor) {
                            let row = x + i;
                            let col = y + j;
                            /* Continue checking in that direction while there are tokens of the opposite color */
                            while (matriz[row]?.[col] === oppositeColor) {
                                row += i;
                                col += j;
                            }
                            /* If it finds a token of the same color at the end of the direction, it can flip the tokens in that direction */
                            if (matriz[row]?.[col] === value) {
                                for (
                                    let k = i, l = j;
                                    matriz[x + k]?.[y + l] === oppositeColor;
                                    k += i, l += j
                                ) {
                                    newMatriz[x + k][y + l] = value;
                                    /* Mark that the tokens should be flipped  */
                                }
                                shouldFlip = true;
                            }
                        }
                    }
                }
            }

            /* If tokens should be flipped, update the matrix and change the turn */
            if (shouldFlip) {
                newMatriz[x][y] = value;
                setMatriz(newMatriz);
                setTurn(!turn); // Change turn only if the move was valid
                return true; /* Indicate that the move was valid */

            /* If tokens cannot be flipped in any direction, show an alert and return false */
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure?',
                    text: 'This move is not allowed!',
                });
                return false; /* Indicate that the move was not allowed */
            }
        }
        return false; /* If the tile is not empty, return false to disallow the player from placing a token on 
        the board in that position */
    };

    return (
        <Tile value={matriz[x][y]}
            onClick={checkTile}
            white={white}
            boardSize={boardSize} />
    );
};

export { TileChecker };
