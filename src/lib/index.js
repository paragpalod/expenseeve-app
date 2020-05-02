/**
* @param date - Date to be formatted, need not be JS date, ISO string would be fine as well
* @param isTimeRequired - If set to true, will also return the time of the day component
*/
export function formatDateTime(date, isTimeRequired) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone:'Asia/Kolkata'
  };
  let formattedDate = '';
  if (isTimeRequired) {
    options.hour = 'numeric';
    options.minute = 'numeric';
    options.second = 'numeric';
  }
  if (date) {
    formattedDate = new Intl.DateTimeFormat('en-IN', options).format(new Date(date));
  }
  return formattedDate;
}

export function formatDateForHtmlForm (date) {
  if (date === null) {
    return '';
  } else {
    const DATE = new Date(date);
    let DD = DATE.getDate();
    let MM = DATE.getMonth() + 1;
    const YYYY = DATE.getFullYear();
    if (DD < 10) {
      DD = '0' + DD;
    }
    if (MM < 10) {
      MM = '0' + MM;
    }
    const HtmlFormatDate = `${YYYY}-${MM}-${DD}`;
    return HtmlFormatDate;
  }
}
