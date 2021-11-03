const formTitleBill = document.querySelector('.calculator__title-container--bill');
const formTitleSplit = document.querySelector('.calculator__title-container--split');

const inputBill = document.querySelector('#bill');
const inputTip = document.querySelector('#tip');
const inputSplit = document.querySelector('#split');

const btn5 = document.querySelector('#btn5');
const btn10 = document.querySelector('#btn10');
const btn15 = document.querySelector('#btn15');
const btn25 = document.querySelector('#btn25');
const btn50 = document.querySelector('#btn50');
const btnReset = document.querySelector('.calculator__btn--reset');

const tipPerPerson = document.querySelector('.summary__amount-per-person--tip');
const totalPerPerson = document.querySelector('.summary__amount-per-person--bill');

const btnsTip = Array.from(document.querySelectorAll('.calculator__btn--tip'));

const inputs = Array.from(document.querySelectorAll('.calculator__input'));

let billValue = '';
let spitValue = '';
let tipValue = '';

const handleInputChange = event => {
    let errorMsg = event.target.parentElement.firstElementChild.lastElementChild;
    const activeEl = document.activeElement;
    let currentActiveEl = 1;
    let activeTitleEl = document.activeElement;

  if (activeEl === inputBill) {
      billValue = inputBill.value;
      currentActiveEl = inputBill;
      activeTitleEl = activeEl.parentElement.firstElementChild;

  } else if (activeEl === inputTip) {
      tipValue = inputTip.value;
    
  } else if (activeEl === inputSplit) {
      splitValue = inputSplit.value;
      currentActiveEl = inputSplit;
      activeTitleEl = activeEl.parentElement.firstElementChild;

  }

  if (currentActiveEl.value == 0) {
      currentActiveEl.style.borderColor = 'rgb(202, 109, 47)';
      errorMsg.style.display = 'block';
      errorMsg.innerText = `Can't be zero`;
      activeTitleEl.appendChild(errorMsg);
  } else if (activeTitleEl.childNodes.length > 2) {
      errorMsg.style.display = 'none';
      currentActiveEl.removeAttribute('style');
      }
  
}



inputs.forEach(item => {
    item.addEventListener('input', handleInputChange)
});

btnsTip.forEach(item => {
  item.addEventListener('click', handleButtonClick)
});