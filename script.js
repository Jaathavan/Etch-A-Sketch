const gridLayout = document.getElementById('grid-container');

function createGrid(num) {
    gridLayout.style.setProperty('--grid', num)
    for (let i=0; i < (num**2); i++) {
        let gridBox = document.createElement("div");
        gridLayout.appendChild(gridBox).className = "grid-item";
    }
}

createGrid(22);