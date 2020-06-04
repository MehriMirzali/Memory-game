

let M = [];
let A = [];
let MemoryImg = [];
let Memory = [0, 0, 0];
let K = [];
var fiveMinutes = 60 * .5;

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60,10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("minute").innerHTML = minutes
        document.getElementById("second").innerHTML = seconds

        if (--timer < 0 ) {
            timer = duration;
            alert("Bir daha cəhd edin💪🏽")
            Arr();
            Table();
            setTimeout(Close, 1500);
        }
    }, 1000);
}


onload = function () {
    Arr();
    Table();
    setTimeout(Close, 1500);
    startTimer(fiveMinutes);
};



function Arr() {
    let k = 1;
    for (let i = 0; i < 16; i++) {
        k = k > 8 ? 1 : k;
        M[i] = k++;
    }
    let x = 0;

    for (let i = 0; i < 4; i++) {
        A[i] = [];
        MemoryImg[i] = [];
        K[i] = [];
        for (let j = 0; j < 4; j++) {
            x = Math.floor(Math.random() * M.length);
            A[i][j] = M[x];
            MemoryImg[i][j] = M[x];
            M.splice(x, 1);
        }
    }
}

function Table() {
    let tbl = "";
    for (let i = 0; i < 4; i++) {
        tbl += "<tr>";
        for (let j = 0; j < 4; j++) {
            tbl += `<td><img id="A${i}_${j}" onclick="Click(${i},${j})" src="photos/${A[i][j]}.png" /> </td>`;
        }
        tbl += "</tr>";
    }
    document.getElementsByTagName("table")[0].innerHTML = tbl;
}

function Close() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            A[i][j] = 0;
        }
    }
    Table();
}

function Click(i, j) {

    A[i][j] = MemoryImg[i][j];
    Table();
    //birinci click
    if (Memory[2] == 0) {
        Memory[0] = i;
        Memory[1] = j;
        Memory[2] = MemoryImg[i][j];
    }
    //ikinci click
    else {
        if (Memory[2] != MemoryImg[i][j] || (Memory[0] == i && Memory[1] == j)) {
            A[i][j] = 0;
            A[Memory[0]][Memory[1]] = 0;
            setTimeout(Table, 500);
        } else {
            K[i][j] = 1;
            K[Memory[0]][Memory[1]] = 1;
        }
        Memory[2] = 0;
    }
    Check();
}

function Check() {
    let count = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (K[i][j] == 1) {
                document.getElementById(`A${i}_${j}`).removeAttribute("onclick");
                count++;
            }
        }
        if (count == 16 ) {
             alert("Təbriklər✨");
             Arr();
             Table();
             setTimeout(Close, 1500);
        }
    }
}











