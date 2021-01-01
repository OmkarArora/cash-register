let inputBill = document.querySelector("#input-billAmount");
let inputCashGiven = document.querySelector("#input-cashGiven");
let btnCalc = document.querySelector("#btn-calculate");
let output = document.querySelector("#output");
let btnDelete = document.querySelector("#btn-delete");

let availableNotes = [2000, 500, 200, 100, 20, 5, 1];
let notes = { 2000: 0, 500: 0, 200: 0, 100: 0, 20: 0, 5: 0, 1: 0 };

// Reset function 
function reset() {
  notes = { 2000: 0, 500: 0, 200: 0, 100: 0, 20: 0, 5: 0, 1: 0 };
  output.innerHTML = "";
  inputBill.value = "";
  inputCashGiven.value = "";
  onBillAmountChange();
}

// Main Logic Function
function calculateNotes() {
  if (inputBill.value.includes("e") || inputCashGiven.value.includes("e")) {
    prompt("Exponential values not allowed!");
    return;
  }
  let bill = parseInt(inputBill.value);
  let cash = parseInt(inputCashGiven.value);
  let returnAmount = cash - bill;
  if (returnAmount < 0) {
    output.innerHTML = `<h1>Customer needs to give more cash</h1>`;
  } else if (returnAmount === 0) {
    output.innerHTML = `<h1>Exact Change given by customer</h1>`;
  } else {
    availableNotes.forEach((note) => {
      while (returnAmount >= note) {
        notes[note] += 1;
        returnAmount -= note;
      }
    });
    output.innerHTML = `<h1>${JSON.stringify(notes)}</h1>`;
    console.log(notes)
  }
}

function onBillAmountChange(){
    if(inputBill.value === ""){
        inputCashGiven.style.display = "none";
        btnDelete.style.display = "none";
    }
    else{
        inputCashGiven.style.display = "unset";
        btnDelete.style.display = "unset";

    }
}
// Event handler
btnCalc.addEventListener("click", () => calculateNotes());
btnDelete.addEventListener("click", () => reset());

