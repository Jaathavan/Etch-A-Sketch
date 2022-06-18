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
                gridBox.style.backgroundColor = 'black';
            }
        })
        gridBox.addEventListener('mousedown', () => {
            gridBox.style.backgroundColor = 'black';
        })
    }
}

createGrid(100)
let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
let gridsActive = document.querySelectorAll(".grid-item")
output.textContent = slider.value; 

slider.oninput = function() {
  output.textContent = this.value;
}
