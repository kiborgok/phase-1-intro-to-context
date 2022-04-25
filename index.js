function createEmployeeRecord(employeeRecord) {
  return {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeRecords) {
  return employeeRecords.map((record) => createEmployeeRecord(record));
}

let createTimeInEvent = function (employeeRecord, dateObject) {
  let [date, hour] = dateObject.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return employeeRecord;
};

let createTimeOutEvent = function (employeeRecord, dateObject) {
  let [date, hour] = dateObject.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, dayDate) {
  let timeInEvent = employeeRecord.timeInEvents.find((e) => e.date === dayDate);
  let timeOutOut = employeeRecord.timeOutEvents.find((e) => e.date === dayDate);
  return (timeOutOut.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, dayDate) {
  const wage =
    hoursWorkedOnDate(employeeRecord, dayDate) * employeeRecord.payPerHour;
  return parseFloat(wage.toString());
}

let allWagesFor = (employeeRecord) => {
  let datesAvailable = employeeRecord.timeInEvents.map((e) => e.date);

  let payOwed = datesAvailable.reduce(
    (memo, d) => memo + wagesEarnedOnDate(employeeRecord, d),
    0
  );

  return payOwed;
};

let calculatePayroll = (employeeRecords) =>
  employeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0);
