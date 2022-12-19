const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    Id: Number,
    Title: String,
    FirstName: String,
    LastName: String,
    Age: Number,
    CurrentStatus: {type:String,default:"Working"},
    Department: String,
    EmployeeType: String,
    DateOfJoining: String,
  

});

const Employee = mongoose.model('Employee', EmployeeSchema, "Employee");
module.exports = Employee;