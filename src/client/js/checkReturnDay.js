export function checkReturnDay(leaving, returnDate) {
  let date = leaving.split("-");
  let m = parseInt(date[1]);
  let d = parseInt(date[2]);
  let y = parseInt(date[0]);
  let date2 = returnDate.split("-");
  let m2 = parseInt(date2[1]);
  let d2 = parseInt(date2[2]);
  let y2 = parseInt(date2[0]);

  let totalMonth;
  let totalDays;
  let totalYear = 0;
  let total;

  if (y2 > y) {
    totalYear = y2 - y;
    if (m2 >= m) {
      totalMonth = m2 - m;
      if (d2 > d) {
        totalDays = d2 - d;
      } else {
        totalDays = d2 - d;
      }
    } else {
      totalMonth = m - m2;
    }
  } else if (y2 == y) {
    totalYear = 0;
    if (m2 >= m) {
      totalMonth = m2 - m;
      if (d2 > d) {
        totalDays = d2 - d;
      } else {
        totalDays = d - d2;
        return (total = totalYear * 12 + totalMonth * 30 - totalDays);
      }
    } else {
      alert("invaild return date month");
    }
  } else {
    alert("invaild return date year");
  }

  total = totalYear * 12 + totalMonth * 30 + totalDays;
  return total;
}
