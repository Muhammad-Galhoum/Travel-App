//gloabl variable
const caption = document.getElementById("caption");
const daysContainer = document.getElementById("days");
const hoursContainer = document.getElementById("hours");
const minutesContainer = document.getElementById("minutes");
const secondsContainer = document.getElementById("seconds");
const countdownSection = document.getElementById("countdown-section");

// Calculate how far this flight is
const countDown = (dateInfo) => {
  setInterval(() => {
    let month = dateInfo.month;
    let year = dateInfo.year;

    //convert numeric month to name
    let monthName = getMonthName(month);
    let date = `${monthName} ${dateInfo.day}, ${year} 00:00:00`;

    //take the date and get date in time
    let countDate = new Date(date).getTime();
    const now = new Date().getTime();
    let gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    //take the gap and extract the days and hours and so on
    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    //add to the UI
    caption.innerHTML = `the trip is ${textDay} days away! 🤩`;
    daysContainer.innerHTML = textDay;
    hoursContainer.innerHTML = textHour;
    minutesContainer.innerHTML = textMinute;
    secondsContainer.innerHTML = textSecond;
    return;
  }, 1000);

  countdownSection.classList.remove("hidden");
};

const getMonthName = (month) => {
  let monthlable;
  switch (month) {
    case "01":
      monthlable = "Jan";
      break;
    case "02":
      monthlable = "Feb";
      break;
    case "03":
      monthlable = "Mar";
      break;
    case "04":
      monthlable = "Apr";
      break;
    case "05":
      monthlable = "May";
      break;
    case "06":
      monthlable = "Jun";
      break;
    case "07":
      monthlable = "Jul";
      break;
    case "08":
      monthlable = "Aug";
      break;
    case "09":
      monthlable = "Sep";
      break;
    case 10:
      monthlable = "Oct";
      break;
    case 11:
      monthlable = "Nov";
      break;
    case 12:
      monthlable = "Dec";
      break;
    default:
      monthlable = "NAN";
      break;
  }

  return monthlable;
};

export { countDown, getMonthName };
