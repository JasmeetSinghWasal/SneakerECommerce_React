
//My API's. Endpoints are resolvers


const express = require("express")
require('./models/db')
const Employee = require('./models/Employee')
const fs = require('fs')


/***GRAPHQL */
const { ApolloServer } = require('apollo-server-express');

const aboutMessage = "Hello From GraphQL";



//Resolver => API Endpoints
const resolvers = {
    Query: {
        about: () => aboutMessage,
        EmployeeList,
        EmployeeFiltered,
        GetSingleEmployee

    },
    Mutation: {
        setAboutMessage,
        AddOneEmployee, 
        OneEmployee,  
        UpdateEmployee,
        DeleteEmployee
    },
};

 
async function UpdateEmployee(_, { modifyEmployee }) {
    const empDetail =  await Employee.findByIdAndUpdate({ _id: modifyEmployee._id }, {
        EmployeeType: modifyEmployee.EmployeeType,
        FirstName: modifyEmployee.FirstName,
        LastName: modifyEmployee.LastName,
        Age: modifyEmployee.Age,
        Title: modifyEmployee.Title,
        Department: modifyEmployee.Department,
        CurrentStatus: modifyEmployee.CurrentStatus

    }).then(resp=>
    {
        console.log('Employee Updated', resp);
        return resp;
    }).catch(err=> {
        console.log('Error while updating employee', err);
    })
}

async function OneEmployee(_, _id) {
    return await Employee.findById(_id);
}

function AddOneEmployee(_, OneEmployee) {

    const query = Employee.find({});
    query.count(async function (err, count) {
        if (err) {
            return err;
        } else {
            OneEmployee.Id = count + 1;
            return Employee.create(OneEmployee)
                .then(function (Employee) {
                    return Employee;
                })
                .catch(function (error) {
                    return error;
                })

        }
    })
}

async function EmployeeList(_, { FirstName }) {
    if (FirstName !== "null") {
        return await Employee.find({ FirstName: FirstName });
    }
    else {
        return await Employee.find({});
    }
}

async function EmployeeFiltered(_, type) {
    if (type.EmployeeType.toString() == "PT") {
        return await Employee.find({ EmployeeType: 'PartTime' });
    }
    else if (type.EmployeeType.toString() == 'FT') {
        return await Employee.find({ EmployeeType: 'FullTime' });
    }
    else if (type.EmployeeType.toString() == 'ST') {
        return await Employee.find({ EmployeeType: 'Seasonal' });
    }
    else if (type.EmployeeType.toString() == 'CT') {
        return await Employee.find({ EmployeeType: 'Contract' });
    }
    else {
        return await Employee.find({});
    }
}

async function GetSingleEmployee(_, val) {
    let empDetails = await Employee.findOne({ Id: val.Id });
    return empDetails;
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}



async function DeleteEmployee(_, val) {

    let empDetail = await Employee.findOne({ Id: val._id }).then((resp) => {
        console.log('resp => ', resp);
        return resp;
    }).then((resp) => {
        console.log('Resp 2 => ', resp);
         Employee.findByIdAndDelete(resp._id).then((res) => {
            console.log('deleted record', res);
        }).catch((err) => {
            console.log('Failed to delete data', err);
        })
        return resp;
    }).catch((err) => {
        console.log('error => ', err);
        return err;
    })
console.log('empDetail => ', empDetail);
return empDetail;

}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('graphql_schema', 'utf8'),
    resolvers,
});



/*** */

const app = express();
// const port = 3001;

app.use(express.static('./public'))

const PORT = process.env.PORT || 3001;

// app.set('port', process.env.PORT || 3001);

// server.start()
//     .then(function () {
//         server.applyMiddleware({ app, path: '/graphql', cors: true })
//         console.log('Grahql added as middlewear');
//     })

server.start()
    .then(function () {
        server.applyMiddleware({ app, path: '/graphql', cors: true })
        console.log('Graphql added as middlewear on port', PORT);
    })



app.get('/', function (req, res) {
    res.render('index.html')
})

app.listen(PORT, function () {
    console.log("WebServer is running on port", PORT);
})

