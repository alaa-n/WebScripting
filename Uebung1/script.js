function add(aa, bb) {
    return parseFloat(aa.value) + parseFloat(bb.value);
}

function subtract(aa, bb) {
    return parseFloat(aa.value) - parseFloat(bb.value);
}

function multiply(aa, bb) {
    return parseFloat(aa.value) * parseFloat(bb.value);
}

function divide(aa, bb) {
    return parseFloat(aa.value) / parseFloat(bb.value);
}


function changeResult(operation) {
    const num1 = document.getElementById('zahl1');
    const num2 = document.getElementById('zahl2');
    let result;

    switch (operation) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            result = 'Invalid operation';
            break;
    }

    document.getElementById('result').innerHTML = result;
}

function updateHistory(operation, result) {
    const verlauf = document.getElementById('verlauf');
    const num1 = document.getElementById('zahl1').value;
    const num2 = document.getElementById('zahl2').value;

    verlauf.innerHTML += `${num1} ${operation} ${num2} = ${result} <br>`;
}

function clearHistory() {
    document.getElementById("verlauf").innerHTML = "";
}
