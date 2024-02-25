const express= require('express');
const app=new express();
const cors= require('cors');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

app.use(cors());
app.use(bodyParser.json());

let Student=require("./student.model");


mongoose.connect("mongodb+srv://swetha27112003:1jT4y9bHXmmz4MvB@cluster0.ncchaxz.mongodb.net/stduentdata?retryWrites=true&w=majority&appName=Cluster0");
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB.connection established succesfully");
});


app.get("/", (req,res)=>{
    console.log("request received");
    res.json("Hello, world!");
});

app.get("/hello", (req,res)=>{
    console.log("hello request received");
    res.json("welcome all");
});
app.get("/people", (req,res)=>{
    console.log("people received");
    res.json([{name:"swetha",role:"student"},{name:"midhun",role:"instructor"}])
});


app.get("/students", async(req,res)=>{
    console.log("students received");
    let data=await Student.find()
    .catch(err=>{
        res.json("Error loading data");

    });
    res.json(data);
    // res.json([{name:"swetha",age:"20",department:"IT"},{name:"khadeeja",age:"21",department:"IT"},{name:"shriya",age:"22",department:"IT"}]);
});

app.get("/students/:id",async(req,res)=>{
let id=req.params.id;
let data=await Student.findById(id).catch(err=>{
    res.json("Error finding person");
});
if(!data){
    req.json("Not found");
}else{
    res.json(data);
}
});


app.delete("/students/:id",async(req,res)=>{
    let id=req.params.id;
    await Student.findByIdAndDelete (id)
    .then(()=>{
        res.json("Data Removed successfully");
    })
    .catch(err=>{
        res.json("failed to delete");
    });
});
    

app.post("/students", (req,res)=>{
    console.log(req.body);
    let student =new Student( req.body);
    student.save()
    .then(()=>{
        res.json("saved successfully");
    }).catch(err=>{
            res.json("Error:"+err);
        });
    });

app.put("/students/:id",(req,res)=>{
    let id=req.params.id;
    Student.findByIdAndUpdate (id),req.body
    .then(()=>{
        req.json("Details updated successfully");
    }).catch(()=>{
        req.json("error updaying the details");
    });
});


app.listen("4000",()=>{
console.log("started server on 4000");
});
