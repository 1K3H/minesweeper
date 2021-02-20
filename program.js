const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", setGame);
const tdArr = document.getElementsByTagName('td');

let row;
let col;
function setGame() {
    row = parseInt(document.getElementById("row").value);
    col = parseInt(document.getElementById("col").value);
    const mineNum = parseInt(document.getElementById("mineNum").value);
    const mineArr = setMineNumArr(mineNum, row * col);

    makeBoard(row, col);
    putMineInBoard(mineArr);

    // 타일에 이벤트 넣기

    // 코너 타일 이벤트
    // 좌상
    tileEvent(mineArr, 0, 1, row, row + 1);
    // 우상
    tileEvent(mineArr, row - 1, row - 2, 2 * row - 2, 2 * row - 1);
    // 좌하
    tileEvent(mineArr, row * (col - 1), row * (col - 2), row * (col - 2) + 1, row * (col - 1) + 1);
    // 우하
    tileEvent(mineArr, row * col - 1, row * (col - 1) - 2, row * (col - 1) - 1, row * col - 2);

    // 모서리 타일
    // 상
    for (let i = 1; i <= row - 2; i++) {
        tileEvent(mineArr, i, i - 1, i + 1, i + row - 1, i + row, i + row + 1);
    }
    // 하
    for (let i = row * (col - 1) + 1; i <= row * col - 2; i++) {
        tileEvent(mineArr, i, i - row - 1, i - row, i - row + 1, i - 1, i + 1);
    }
    // 좌
    for (let i = row; i <= row * (col - 2); i += row) {
        tileEvent(mineArr, i, i - row, i - row + 1, i + 1, i + row, i + row + 1);
    }
    // 우
    for (let i = 2 * row - 1; i <= row * (col - 1) - 1; i += row) {
        tileEvent(mineArr, i, i - row - 1, i - row, i - 1, i + row - 1, i + row);
    }

    // 나머지 모든 타일
    for (let i = 1; i <= col - 2; i++) {
        for (let j = i * row + 1; j <= (1 + i) * row - 2; j++) {
            tileEvent(mineArr, j, j - row - 1, j - row, j - row + 1, j - 1, j + 1, j + row - 1, j + row, j + row + 1);
        }
    }
}

// board 만들기
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
    document.getElementById("gameBoard").style.backgroundColor = "#C6EBE7"
}

// 지뢰 위치 번호 뽑기
function setMineNumArr(numLimit, numRange) {
    let mineArr = [];
    for (let i = 0; i < numLimit; i++) {
        let randomNum = Math.floor(Math.random() * numRange);
        if (mineArr.indexOf(randomNum) === -1) {
            mineArr.push(randomNum);
        } else {
            i--;
        }
    }
    return mineArr;
}

// board에 'mine' class로 삽입하기 
function putMineInBoard(mine) {
    for (let i = 0; i < tdArr.length; i++) {
        if (mine.indexOf(i) !== -1) {
            tdArr[i].classList.add('mine');
        }
    }
}

function clickTile(targetNum) {
    let aroundArr = [];
    let x = Math.floor(targetNum / row);
    let y = targetNum % col;
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            let idx = i * row + j;
            if (idx < 0 || idx >= row * col) continue;
            aroundArr.push(idx);
        }
    }
    if (tdArr[targetNum].className !== 'flag' && tdArr[targetNum].className !== 'qmark' && tdArr[targetNum].className !== 'mine flag' && tdArr[targetNum].className !== 'mine qmark') {
        let count = 0;
        for (let i = 0; i < aroundArr.length; i++) {
            if (tdArr[aroundArr[i]].classList.contains("mine"))
                count++
        }
        if (tdArr[targetNum].className === 'mine') {
            alert('GAME OVER!!!')
        }
        else if (count === 0) {
            tdArr[targetNum].style.backgroundColor = "darkcyan";
            for (let i = 0; i < aroundArr.length; i++) {
                //click 함수가 무한정 호출되는 것을 방지하기 위해 isOpen이라는 변수를 추가함
                //열린 타일이면 더 이상 click하지 않음
                if (tdArr[aroundArr[i]].dataset.isOpen != "true") {
                    tdArr[aroundArr[i]].dataset.isOpen = "true";
                    //click()으로 call을 하면 maximun call stack size를 초과하는 오류가 발생하므로
                    //clickTile이라는 함수를 만들어 처리함
                    clickTile(aroundArr[i]);
                }
            }
        }
        else if (count > 0) {
            tdArr[targetNum].innerHTML = count;
        }
    }
}

// 타일 클릭 시 실행할 함수 추가
function tileEvent(mine, targetNum, ...aroundArr) {
    tdArr[targetNum].addEventListener("click", function () {
        clickTile(targetNum);
    })

    tdArr[targetNum].addEventListener("auxclick", function () {
        tdArr[targetNum].addEventListener("contextmenu", function (e) {
            e.preventDefault();
        })
        if (tdArr[targetNum].className === 'flag' || tdArr[targetNum].className === 'mine flag') {
            tdArr[targetNum].classList.remove('flag');
            tdArr[targetNum].classList.add('qmark');
            tdArr[targetNum].innerHTML = '❓'
        }
        else if (tdArr[targetNum].className === 'qmark' || tdArr[targetNum].className === 'mine qmark') {
            tdArr[targetNum].classList.remove('qmark');
            tdArr[targetNum].innerHTML = '';
        }
        else {
            tdArr[targetNum].classList.add('flag');
            tdArr[targetNum].innerHTML = '🚩';
        }
    })
}