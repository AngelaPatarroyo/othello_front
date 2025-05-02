

const hasPossibleMoves = (matriz, turn, allowDiagonal, white, black) => {
  const value = turn ? black : white;
  const oppositeColor = turn ? white : black;
/*  this logic checks the allowed moves pretty similar to the ones in the TileChecker but to the current
matriz and no the newMatriz that changes in each move because this is meant to check the moves and not chang
anything*/

  for (let x = 0; x < matriz.length; x++) {
    for (let y = 0; y < matriz[x].length; y++) {
      if (matriz[x][y] === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
              continue;
            }
            if (allowDiagonal || i === 0 || j === 0) {
              if (matriz[x + i]?.[y + j] === oppositeColor) {
                let row = x + i;
                let col = y + j;
                while (matriz[row]?.[col] === oppositeColor) {
                  row += i;
                  col += j;
                }
                if (matriz[row]?.[col] === value) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }
  return false;
};

export { hasPossibleMoves }