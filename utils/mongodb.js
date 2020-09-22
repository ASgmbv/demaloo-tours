import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

if (!uri) {
  throw new Error(
    "Please define the MONDODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment vairable inside .env.local"
  );
}

export async function connectToDatabase() {
  console.log("cached db:", cachedDb);
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  console.log("connected to database");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
