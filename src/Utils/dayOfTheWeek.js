function getDayStr() {
  let date = new Date()
  // Sun = 0, Mon = 1, Tues = 2, ... 
  let dayNum = date.getDay();
  let dayStr = ""
  switch (dayNum) {
    case 0: dayStr = "Sunday"; break;
    case 1: dayStr = "Monday"; break;
    case 2: dayStr = "Tuesday"; break;
    case 3: dayStr = "Wednesday"; break;
    case 4: dayStr = "Thursday"; break;
    case 5: dayStr = "Friday"; break;
    case 6: dayStr = "Saturday"; break;
    default: dayStr = "Day"; break;
  }

  return dayStr
}

const DAY_OF_THE_WEEK = getDayStr()

export default DAY_OF_THE_WEEK