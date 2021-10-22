const express = require('express')
const app = express()
const port = process.env.PORT || 7000;


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://mydbuser1:Avfyo1v7UkVrpm2s@cluster0.om5y9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object

    console.log('hitting the database');
    const user = { name: "Shipu", gender: 'male' };
    collection.insertOne(user)
        .then(() => {
            console.log('insert success')
        })
    //   client.close();
});


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log('listening from port ', port);
})