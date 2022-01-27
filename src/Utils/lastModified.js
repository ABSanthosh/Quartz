function timeNow(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function monthIs(number) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[number - 1];
}

function monthDateYear() {
  // return current Month, Date and Year in Jan 01, 2020 format
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  return monthIs(parseInt(mm)) + " " + dd + " " + yyyy;
}

export function lastModified() {
  return { time: timeNow(new Date()), today: monthDateYear(), seconds: Date.now()};
  // {time: '7:30 pm', today: 'Jan 27 2022'}
}
