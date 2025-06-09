const unitType = document.getElementById("unit-type");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const inputValue = document.getElementById("input-value");
const resultValue = document.getElementById("result-value");

unitType.addEventListener("change", loadUnits);
inputValue.addEventListener("input", convert);
fromUnit.addEventListener("change", convert);
toUnit.addEventListener("change", convert);

function loadUnits() {
  const type = unitType.value;
  const options = Object.keys(units[type]);
  fromUnit.innerHTML = toUnit.innerHTML = options.map(u => `<option value="${u}">${u}</option>`).join('');
  convert();
}

function convert() {
  const type = unitType.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  let value = parseFloat(inputValue.value);

  if (type === "temperature") {
    resultValue.textContent = convertTemperature(value, from, to).toFixed(2);
    return;
  }

  const inBase = value * units[type][from];
  const result = inBase / units[type][to];
  resultValue.textContent = result.toFixed(4);
}

function convertTemperature(value, from, to) {
  if (from === to) return value;
  if (from === "celsius" && to === "fahrenheit") return value * 9/5 + 32;
  if (from === "fahrenheit" && to === "celsius") return (value - 32) * 5/9;
  if (from === "celsius" && to === "kelvin") return value + 273.15;
  if (from === "kelvin" && to === "celsius") return value - 273.15;
  if (from === "fahrenheit" && to === "kelvin") return (value - 32) * 5/9 + 273.15;
  if (from === "kelvin" && to === "fahrenheit") return (value - 273.15) * 9/5 + 32;
}

loadUnits();
