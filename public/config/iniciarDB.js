

// db
const {MongoClient, ServerApiVersion}= require('mongodb');

const uri = "mongodb+srv://leo87llanca:27870717leo@cluster0.m5xre3g.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("myDB").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);
//variables de la db
const dbName= 'myDB'
const database = client.db(dbName);


module.exports= database