import { MongoClient } from "mongodb";

const uri = "mongodb+srv://GPAdmin:GPAdmin@cluster0.lh5aqoy.mongodb.net/"; // Replace with your MongoDB connection URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectToDatabase() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db("Products"); // Replace with your database name
}
