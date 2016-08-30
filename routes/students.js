var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/trial';

router.get('/thelist',function(req, res){
MongoClient.connect(url, function(err,db){
    if(err){
      console.log('unable to connect', err);
    }else{
      console.log("connection established");
      var collection = db.collection('students');
      collection.find({}).toArray(function(err,result){
        if(err){
          res.send(err);
        }else if (result.length){
          res.render('student',{
            "studentlist":result
          });
        } else {
          res.send('no documents found');
        }
      db.close();
      });
    }

  });
});
router.get('/newstudent',function(req,res){
  res.render('newstudent',{title: 'add student'});
});
router.post('/addstudent', function(req, res){
 MongoClient.connect(url, function(err, db){
   if(err){
     console.log("unable to connect");
   }
   else{
     console.log('connected to the server')
     var collections = db.collection('students');
     var student1 = {student: req.body.student, street:req.body.street, city:req.body.city, state:req.body.state}
     collections.insert([student1],function(err, result){
       if(err){
         console.log(err);
       }else{
         res.redirect("/thelist")
       }
       db.close();
     });
   }
 });

});
module.exports = router;
