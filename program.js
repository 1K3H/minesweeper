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
    // function findMine(j) {
    //     return mineArr.find((e) => (e === j));
    // }
    return mineArr;
}

// board에 'mine' class로 삽입하기 
function putMineInBoard(mine) {
    for (let i = 0; i < tdArr.length; i++) {
        if (mine.indexOf(i) !== -1) {
            tdArr[i].classList.add('mine');
        }
    }
    // function findMine(j) {
    //     return mine.find((e) => (e === j));
    // }
}

// 타일 클릭 시 실행할 함수 추가
function tileEvent(mine ,targetNum, ...aroundArr) {
    tdArr[targetNum].addEventListener("click", function () {
        let count = 0;
        for (let i = 0; i < aroundArr.length; i++) {
            if (mine.indexOf(aroundArr[i]) !== -1) {
                count++
            }
        }
        // function findMine(j) {
        //     return mine.find((e) => (e === j));
        // }
        if (tdArr[targetNum].className === 'mine') {
            alert('GAME OVER!!!')
        }
        else if (count === 0) {
            tdArr[targetNum].style.backgroundColor = "darkcyan";
            for (let i = 0; i < aroundArr.length; i++) {
                tdArr[aroundArr[i]].click();
            }
        }
        else {
            tdArr[targetNum].innerHTML = count;
        }
    })
}