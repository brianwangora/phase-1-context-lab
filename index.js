function createEmployeeRecord(array) {
    return {
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: `${array[2]}`,
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords (nestedArray) {
    return nestedArray.map(function(array){return createEmployeeRecord(array)})    
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split('')
    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour, 10), 
        date,
    })
    return this
}

function createTimeOutEvent (dateStamp) {
    let [date, hour] = dateStamp.split('')
    this.timeInEvents.push({
        type: "TimeOut", 
        hour: parseInt(hour, 10), 
        date,
    })
    return this
}

function hoursWorkedOnDate (employeeRecord, dateWorked) {
    let timeIn = employeeRecord.timeInEvents.find(function(event) {
        return event.date === dateWorked
    })
    let timeOut = employeeRecord.timeOutEvents.find(function(event) {
        return event.date === dateWorked
    })
    return ((timeOut.hour - timeIn.hour) / 100)
}

function wagesEarnedOnDate (dateWorked) {
    let wagesEarned = hoursWorkedOnDate.call(this, dateWorked)
        * this.payPerHour
    return parseFloat(wagesEarned.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec)
    }, 0)
}
