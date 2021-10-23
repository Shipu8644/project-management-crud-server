const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 7000;

//middleware
app.use(cors());
app.use(express.json());
// user: mydbuser1
// password: Avfyo1v7UkVrpm2s

const uri = "mongodb+srv://mydbuser1:Avfyo1v7UkVrpm2s@cluster0.om5y9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("ProductStore");
        const productsCollection = database.collection("products");

        // get Api
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        })


        // Post Api
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await productsCollection.insertOne(newProduct);
            console.log(result);
            res.json(result);
        })

        //delete Api
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            console.log(result);
            res.json(result);
        })

        //Update Api
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await productsCollection.findOne(query);
            res.json(result);
        })

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updatedUser = req.body;
            const options = { upsert: true };
            console.log(updatedUser.name);
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    price: updatedUser.price,
                    quantity: updatedUser.quantity
                },
            };

            const result = await productsCollection.updateOne(filter, updateDoc, options);
            console.log(result);
            res.json(result);
        })

    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log('listening from port ', port);
})