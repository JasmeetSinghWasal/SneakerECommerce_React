require('./db');
const Employee = require('./Employee')

const tempEmployee = [
    {Id: 1, EmployeeType: 'Full Time', FirstName: 'Person-A', LastName: 'Person-k', Age: 20, DateOfJoining: new Date('2022-09-16'), Title: 'Issue - 1',Title: 'Ti', CurrentStatus: 0},
    {Id: 2, EmployeeType: 'Part Time', FirstName: 'Person-B', LastName: 'Person-k', Age: 5, DateOfJoining: new Date('2022-09-19'), Title: 'Issue - 2',Title: 'Ij', CurrentStatus: 1}
  ];

Employee.insertMany(tempEmployee)
    .then(function(data){
})