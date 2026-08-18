const amount = document.getElementById("amount");
const from = document.getElementById("from");
const to = document.getElementById("to");
const result = document.getElementById("result");

let rates = {};

async function loadRates() {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=USD");
    const data = await res.json();

    if (!data || !data.rates) {
      throw new Error("Invalid API response");
    }

    rates = data.rates;
    const codes = Object.keys(rates).concat(data.base).sort();

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

document.getElementById("convert").onclick = () => {
  const amt = parseFloat(amount.value);

  if (!rates[to.value]) {
    result.textContent = "Rates not loaded yet.";
    return;
  }

  if (from.value === "USD") {
    const converted = amt * rates[to.value];
    result.textContent = `${amt} ${from.value} = ${converted.toFixed(2)} ${to.value}`;
  } else {
    // Convert via USD as base
    const amtInUSD = amt / rates[from.value];
    const converted = amtInUSD * rates[to.value];
    result.textContent = `${amt} ${from.value} = ${converted.toFixed(2)} ${to.value}`;
  }
};

document.getElementById("swap").onclick = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
};

loadRates();
