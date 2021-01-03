let inputBill = document.querySelector("#input-billAmount");
let inputCashGiven = document.querySelector("#input-cashGiven");
let btnCalc = document.querySelector("#btn-calculate");
let output = document.querySelector("#output");
let btnDelete = document.querySelector("#btn-delete");

let availableNotes = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
let notes = {
  2000: 0,
  500: 0,
  200: 0,
  100: 0,
  50: 0,
  20: 0,
  10: 0,
  5: 0,
  1: 0,
};

// Reset function
function reset() {
  resetNotes();
  output.innerHTML = "";
  inputBill.value = "";
  inputCashGiven.value = "";
  onBillAmountChange();
}

function resetNotes() {
  notes = { 2000: 0, 500: 0, 200: 0, 100: 0, 50: 0, 10: 0, 20: 0, 5: 0, 1: 0 };
  if (inputCashGiven.value === "") {
    btnCalc.style.display = "none";
  } else {
    btnCalc.style.display = "unset";
  }
}

// Main Logic Function
function calculateNotes() {
  if (inputBill.value.includes("e") || inputCashGiven.value.includes("e")) {
    alert("Exponential values not allowed!");
    return;
  }
  let bill = parseInt(inputBill.value);
  let cash = parseInt(inputCashGiven.value);
  let returnAmount = cash - bill;
  if (returnAmount < 0) {
    output.innerHTML = `<p class="output-text danger">Collect more &#164;${-(returnAmount)} from customer</p>`;
  } else if (returnAmount === 0) {
    output.innerHTML = `<p class="output-text success">Exact Change</p>`;
  } else {
    availableNotes.forEach((note) => {
      while (returnAmount >= note) {
        notes[note] += 1;
        returnAmount -= note;
      }
    });

    // Generate the output in a tabular format
    let outputString = "<div>Summary - </div>";
    let tempString = "";
    Object.keys(notes).forEach((note) => {
      if (notes[note] !== 0) {
        tempString += `<tr><td><img src="./images/money.svg" alt="money" class="icon"/> ${note} :</td><td>${notes[note]} notes</td></tr>`;
      }
    });
    outputString = outputString + "<table>" + tempString + "</table>";
    output.innerHTML = outputString;
  }
}

function onBillAmountChange() {
  resetNotes();
  if (inputBill.value === "") {
    inputCashGiven.style.display = "none";
    // btnDelete.style.display = "none";
  } else {
    inputCashGiven.style.display = "unset";
    // btnDelete.style.display = "unset";
  }
}
// Event handler
btnCalc.addEventListener("click", () => calculateNotes());
btnDelete.addEventListener("click", () => reset());
