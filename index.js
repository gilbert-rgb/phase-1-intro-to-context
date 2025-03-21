// index.js

// Function to create an employee record
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records from an array of arrays
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  // Function to create a time-in event for an employee record
  function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeInEvent = {
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  // Function to create a time-out event for an employee record
  function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeOutEvent = {
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  // Function to calculate hours worked for an employee on a given date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100; // Assuming hour is in HHMM format
    }
    return 0;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(event => event.date);
    return allDates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  }
  
  // Function to calculate payroll for an array of employee records
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
  }
  
  
  
