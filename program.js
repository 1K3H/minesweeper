const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", setGame);
const tdArr = document.getElementsByTagName('td');

function setGame() {
    const row = parseInt(document.getElementById("row").value);
    const col = parseInt(document.getElementById("col").value);
    const mineNum = parseInt(document.getElementById("mineNum").value);
    const mineArr = setMineNumArr(mineNum, row * col);
    
    makeBoard(row, col);
    
    putMineInBoard(mineArr);
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
    let mineArr = [];
    for (let i = 0; i < numLimit; i++) {
        let randomNum = Math.floor(Math.random() * numRange);
        if (!findMine(randomNum)) {
            mineArr.push(randomNum);
        } else {
            i--;
        }
    }
    function findMine(j) {
        return mineArr.find((e) => (e === j));
    }
    return mineArr;
}

function putMineInBoard(mine) {
    for (let i = 0; i < tdArr.length; i++) {
        if (findMine(i)) {
            tdArr[i].classList.add('mine');
        }
    }
    function findMine(j) {
        return mine.find((e) => (e === j));
    }
}