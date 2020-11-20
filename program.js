const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", setGame);

function setGame() {
    const row = parseInt(document.getElementById("row").value);
    const col = parseInt(document.getElementById("col").value);
    const mineNum = parseInt(document.getElementById("mineNum").value);

    makeBoard(row, col);
    setMineNumArr(mineNum, row * col);
}

function makeBoard(rowNum, colNum) {
    let tableEle = '<table>';

    for (let i = 0; i < colNum; i++) {
        tableEle += '<tr>';
        for (let j = 0; j < rowNum; j++) {
            tableEle += '<td></td>'
        }
        tableEle += '</tr>';
    }
    tableEle += '</table>';
    document.getElementById("gameBoard").innerHTML = tableEle;
}

function setMineNumArr(numLimit, numRange) {
    mines = [];
    for (let i = 0; i < numLimit; i++) {
        let randomNum = Math.floor(Math.random() * numRange);
        if (!findMine(randomNum)) {
            mines.push(randomNum);
        } else {
            i--;
        }
    }
    function findMine(j) {
        return mines.find((e) => (e === j));
    }
}   