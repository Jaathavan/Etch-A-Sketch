const gridLayout = document.getElementById('grid-container');

let mouseDown = false;

document.body.onmousedown = () => {
    mouseDown = true;
};

document.body.onmouseup = () => {
    mouseDown = false;
};

function createGrid(num) {
    gridLayout.style.setProperty('--grid', num)
    for (let i=0; i < (num**2); i++) {
        let gridBox = document.createElement("div");
        gridLayout.appendChild(gridBox).className = "grid-item";
        gridBox.addEventListener('mouseover', () => {
            if (mouseDown === true) {
                gridBox.style.backgroundColor = "#00a2ff";
            }
        })
        gridBox.addEventListener('mousedown', () => {
            gridBox.style.backgroundColor = "#00a2ff";
        })
    }
}

createGrid(16);

const rangeInputs = document.querySelectorAll('input[type="range"]');
const numberInput = document.querySelector('input[type="number"]');

function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== 'range') {
    target = document.getElementById('range');
  } 
  const min = target.min;
  const max = target.max;
  const val = target.value;
  
  const gridItems = document.querySelectorAll('.grid-item');

  if (gridItems.length > 0) {
    gridItems.forEach (g => {
        g.remove();
    })
  }

  createGrid(val);

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange);
})

numberInput.addEventListener('input', handleInputChange);