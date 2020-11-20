const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", setGame);

function setGame() {
    const row = parseInt(document.getElementById("row").value);
    const col = parseInt(document.getElementById("col").value);
    
    makeBoard(row, col);
    
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
}