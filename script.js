const gridLayout = document.getElementById('grid-container');

function createGrid(num) {
    gridLayout.style.setProperty('--grid', num)
    for (let i=0; i < (num**2); i++) {
        let gridBox = document.createElement("div");
        gridBox.textContent = (i+1);
        gridLayout.appendChild(gridBox).className = "grid-item";
        console.log("Work");
    }
}

createGrid(22);