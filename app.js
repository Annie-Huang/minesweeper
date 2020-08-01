document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10;
  let bombAmount = 20;
  let squares = [];

  // create Board
  function createBoard() {
    // get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb');
    const emptyArray = Array(width*width - bombAmount).fill('valid');
    // console.log('bombArray=', bombsArray);
    // console.log('emptyArray=', emptyArray);
    const gameArray = emptyArray.concat(bombsArray);

    // How are you shuffled the values within the array.
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
    // console.log(shuffledArray);

    for(let i=0; i<width*width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i);
      square.classList.add(shuffledArray[i])
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();
});
