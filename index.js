const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://mashrafiahnam:IOwrG4DoOlIGCD3G@cluster0.yhuz2xd.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {





    const userCollection = client.db("Hii").collection('users');
    const conversation = client.db("Hii").collection('conversation');






    app.get('/users', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result);
    })



    app.post('/users', async (req, res) => {
      console.log('done')
      const user = req.body;
      console.log('new user', user);
      const result = await userCollection.insertOne(user);

      res.send(result);
    });


    // Storing message............
    app.get('/conversation', async (req, res) => {
      const allConversation = conversation.find()
      const result = await allConversation.toArray();
      res.send(result);
    })


    app.post('/sendMessage', async (req, res) => {
      const message = req.body;
      const result = await conversation.insertOne(message);
      res.send(result);
    });





    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('shafin,,,your server is running...')
})

app.listen(port, () => {
  console.log(`${port}`)
})