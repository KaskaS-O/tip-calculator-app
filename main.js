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

let billValue = 0;
let splitValue = 1;
let tipValue = 0;

const handleResetButton = () => {
  inputBill.value = '';
  inputSplit.value = '';
  inputTip.value = '';

  btnsTip.forEach(btn => {
    btn.classList.contains('active-btn') ? btn.classList.remove('active-btn') : ''
  })

  billValue = 0;
  splitValue = 1;
  tipValue = 0;

  countPerPerson()
};

const countPerPerson = () => {

  const tipAmount = billValue * tipValue / 100;
  const totalAmount = tipAmount + billValue;
  const amountPerPerson = totalAmount / splitValue;
  const tipAmountPerPerson = tipAmount / splitValue;


  if (tipAmountPerPerson) {
    tipPerPerson.innerText = `$${tipAmountPerPerson.toFixed(2)}`;
  } else {
    tipPerPerson.innerText = `$0.00`;

  }

  if (amountPerPerson) {
    totalPerPerson.innerText = `$${amountPerPerson.toFixed(2)}`;
  } else {
    totalPerPerson.innerText = `$0.00`;
  }
}

const handleInputChange = event => {
  let errorMsg = event.target.parentElement.firstElementChild.lastElementChild;
  const activeEl = event.target;
  let currentActiveEl = 1;
  let activeTitleEl = document.activeElement;
  let value = parseFloat(activeEl.value)

  if (activeEl === inputBill) {
      billValue = value;
      currentActiveEl = inputBill;
      activeTitleEl = activeEl.parentElement.firstElementChild;

  } else if (activeEl === inputTip) {
      value = value || 0;
      tipValue = value;
    
  } else if (activeEl === inputSplit) {
      splitValue = parseInt(value);
      currentActiveEl = inputSplit;
      activeTitleEl = activeEl.parentElement.firstElementChild;
  }

  if (parseFloat(currentActiveEl.value) === 0) {
      currentActiveEl.style.borderColor = 'rgb(202, 109, 47)';
      errorMsg.style.display = 'block';
      errorMsg.innerText = `Can't be zero`;
      activeTitleEl.appendChild(errorMsg);
  } else if (activeTitleEl.childNodes.length > 2) {
      errorMsg.style.display = 'none';
      currentActiveEl.removeAttribute('style');
      }

  countPerPerson()
}

const handleButtonClick = event => {
  event.preventDefault();
  let activeBtn = event.target;

  btnsTip.forEach(btn => {
    let active = btn.classList.contains('active-btn');

    if (btn === activeBtn && !active) {
      btn.classList.add('active-btn');
      tipValue = parseFloat(activeBtn.value);
    } else if (btn === activeBtn && active) {
      btn.classList.remove('active-btn');
      tipValue = 0;
    } else if (active) {
      btn.classList.remove('active-btn');
    } 
  })

  countPerPerson()
}

const handleCustomTip = () => {
  btnsTip.forEach(btn => {
    if (btn.classList.contains('active-btn')) {
      btn.classList.remove('active-btn')
    }
  })
}


inputs.forEach(item => {
    item.addEventListener('input', handleInputChange)
});

btnsTip.forEach(btn => {
  btn.addEventListener('click', handleButtonClick)
});

inputTip.addEventListener('focus', handleCustomTip);

btnReset.addEventListener('click', handleResetButton);