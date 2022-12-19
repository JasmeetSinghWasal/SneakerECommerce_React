const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://<YourUsername>:<YourPassword>@<ClusterName>/?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.connection.on("connected", function () {
  console.log("Application is connected to Database");
})