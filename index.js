const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
    res.send('hello')
})


const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.uzz7izn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(403).send('unauthorized')
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_NEW, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'accesss forbidden' })
        }
        req.decoded = decoded;
        next()
    })
}

async function run() {
    try {
        const resellProductCollections = client.db('resellProducts').collection('resellProductCollection');
        const usersCollections = client.db('resellProducts').collection('usersCollection');
        

        app.get('/products', async (req, res) => {
            const query = {}
            const result = await resellProductCollections.find(query).toArray();
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollections.find(query).toArray();
            res.send(result)
        })


        // app.get('/products1', verifyJWT, async (req, res) => {
        //     const email = req.query.email;
        //     const decodedEmail = req.decoded.email;
        //     if (email !== decodedEmail) {
        //         return res.status(403).send({ message: 'unauthorised action' })
        //     }
        //     const query = { email: email }
        //     const result = await resellProductCollections.find(query).toArray();
        //     res.send(result)
        // })

        // app.get('/myOrders', verifyJWT, async (req, res) => {
        //     const email = req.query.email;
        //     const decodedEmail = req.decoded.email;
        //     if (email !== decodedEmail) {
        //         return res.status(403).send({ message: 'unauthorised action' })
        //     }
        //     const query = { userEmail: email }
        //     const result = await bookedProductsCollections.find(query).toArray();
        //     res.send(result)
        // })


        // app.get('/products2/:id', async (req, res) => {
        //     const name = req.params.id;
        //     const query = { 'data.selectCategory': name }
        //     const result = await resellProductCollections.find(query).toArray();
        //     res.send(result)
        // })

        // app.post('/products', async (req, res) => {
        //     const product = req.body;
        //     const result = await resellProductCollections.insertOne(product);
        //     res.send(result)
        // })

        // app.post('/users', async (req, res) => {
        //     const user = req.body;
        //     const result = await usersCollections.insertOne(user);
        //     res.send(result)
        // })

        // app.post('/bookedProducts', async (req, res) => {
        //     const bookedProducts = req.body;
        //     const result = await bookedProductsCollections.insertOne(bookedProducts);
        //     res.send(result)
        // })

        // app.delete('/products/:id',verifyJWT, async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const result = await resellProductCollections.deleteOne(filter)
        //     res.send(result)
        // })


        // app.delete('/users/:id', verifyJWT, verifyAdmin, async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const result = await usersCollections.deleteOne(filter)
        //     res.send(result)
        // })

        // app.get('/orders/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const result = await bookedProductsCollections.findOne(filter)
        //     res.send(result)
        // })


        // app.put('/products/:id',verifyJWT, async (req, res) => {
        //     const decodedEmail = req.decoded.email;
        //     const query = { email: decodedEmail }
        //     const user = await usersCollections.findOne(query)
        //     if (user?.role !== 'Seller') {
        //         return res.status(403).send({ message: 'forbidden' })
        //     }
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) }
        //     const options = { upsert: true }
        //     const updatedDoc = {
        //         $set: {
        //             status: 'advertised'
        //         }
        //     }
        //     const result = await resellProductCollections.updateOne(filter, updatedDoc, options)
        //     res.send(result)
        // })


        // app.get('/users/seller/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email }
        //     const user = await usersCollections.findOne(query)
        //     res.send({ isSeller: user?.role === 'Seller' })
        // })

        // app.get('/users/admin/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email }
        //     const user = await usersCollections.findOne(query)
        //     res.send({ isAdmin: user?.role === 'admin' })
        // })

        // app.get('/jwt', async (req, res) => {
        //     const email = req.query.email;
        //     const query = { email: email }
        //     const user = await usersCollections.findOne(query);
        //     if (user) {
        //         const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_NEW)
        //         return res.send({ newAccessToken: token })
        //     }
        //     res.status(403).send({ newAccessToken: '' })

        // })
    }
    finally {

    }
}
run().catch(console.log)


app.listen(port, () => {
    console.log(`'hello '${port}`)
})