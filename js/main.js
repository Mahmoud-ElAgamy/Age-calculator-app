// => Utility Functions
const select = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

// => DOM Elements
const form = select("#date-of-birth"),
  dayInput = select("#day-input"),
  monthInput = select("#month-input"),
  yearInput = select("#year-input"),
  ageInDaysEle = select(".day"),
  ageInMonthsEle = select(".month"),
  ageInYearsEle = select(".year");

// => Date Now
const dateNow = new Date();

const initApp = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    calcAge(dayInput.value, monthInput.value, yearInput.value);
    yearInput.blur();
  });
  yearInput.max = dateNow.getFullYear() - 1;
};

addEventListener("DOMContentLoaded", initApp);

const calcAge = (day, month, year) => {
  const userBirthDayDate = new Date(`${year} ${month} ${day}`);

  const ageInYears = Math.floor(
    (dateNow - userBirthDayDate.getTime()) / 3.15576e10
  );

  let ageInMonths = dateNow.getMonth() + 1 - month;
  let ageInDays = dateNow.getDate() - day;

  if (
    ageInMonths < 0 ||
    (userBirthDayDate.getMonth() === dateNow.getMonth() &&
      userBirthDayDate.getDate() > dateNow.getDate())
  )
    ageInMonths += 12;

  if (ageInDays < 0) {
    ageInMonths--;
    ageInDays += 31;
  }

  ageInYearsEle.innerHTML = `${ageInYears} <span>Years</span>`;
  ageInMonthsEle.innerHTML = `${ageInMonths} <span>${
    ageInMonths > 1 ? "Months" : "Month"
  }</span>`;
  ageInDaysEle.innerHTML = `${ageInDays} <span>${
    ageInDays > 1 ? "Days" : "Day"
  }</span>`;
};
