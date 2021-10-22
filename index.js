const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
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
            console.log('got the product', req.body);
            console.log('added product', result);
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