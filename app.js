const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");

let rates = {};

async function loadRates() {
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=USD");
    const data = await res.json();

    if (!data || !data.rates) {
      throw new Error("Invalid API response");
    }

    rates = data.rates;

    // Populate dropdowns
    const codes = Object.keys(rates).sort();
    from.innerHTML = "";
    to.innerHTML = "";

    codes.forEach(code => {
      from.innerHTML += `<option value="${code}">${code}</option>`;
      to.innerHTML += `<option value="${code}">${code}</option>`;
    });

    from.value = "USD";
    to.value = "EUR";

  } catch (err) {
    console.error("Rate loading error:", err);
    result.textContent = "Unable to load currency rates.";
  }
}


document.getElementById("swap").onclick = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;

  // Recalculate immediately
  if (rates[from.value] && rates[to.value]) {
    const amt = parseFloat(amount.value);
    const converted = (amt / rates[from.value]) * rates[to.value];
    result.textContent = `${amt} ${from.value} = ${converted.toFixed(2)} ${to.value}`;
  }
};


document.getElementById("convert").onclick = () => {
  const amt = parseFloat(amount.value);

  if (!rates[from.value] || !rates[to.value]) {
    result.textContent = "Rates not loaded yet.";
    return;
  }

  const converted = (amt / rates[from.value]) * rates[to.value];
  result.textContent = `${amt} ${from.value} = ${converted.toFixed(2)} ${to.value}`;
};


loadRates();
