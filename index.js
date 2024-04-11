const { MongoClient } = require("mongodb");
const uri =
    'mongodb+srv://iidasavimaki:GzgtED9jvEKEozzI@cluster0.od4s470.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri);

async function run() {
    try {
      await client.connect();
      const database = client.db('movies');
      const movies = database.collection('movies');
      // Query for a movie that has the title 'Back to the Future'
      const query = { title: 'Inception' };
      const movie = await movies.findOne(query);
      console.log(movie);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);