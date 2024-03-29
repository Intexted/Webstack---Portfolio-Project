const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let list_Months = getMonthsAndYearsArray();

// Function to get the number of days in a month
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

// Function to get the day name
const getDayName = (year, month, day) => {
  const dayIndex = new Date(year, month, day).getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[dayIndex];
};

// Get the current date
const currentDate = new Date();

const currentMonth = currentDate.getMonth();

const currentYear = currentDate.getFullYear();

const today = currentDate.getDate();

const MonthsData = (UserDashboard) => {
  // { month: 'May', index: 5, year: 2024 }
  if (UserDashboard) {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const daysArray = Array.from({ length: daysInMonth }, (_, day) => ({
      day: day + 1,
      dayName: getDayName(currentYear, currentMonth, day + 1),
      isToday: day + 1 === today,
    }));

    return [
      {
        currentMonthName: months[currentMonth],
        currentYear,
        daysArray,
        today,
        currentMonth: currentMonth + 1,
      },
    ];
  }

  return list_Months.map(({ month, index, year }) => {
    const daysInMonth = getDaysInMonth(year, index);
    const daysArray = Array.from({ length: daysInMonth }, (_, day) => ({
      day: day + 1,
      dayName: getDayName(year, index - 1, day + 1),
      isToday: day + 1 === today && index === currentMonth + 1,
    }));

    return {
      currentMonthName: month,
      currentYear: year,
      daysArray,
      today,
      currentMonth: index,
    };
  });
};

export { MonthsData };

function getMonthsAndYearsArray() {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const resultMonthsAndYears = [];

  // Previous 6 months
  for (let i = currentMonthIndex - 6; i < currentMonthIndex; i++) {
    const adjustedMonth = (i + 12) % 12;
    const year =
      adjustedMonth > currentMonthIndex ? currentYear - 1 : currentYear;
    resultMonthsAndYears.push({
      month: months[adjustedMonth],
      index: adjustedMonth + 1,
      year,
    });
  }

  // Current month and next 6 months
  for (let i = currentMonthIndex; i < currentMonthIndex + 6; i++) {
    const adjustedMonth = i % 12;
    const year =
      adjustedMonth < currentMonthIndex ? currentYear + 1 : currentYear;
    resultMonthsAndYears.push({
      month: months[adjustedMonth],
      index: adjustedMonth + 1,
      year,
    });
  }

  return resultMonthsAndYears;
}

const monthsAndYearsArray = getMonthsAndYearsArray();
console.log(monthsAndYearsArray);
