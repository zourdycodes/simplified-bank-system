'use strict';


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

//////////////////////////////////////////////////////////////////////
////////////   NUMBERS & DATES & INTL AND TIMERS   ///////////////////
////////////           JAVASCRIPT FEATURE         ////////////////////
//////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-13T17:01:17.194Z',
    '2020-07-17T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'TRY',
  locale: 'tr-TR', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-20T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-10T16:33:06.386Z',
    '2020-04-15T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-28T12:01:20.894Z',
  ],
  currency: 'HUF',
  locale: 'hu-HU',
};

const account3 = {
  owner: 'Mohammad Zourdy',
  movements: [5000, 3100, -1500, -790, -3210, 1000, 8500, -350],
  interestRate: 1.2,
  pin: 2026,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-12-20T09:48:16.867Z',
    '2020-01-15T06:04:23.907Z',
    '2020-03-25T14:18:46.235Z',
    '2020-06-10T16:33:06.386Z',
    '2020-07-15T14:43:26.374Z',
    '2020-08-25T18:49:59.371Z',
    '2021-02-28T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const account4 = {
  owner: 'Victoria Maxwell',
  movements: [5000, 3400, -1500, -850, -3210, -1000, 8500, -300],
  interestRate: 1.3,
  pin: 2026,

  movementsDates: [
    '2019-12-01T13:15:33.035Z',
    '2020-01-20T09:48:16.867Z',
    '2020-02-15T06:04:23.907Z',
    '2020-05-25T14:18:46.235Z',
    '2020-07-10T16:33:06.386Z',
    '2020-07-15T14:43:26.374Z',
    '2020-08-25T18:49:59.371Z',
    '2021-02-28T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

//////////////////////////////////////
//  IMPLEMETING DATES TO BANKIST   //
//       FORMATTING DATES        //
///////////////////////////////////

const formatDates = (date, locale) => {
  const calcDaysPasseds = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPasseds(new Date(), date);
  console.log(daysPassed);

  // LOGIC
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days  ago`;
  else {
    // const dates = date.getDate(); // ${now.getDate()}.padStart(2, 0);
    // const month = date.getMonth() + 1; // // ${now.getDate()}.padStart(2, 0);
    // const year = date.getFullYear();

    // const zero = time => (time < 10 ? 0 : '');
    // return `${zero(dates)}${dates}/${zero(month)}${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// FORMAT THE NUMBER OF INTERNATIONALIZATION

const formatedCurr = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};


const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //////////////////////////////////////
    //  IMPLEMETING DATES TO BANKIST   //
    //       JAVASCRIPT PROJECT       //
    ///////////////////////////////////

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatDates(date, acc.locale);

    // FORMAT THE NUMBER OF INTERNATIONALIZATION
    const formattedMov = formatedCurr(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatedCurr(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatedCurr(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatedCurr(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatedCurr(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
//   SET-TIMEOUT AND SET-INTERVAL   //
//       JAVASCRIPT FEATURE        //
////////////////////////////////////
// LOGOUT TIMER
const logoutTimers = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // IN EACH CALL, PRINT THE REMAINING TIME TO UI
    labelTimer.textContent = `${min}:${sec}`;


    // WHEN 0 SECOND, STOP TIMER AND LOG OUT USERS
    if (time === 0) {
      clearInterval(time);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1s
    time--;
  };
  // SET TIMES TO 5 MINUTES
  let time = 60;
  tick();
  // CALL THE TIMER EVERY SECOND
  const timerz = setInterval(tick, 1000);
  return timerz;
};

///////////////////////////////////////
// Event handlers

//////////////////////////////////////
//  IMPLEMETING DATES TO BANKIST   //
//       JAVASCRIPT PROJECT       //
///////////////////////////////////


let currentAccount, timerz;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  // USERNAMES 
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // PIN
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]} `;
    containerApp.style.opacity = 100;

    //////////////////////////////////////
    //   INTERNATIONALIZATION DATES    //
    //       JAVASCRIPT FEATURE       //
    ///////////////////////////////////

    const now = new Date();
    // const day = now.getDate();
    // const month = now.getMonth() + 1;
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = now.getMinutes();

    // const zeros = time => time < 10 ? 0 : '';

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };

    const findLocale = currentAccount.locale;

    labelDate.textContent = new Intl.DateTimeFormat(findLocale, options).format(now);

    // `${ zeros(day) } ${ day } /${zeros(
    //   month
    // )}${month}/${year}, ${hour}:${zeros(min)}${min}`;



    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // TIMER
    if (timerz) clearInterval(timerz);
    timerz = logoutTimers();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // TODO ADDING TRANSFER DATE 
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    // RESET THE TIMERS when user doing transaction
    clearInterval(timerz);
    timerz = logoutTimers();

  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // IMPLEMETING TIMER ON LOAN 
    setTimeout(() => {
      // Add movement
      currentAccount.movements.push(amount);

      // TODO Adding LOAN dates
      currentAccount.movementsDates.push(new Date().toISOString());


      // Update UI
      updateUI(currentAccount);

      // RESET THE TIMERS when user doing transaction
      clearInterval(timerz);
      timerz = logoutTimers();

    }, 5000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//////////////////////////////////////////////////////////////////////
////////////   NUMBERS & DATES & INTL AND TIMERS   ///////////////////
////////////               LECTURE                ////////////////////
//////////////////////////////////////////////////////////////////////

////////////////////////////////////////
//      CONVERTING AND CHECKING      //
//   NUMBERS || JAVASCRIPT FEATURE  //
/////////////////////////////////////

// Base 10 => 0 to 9
// Binary Base 2 to 0

/// 1. CONVERSION
console.log(Number('30'));
console.log(+('30')); // -> using coercion


/// 2. PARSING =>
// USING: parseInt and parseFloat -> BOTH ARE GLOBAL FUNCTION SO WE DON'T NEED TO WRITE A Number.parseInt or vice versa
// A. parseInt
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('a23')); // got NaN because the first word should be a number

// B. parseFloat => ONLY FOR DECIMAL
console.log(Number.parseFloat('3.5rem'));
console.log(Number.parseFloat('a3.5rem')); // got NaN because the first word should be a number

/// 3 isNAN and isFinite

// check if the value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20x')); // true

// isFINITE is the best for checking if value is a number or not
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(20 / 0)); // false because we don't divide any number with 0 it will get result of INFINITY

// isINTEGER is for checking if the value is an INTEGER
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0)); // false -> INFINITY 


//////////////////////////////////////
//        MATH AND ROUNDING        //
//       JAVASCRIPT FEATURE       //
///////////////////////////////////

///  1. Square Root and Qubic Root

// A. two ways of SQUARE ROOT
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));

// B. QUBIC ROOT HAS ONLY ONE WAYS TO DO THIS
console.log(25 ** (1 / 3));
console.log(8 ** (1 / 3));

/// 2. Math MAX AND MIN
// A. Max -> will automatically return the coercion BUT it's not working with PARSE
console.log(Math.max(2, 24, 23, 5, 10, 9)); // 24
console.log(Math.max(2, '24', 23, 5, 10, 9)); // 24
console.log(Math.max(2, '24p', 23, 5, 10, 9)); // NaN

// B. Min 
console.log(Math.min(2, 24, 23, 5, 10, 9, 30)); // 2
console.log(Math.min('2', 24, 23, 5, 10, 9, '30')); // 2
console.log(Math.min('2p', 24, 23, 5, 10, 9, '30p')); // NaN

// 3. Calculate RADIUS OF CIRCLE USING Math.PI
console.log(Math.PI * Number.parseFloat('20px') ** 2); // rooting by 2
console.log(Math.PI); // 3.14

// 4. Math.Random
console.log(Math.trunc(Math.random() * 6) + 1); //  between 1 - 6


// 5. create randomINT
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
// 0....1 then 0....(max - min) -> min...max
console.log(randomInt(10, 20)); // between 10 .... 20

/// 6.
/** ROUNDING A NUMBER
 * Math.trunc()
 * Math.round()
 * Math.ceil()
 * Math.floor()
 * *
 * All method do the type coercion
 * The best way to work in any situation whether the number is in positive or negative, we use Math.floor()
 * *
 * toFixed Method will return a STRING so we need to change to the Number using TYPE COERCION
 */

console.log(Math.trunc(23.4))
console.log(Math.round(33.4))
console.log(Math.ceil(43.4))
console.log(Math.floor(13.4))

console.log(Math.trunc('43.4'))
console.log(Math.round('23.4'))
console.log(Math.ceil('53.4'))
console.log(Math.floor('83.4'))

// A. ROUNDING A NEGATIVE NUMBER
console.log(Math.trunc(-23.4)); // -23
console.log(Math.floor(-23.4)); // -24 => The best way to work in any situation whether the number is in positive or negative

// B. ROUNDING A DECIMAL NUMBER
console.log((2.7).toFixed(0)); // 3 => STRING
console.log((2.7).toFixed(2)); // 2.70 => STRING
console.log((2.7).toFixed(3)); // 2.700 => STRING
console.log(+(2.734).toFixed(2)); // 2.73 => NUMBER



//////////////////////////////////////
//     THE REMAINDER OPERATOR      //
//       JAVASCRIPT FEATURE       //
///////////////////////////////////

console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1 = 5 

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2 = 8 

console.log(6 % 2);
console.log(6 / 2); // 6 = 2 * 3 = 6 

console.log(10 % 2); // 0
console.log(10 / 2);  // 10 = 2 * 5 

// isEven
const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

// JUST HAVING FUN WITH STYLING
labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered'; // 0,2,4,6,8, and so forth
    if (i % 3 === 0) row.style.backgroundColor = 'green'; // 0,3,5,7,9 and so forth
    console.log(i)
  });
});

//////////////////////////////////////
//    THE bigINT (SPECIAL TYPE)    //
//       JAVASCRIPT FEATURE       //
///////////////////////////////////

/** REVIEW
 * Number are represents internally as 64 bits
 * that mean there are actually 64 bits ONE or ZEROS to represent any number
 * ONLY 53 BITS ARE USED TO STORE THE DATA OR NUMBER
 * *
 * ANY INTEGER THAT ARE LARGER THAN THIS 9007199254740991 IS NOT SAFE
 * *
 * a BigINT number, it's different from the regular number
 * YOU CANNOT MAKE AN OPERATION BETWEEN BigINT and Regular NUMBER
 * *
 * @param 
 */


// Working with Binary 0 and 1 which is BASE 2 
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 WILL RETURN THE SAME

// NOT SAFE INTEGER
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

//// 1. BigINT => for store big integer value beyond the 64 bits
console.log(30824207120804801401401104108n); // 30824207120804801401401104108n <= this is a BigINT number
console.log(BigInt(30824207120804801401401104108n));

// A. Operations with BigINT NUMBER
console.log(23488875n + 37458604n); // 60947479n
console.log(200000n * 10000n); // 2000000000n
console.log(121308388888333333333n + 1921083333880n); // 121308390809416667213n

const huge = 2313719371927391n;
const num = 390002838888;

console.log(huge + BigInt(num)); // BOTH NUMBER SHOULD BE A bigINT NUMBER,instead it will return an ERROR
// 2314109374766279n

// B. EXCEPTIONS -> operand condition
console.log(20n >= 20); // true
console.log(20n === 20); // false => does not doing type coercion
console.log(20n == 20); // true => actually does a type coercion by default
console.log(typeof 20n); // BigInt

// concatenate STRING with BigINT 
console.log(huge + ' this is REALLY huge Number'); // the BigINT will return to STRING => 2313719371927391 this is REALLY huge Number

// C. DIVISION
console.log(11n / 3n); // 3n -> AUTOMATICALLY CUT OFF THE DECIMAL
console.log(11 / 3); // 3.66666666 and so on and so forth


//////////////////////////////////////
//        CREATING   DATES         //
//       JAVASCRIPT FEATURE       //
///////////////////////////////////

// 1. Create a date
const date = new Date();
console.log(date);

console.log(new Date('Mar 4 2026 08:12:54'));
console.log(new Date('December 14, 2016'));
console.log(new Date(account3.movementsDates[0]));


console.log(new Date(2021, 6, 17, 16, 34, 25));
console.log(new Date(2021, 8, 12, 18, 38, 15));
console.log(new Date(2021, 8, 8, 12, 23, 55));

// GET THE UNIX TIME
console.log(new Date(0)); // Thu Jan 01 1970 07:00:00 GMT+0700

// Working with the DATE
console.log('-----------FUTURE----------')
const future = new Date(2038, 9, 17, 14, 10);
console.log(future); // => Sun Oct 17 2038 14:10:00 GMT+0700
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // => 2038-10-17T07:10:00.000Z
console.log(future.getTime()); // TimeStamp => time that had been through -> 2170912200000

console.log(new Date(2170912200000)); // Sun Oct 17 2038 14:10:00 GMT+0700 (Indochina Time) => based on TIME STAMP

console.log(Date.now()); // -> TIME STAMP => 1614965303294

future.setFullYear(2039);
console.log(future); // Mon Oct 17 2039 14:10:00 GMT+0700 (Indochina Time)

console.log(new Date(1614965303294));


//////////////////////////////////////
//       OPERATIONS  DATES         //
//       JAVASCRIPT FEATURE       //
///////////////////////////////////

// 1. TESTER
const futures = new Date(2037, 7, 14, 10, 45);
console.log(+futures); // 2133834300000 => MILI SECONDS

// 2. DAYS PASSED
const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysPassed(new Date(2037, 7, 14), new Date(2037, 7, 24));
console.log(days1); // 10 days has been passed

const days2 = calcDaysPassed(new Date(2037, 7, 14), new Date(2037, 7, 4));
console.log(days2); // 10 days has been passed

//////////////////////////////////////
//   INTERNATIONALIZATION NUMBER   //
//       JAVASCRIPT FEATURE       //
///////////////////////////////////

const nums = 3987644.87;

const options = {
  style: 'currency',
  currency: 'EUR',
};

console.log(`US:             `, new Intl.NumberFormat('en-US', options).format(nums));
console.log(`SWEDEN:         `, new Intl.NumberFormat('se-SE', options).format(nums));
console.log(`GERMANY:        `, new Intl.NumberFormat('de-DE', options).format(nums));
console.log(`ROMANIA:        `, new Intl.NumberFormat('ro-RO', options).format(nums));
console.log(`TURKEY:         `, new Intl.NumberFormat('tr-TR', options).format(nums));
console.log(`INDONESIA:      `, new Intl.NumberFormat('id-ID', options).format(nums));










///////////////////////////////////////
//   SET-TIMEOUT AND SET-INTERVAL   //
//       JAVASCRIPT FEATURE        //
////////////////////////////////////

/** 
 * NOTE:
 * We have to use callbacks here
 * just execute once
 * we can cancel the TIMER using clearTimeout()
 * * setInterval()
 * setInterval is taking every single time not just one time but all the time
 * EXECUTE EVERY SINGLE TIME THAT WE GIVEN
 * like clock ticking every time
*/

const ingredients = ['cheese', 'pepperoni', 'spinach'];
// SET-TIMEOUT
const timer = setTimeout(
  (ing1, ing2, ing3) =>
    console.log(`Your pizza is served now! with ${ing1} and ${ing2} also with ${ing3}`),
  5000,
  ...ingredients
  // 'cheese', // WILL TAKE A FIRST @PARAM => ing1
  // 'pepperoni' // WILL TAKE A SECOND @PARAM => ing2
);

console.log('wating to serve');

// CANCEL THE TIMERS
if (ingredients.includes('spinach')) clearTimeout(timer);

const zeroz = time => time < 10 ? 0 : '';
// SET-INTERVAL
// setInterval(() => {
//   const date = new Date();
//   const hour = date.getHours();
//   const minute = date.getMinutes();
//   const sec = date.getSeconds();
//   console.log(`${hour}: ${minute} : ${zeroz(sec)}${sec}`);
// }, 1000);























