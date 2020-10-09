const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Hello World!");
});


// app.get("/recommendation/:id/:amount", (req,res)=>{
//   var event_id = req.params.id;
//   var amount = req.params.amount; 

//   var fake_data = [{"name":"Marco", "email":"somthing@gmail.com"},
//                   {"name":"Marco", "email":"somthing@gmail.com"},
//                   {"name":"Marco", "email":"somthing@gmail.com"}
//                   ];

//   // make a call to get the recommendation for a particular event 
//   // 

//   return res.status(200).send(fake_data);

// });

app.get("/recommendation/:eventid",(req,res)=>{
  var event_id = parseInt(req.params.eventid);
  console.log(event_id)
  var eventRecommendation = db.collection("recommendation")
  var volunteerRecomm = []
  eventRecommendation.where("id", "==", event_id).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var firebaseObject = doc.data();
        volunteerRecomm = firebaseObject.recommendations;
    });
    return res.status(200).json(volunteerRecomm);
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
    return res.status(500).end();
});
});

app.get("/recommendationstatus/:eventid",(req,res)=>{
  var event_id = parseInt(req.params.eventid);
  console.log(event_id)
  var eventRecommendation = db.collection("recommendation")
  var volunteerRecomm = []
  eventRecommendation.where("id", "==", event_id).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var firebaseObject = doc.data();
        volunteerRecomm = firebaseObject.recommendations;
    });
    volunteerRecomm.forEach((object)=>{
      object.status = "No response"; 
    });
    return res.status(200).json(volunteerRecomm);
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
    return res.status(500).end();
});
});

app.get('/testrecomm',(req,res)=>{
    var result = [{
        "name": 'Marco', "email": 'test@gmail.com'
      },{
        "name": 'Marco', "email": 'test@gmail.com'
      },
      {"name": 'Marco', "email": 'test@gmail.com'
      }
    ]

    return res.status(200).json(result);

});


app.get('/teststatus',(req,res)=>{
  var result = [{
    "name": 'Marco', "email": 'test@gmail.com',"status":"Accepted"
  },{
    "name": 'Marco', "email": 'test@gmail.com',"status":"Decline",
  },
  {"name": 'Marco', "email": 'test@gmail.com',"status":"No response"
  }
]

return res.status(200).json(result);

});

app.get("/events", (req,res)=>{
    var eventsRef = db.collection("events");
    var eventsArray = []; 
    eventsRef.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var firebaseObject = doc.data();
            var eventObj = {}
            eventObj.title = firebaseObject.name; 
            var d = new Date(object.date._seconds * 1000);
            var date = d.getDate();
            var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
            var year = d.getFullYear();
            var dateString = year+ '-' + month+ '-' + date;
            eventObj.date = dateString; 
            eventsArray.push(eventObj);
        });
        return res.status(200).send(eventsArray);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        return res.status(500).end();
    });
});



app.get('/getevents',(req,res)=>{

  var result = [{
      "title": 'event 1', "date": '2020-10-11'
    },{
      "title": 'event 2', "date": '2020-10-11'
    },
      {"title": 'event 3', "date": '2020-10-11'}
  ]

  var testing = [{"date":{"_seconds":1602172800,"_nanoseconds":0},"name":"Outreach at Blossom Youth","id":2},{"date":{"_seconds":1602172800,"_nanoseconds":0},"id ":1,"name":"Animal Shelter"}]

  testing.forEach((object)=>{
    console.log(object.name);
    var d = new Date(object.date._seconds * 1000);
    var date = d.getDate();
    var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = d.getFullYear();
    var dateString = year+ '-' + month+ '-' + date;
    console.log(dateString); 
  });

  return res.status(200).json(result);
  

})



app.post("/write-doc", async (req, res) => {
  const { collection, documentId, documentValue } = req.body;
  const docRef = db.collection(collection).doc(documentId);
  try {
    const r = await docRef.set(documentValue);
    console.log("Write Success", r);
    return res.status(200).end();
  } catch (e) {
    console.error("Write Failure", r);
    return res.status(500).end();
  }
});

app.get("/read-doc", async (req, res) => {
  const { collection, documentId } = req.query;
  const docRef = db.collection(collection).doc(documentId);
  try {
    const r = await docRef.get();
    console.log("Read Success", r);
    return res.status(200).send({
      name: r.id,
      value: r.data(),
    });
  } catch (e) {
    console.error("Read Failure", e);
    return res.status(500).end();
  }
});

exports.api = functions.https.onRequest(app);
