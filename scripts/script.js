const totalSeats = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "C4",
  "D1",
  "D2",
  "D3",
  "D4",
  "E1",
  "E2",
  "E3",
  "E4",
  "F1",
  "F2",
  "F3",
  "F4",
  "G1",
  "G2",
  "G3",
  "G4",
  "H1",
  "H2",
  "H3",
  "H4",
  "I1",
  "I2",
  "I3",
  "I4",
  "J1",
  "J2",
  "J3",
  "J4",
];
const MX_PERMITTED_SEAT = 4;
const COUPON_15 = { name: "NEW15", discount: 15 };
const COUPON_20 = { name: "Couple 20", discount: 20 };
let availableSeats = totalSeats;
let totalCost = 0;
let discountedCost = 0;
let grandTotalCost = 0;
let maxSeat = 0;
let selectedSeats = [];
let phoneNum = 0;

function getInnerText(id) {
  return document.getElementById(id).innerText;
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

function getInputValue(id) {
  return document.getElementById(id).value;
}

function removeInputValue(id, inputValue) {
  document.getElementById(id).value = inputValue;
}
function addClass(id, className) {
  document.getElementById(id).classList.add(className);
}

function removeClass(id, className) {
  document.getElementById(id).classList.remove(className);
}
function makeEnable(id) {
  document.getElementById(id).removeAttribute("disabled");
}

function makeDisable(id) {
  document.getElementById(id).setAttribute("disabled", true);
}

function addBgColor(id) {
  addClass(id, "bg-primary-bg");
  addClass(id, "text-white");
}

function removeBgColor(id) {
  removeClass(id, "bg-primary-bg");
  removeClass(id, "text-white");
}
// Handle discount show part
function shwoDiscount() {
  setInnerText("grandTotal", grandTotalCost);
  removeClass("discountPart", "hidden");
  addClass("couponPart", "hidden");
  removeInputValue("inputCoupon", "");
  setInnerText("discountPrice", discountedCost);
}
// Handle Ticket part
function setInnerHtml() {
  let newHtml = "";
  for (let seat of selectedSeats) {
    newHtml += `<div class="flex justify-between font-light text-lg py-3">
    <div class="flex items-center gap-1">
      <h4 id="selectedSeatName">${seat}</h4>
    </div>
    <h4 id="seatClass" class="">Economy</h4>
    <h4 id="perSeatPrice" class="">550</h4>
  </div>`;
  }
  document.getElementById("seatUpdate").innerHTML = newHtml;
}
// Handle click on seat
document.addEventListener("click", (event) => {
  const Id = event.target.id;
  if (totalSeats.includes(Id)) {
    if (availableSeats.includes(Id)) {
      if (maxSeat < MX_PERMITTED_SEAT) {
        availableSeats = availableSeats.filter((item) => Id !== item);
        maxSeat++;
        grandTotalCost = totalCost += 550;
        addBgColor(Id);
        selectedSeats.push(Id);
      } else {
        alert("You can buy maximum 4 seats...!");
      }
    } else {
      availableSeats.push(Id);
      maxSeat--;
      grandTotalCost = totalCost -= 550;
      setInnerText("selectedSeatCount", maxSeat);
      removeBgColor(Id);
      selectedSeats.splice(selectedSeats.indexOf(Id), 1);
    }
    setInnerText("numberOfSeats", availableSeats.length);
    setInnerText("selectedSeatCount", maxSeat);
    setInnerText("totalPrice", totalCost);
    setInnerText("grandTotal", grandTotalCost);
    setInnerHtml();
    eableDisableNextBtn();
    removeClass("couponPart", "hidden");
  }
  if (maxSeat === MX_PERMITTED_SEAT) {
    makeEnable("couponBtn");
  } else {
    discountedCost = 0;
    addClass("discountPart", "hidden");
    makeDisable("couponBtn");
  }
});

// Handle Next Button to buy Ticket
function handleNextSubmit(event) {
  event.preventDefault();
  my_modal_5.showModal();
}

// Enabling and Disabling Ticket buy as Next button
function eableDisableNextBtn() {
  if (maxSeat > 0 && phoneNum.length === 11) {
    makeEnable("btnToBuy");
  } else makeDisable("btnToBuy");
}
document.getElementById("phoneNumber").addEventListener("keyup", (event) => {
  phoneNum = event.target.value;
  eableDisableNextBtn();
});

// Handle Apply Button coupon part

document.getElementById("couponBtn").addEventListener("click", (event) => {
  const couponInput = getInputValue("inputCoupon");

  if (couponInput === COUPON_15.name && discountedCost === 0) {
    discountedCost = grandTotalCost * (COUPON_15.discount / 100);
    grandTotalCost = grandTotalCost * (1 - COUPON_15.discount / 100);
    shwoDiscount();
  } else if (couponInput === COUPON_20.name && discountedCost === 0) {
    discountedCost = grandTotalCost * (COUPON_20.discount / 100);
    grandTotalCost = grandTotalCost * (1 - COUPON_20.discount / 100);
    shwoDiscount();
  } else {
    alert("This Coupon is not Valid...!");
  }
});

// Smooth transition

function smoothTransition() {
  document
    .querySelector("#buyTicketSection")
    .scrollIntoView({ behavior: "smooth" });
}

// Handle final Submit Button from modal to reset the form and page
function resetAllField() {
  location.reload();
}
