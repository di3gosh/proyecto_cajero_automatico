var cuentas = [
    { nombre: "Mali", saldo: 200, password: "1234" },
    { nombre: "Gera", saldo: 290, password: "5678" },
    { nombre: "Maui", saldo: 67, password: "91011" }
];

var currentAccount = null;

function login() {
    var accountIndex = document.getElementById('account').value;
    var password = document.getElementById('password').value;

    if (cuentas[accountIndex].password === password) {
        currentAccount = cuentas[accountIndex];
        document.getElementById('accountName').innerText = currentAccount.nombre;
        document.getElementById('accountSelection').style.display = 'none';
        document.getElementById('accountActions').style.display = 'block';
    } else {
        showMessage('Contraseña incorrecta. Intente nuevamente.');
    }
}

function checkBalance() {
    showMessage('');
    document.getElementById('balance').style.display = 'block';
    document.getElementById('balance').innerText = `Saldo actual: ${currentAccount.saldo} USD`;
}

function showDeposit() {
    document.getElementById('transaction').style.display = 'block';
    document.getElementById('transaction').setAttribute('data-action', 'deposit');
}

function showWithdraw() {
    document.getElementById('transaction').style.display = 'block';
    document.getElementById('transaction').setAttribute('data-action', 'withdraw');
}

function deposit() {
    var amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        showMessage('Ingrese un monto válido para depositar.');
        return;
    }

    var newBalance = currentAccount.saldo + amount;
    if (newBalance > 990) {
        showMessage('El saldo no puede exceder $990.');
        return;
    }

    currentAccount.saldo = newBalance;
    updateBalance();
    showMessage(`Has depositado ${amount} USD. Nuevo saldo: ${currentAccount.saldo} USD.`);
}

function withdraw() {
    var amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        showMessage('Ingrese un monto válido para retirar.');
        return;
    }

    var newBalance = currentAccount.saldo - amount;
    if (newBalance < 10) {
        showMessage('El saldo no puede ser menor a $10.');
        return;
    }

    currentAccount.saldo = newBalance;
    updateBalance();
    showMessage(`Has retirado ${amount} USD. Nuevo saldo: ${currentAccount.saldo} USD.`);
}

function updateBalance() {
    document.getElementById('balance').innerText = `Saldo actual: ${currentAccount.saldo} USD`;
}

function showMessage(message) {
    document.getElementById('message').innerText = message;
    if (message) {
        document.getElementById('balance').style.display = 'none';
    }
}
