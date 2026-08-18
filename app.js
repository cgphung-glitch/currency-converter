const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");

let rates = {};

async function loadRates() {
  const res = await fetch("https://api.exchangerate.host/latest?base=USD");
  const data = await res.json();
  rates = data.rates;

  Object.keys(rates).forEach(code => {
    from.innerHTML += `<option value="${code}">${code}</option>`;
    to.innerHTML += `<option value="${code}">${code}</option>`;
  });

  from.value = "USD";
  to.value = "EUR";
}

document.getElementById("swap").onclick = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
};

document.getElementById("convert").onclick = () => {
  const amt = parseFloat(amount.value);
  const converted = (amt / rates[from.value]) * rates[to.value];
  result.textContent = `${amt} ${from.value} = ${converted.toFixed(2)} ${to.value}`;
};

loadRates();
