// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("./src/config/passport");

// Require User Schema
var User = require('./models/User.js');
var Group = require('./models/Group.js');

//Require Tool Schema
var Tool = require('./models/Tool.js');

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8080;
// var PORT = 8080;

// ensure that public folder is the default for files
app.use(express.static("./public"));

// Run Morgan for Logging middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// -------------------------------------------------

// Initialize Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));


// MongoDB Configuration configuration
mongoose.connect("mongodb://localhost/toolshare");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------


// Main "/" Route. This will redirect the user to our rendered React application
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// This is the route we will send GET requests to retrieve or to post data to db.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {
  // We will find all the records, sort it in descending order, then limit the records to 5
  // History.find({}).sort([
  //   ["date", "descending"]
  // ]).limit(5).exec(function(err, doc) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     res.send(doc);
  //   }
  // });
});

app.get("/mytools", function(req, res){
 console.log("Information: ", req.body);
 User.find({}).exec(function(err, doc){
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
 });

});

// This is the route we will send POST requests to save user data to db.
app.post("/submitUser", (req, res) => {
  console.log("BODY: ", req.body);
  console.log(req.body.groupNew);
  console.log(req.body.groupName);
  var groupIdReceived;
  // check to see if this is a new Group Name
  if (req.body.groupNew) {
    console.log("new group requested " + req.body.groupName);
    Group.create({
      groupName: req.body.groupName,
      date: Date.now()
    }, (err, createdGroup) => {
      if (err) {
        console.log("error creating group ", err);
      }
      else {
        console.log("newly created group");
        console.log(createdGroup);
        User.create({
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
          firstName:req.body.firstName,
          lastName:req.body.lastName,
          groupId:createdGroup._id,
          userCreatedDate: Date.now()
        }, (err, createdUser) => {
          if (err) {
            console.log("error saving user ", err);
          }
          else {
            res.json(createdUser);
          }
        });
      }
    });
  }
  else {
    Group.find({
      "groupName": req.body.groupName
    }).exec( (err, group) => {
      if(err){
        console.log("error finding group");
      }
      else {
        console.log("group[0]._id");
        console.log(group);
        console.log(group[0]._id);
        groupIdReceived = group[0]._id;

        User.create({
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            groupId:groupIdReceived, // dummy data
            userCreatedDate: Date.now()
        }, (err) => {
          if (err) {
            console.log("error saving user ", err);
          }
          else {
            res.send("Saved User");
          }
        });
      }
    })
  }

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
  
});


// This is the route we will send POST requests for logging in.
app.post("/checkLogin", passport.authenticate("local"), function(req, res, next) {
  // console.log("inside check login");
  // console.log(req.session.passport.user);
  res.send(req.user);
})

app.get("/checkLogin", function(req, res) {
  console.log("inside app.get/checkLogin in server.js");
  console.log(req.session.passport.user);
  res.send(req.session.passport.user);
})


// -------------------------------------------------
// This is the route we will send POST requests to save a group name to db.
app.post("/createGroup", function(req, res) {
  console.log("BODY: " + req.body);

  // Here we'll save the group name based on the JSON input.
  // We'll use Date.now() to always get the current date time
  Group.create({
    groupName: req.body.groupName,
    date: Date.now()
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Group Name");
    }
  });
});

//Add tool to database
app.post("/submitTool", function(req, res){
  console.log("addTool BODY: ");
  console.log(req.body);

  var user = "e201";

  Tool.create({
    toolName: req.body.toolName,
    toolPrice: req.body.toolPrice,
    toolCondition: req.body.toolCondition,
    toolStatus: true,
    toolHeldBy: user,
    toolMaxDays: req.body.toolMaxDays,
    toolUrl: req.body.toolUrl,
    toolOwner: user,
    toolCreateDate: Date.now()
  }, function(err){
    if(err) {
      console.log(err);
    } else {
      res.send("Saved Tool")
    }
  })

});

app.get("/getTools", function(req, res){
  Tool.find({}).exec(function(err, doc){
    if(err){
      console.log(err);
    }else{
      console.log(doc);
      res.send(doc);
    }
  });
});

// -------------------------------------------------
// This is the route we will send GET list of groups in the Data Base.
app.get("/getGroups", function(req, res) {
  console.log("got into getGroups GET in Server");
  // We'll use Date.now() to always get the current date time
  Group.find({}, function(err, groups) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(groups);
    }
  });
});

// -------------------------------------------------
// This is the route we will send GET list of groups in the Data Base.
// app.get("/checkLogin", function(req, res) {
//   console.log("this is app.get for /checkLogin");
// });
// This is the route we will send GET list of groups in the Data Base.
app.post("/getMyTools", function(req, res) {
  console.log("got into getMytools GET in Server");
  // We'll use Date.now() to always get the current date time
  console.log(req.body.userName);
  Tool.find({
    toolOwner : req.body.userName
  }, function(err, tools) {
    if (err) {
      console.log("error finding tools");
      res.json(err);
    }
    else {
      console.log("sending tools");
      console.log(tools);
      res.json(tools);
    }
  });
});
// -------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});