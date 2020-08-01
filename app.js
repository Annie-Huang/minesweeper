document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let width = 10;
  let bombAmount = 20;
  let squares = [];
  let isGameOver = false;

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
      // square.textContent = i.toString();
      square.classList.add(shuffledArray[i])
      grid.appendChild(square);

      squares.push(square);

      // normal click
      square.addEventListener('click', (e) => {
        click(square);
      })
    }

    // add numbers
    for(let i=0; i<squares.length; i++) {
      let total = 0;

      // You will need to turn on square.textContent = i.toString(); in line 23 to be able to tell
      const isLeftEdge = (i % width === 0);
      const isRightEdge = (i % width === width - 1);

      if (squares[i].classList.contains('valid')) {

        /* Check neigbours means check 8 sides. This is sounds like Game of Life
           https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
           https://en.wikipedia.org/wiki/Moore_neighborhood

            left-top     top     right-top
            left         E       right
            left-bottom  bottom  right-bottom

            Order to go though below:
            -1      -2           -3     -4          +1       +2             +3        +4
            left -> right-top -> top -> left-top -> right -> left-bottom -> bottom -> bottom-right
        */

        // LEFT side is the bomb (ignore if it is the first column)
        // avoid checking index=0
        if (i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb'))
          total++;

        // RIGHT TOP side is the bomb (ignore if it is the right column)
        // if (i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb'))
        if (i>width-1 && !isRightEdge && squares[i+1-width].classList.contains('bomb'))
          total++;

        // TOP side is the bomb
        // if (i>10 && squares[i-width].classList.contains('bomb'))
        if (i>width && squares[i-width].classList.contains('bomb'))
          total++;

        // LEFT TOP is the bomb (ignore if it is the first column)
        // if (i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb'))
        if (i>width+1 && !isLeftEdge && squares[i-1-width].classList.contains('bomb'))
          total++;

        // RIGHT side is the bomb (ignore if it is the right column)
        // if (i<98 && !isRightEdge && squares[i+1].classList.contains('bomb'))
        if (i<squares.length-2 && !isRightEdge && squares[i+1].classList.contains('bomb'))
          total++;

        // LEFT BOTTOM is the bomb (ignore if it is the first column)
        // if (i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb'))
        if (i<squares.length-width && !isLeftEdge && squares[i-1+width].classList.contains('bomb'))
          total++;

        // BOTTOM side is the bomb
        // if (i<89 && squares[i+width].classList.contains('bomb'))
        // I believe this is a bug, it need to compare that it's not the last row instead (i<90), otherwise if there is a bomb in the last item, it will not be detected.
        if (i<squares.length-width && squares[i+width].classList.contains('bomb'))
          total++;

        // RIGHT BOTTOM side is the bomb (ignore if it is the right column)
        // if (i<88 && !isRightEdge && squares[i+1+width].classList.contains('bomb'))
        if (i<squares.length-width-2 && !isRightEdge && squares[i+1+width].classList.contains('bomb'))
          total++;

        squares[i].setAttribute('data', total);
        // console.log(squares[i]);
      }
    }

  }

  createBoard();

  // click on square actions
  function click(square) {
    if (isGameOver) return;
    if (square.classList.contains('checked') || square.classList.contains('flag')) return

    if (square.classList.contains('bomb')) {
      isGameOver = true;
      console.log('Game over');

    } else {
      let total = square.getAttribute('data');

      // if you put total !== 0, then the 0 will show up if the total is equals to 0.
      if (total != 0) {
        square.classList.add('checked');
        square.innerHTML = total;
        return;
      }

    }

    square.classList.add('checked');
  }
});
