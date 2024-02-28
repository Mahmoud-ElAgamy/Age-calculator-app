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

  const ageInMonths =
    dateNow.getMonth() < userBirthDayDate.getMonth()
      ? 12 - userBirthDayDate.getMonth() + 1
      : dateNow.getMonth() === userBirthDayDate.getMonth()
      ? 11
      : dateNow.getMonth() - userBirthDayDate.getMonth()
      ? dateNow.getMonth() - userBirthDayDate.getMonth()
      : "";

  const ageInDays =
    dateNow.getDate() < userBirthDayDate.getDate()
      ? Math.abs(dateNow.getDate() - userBirthDayDate.getDate()) +
        dateNow.getDate()
      : dateNow.getDate() - userBirthDayDate.getDate();

  ageInYearsEle.innerHTML = `${ageInYears} <span>Years</span>`;
  ageInMonthsEle.innerHTML = `${ageInMonths} <span>${
    ageInMonths > 1 ? "Months" : "Month"
  }</span>`;
  ageInDaysEle.innerHTML = `${ageInDays} <span>${
    ageInDays > 1 ? "Days" : "Day"
  }</span>`;
};
