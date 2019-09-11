const MongoClient = require('mongodb').MongoClient;

const uriDB1 = "mongodb+srv://nacd:nacd@cluster0-fnrzs.mongodb.net/test?retryWrites=true&w=majority";
const clientDB1 = new MongoClient(uriDB1, {useNewUrlParser: true, useUnifiedTopology: true});

const uriDB2 = "mongodb+srv://happy_person:happy_person@cluster0-jgqno.mongodb.net/test?retryWrites=true&w=majority";
const clientDB2 = new MongoClient(uriDB2, {useNewUrlParser: true, useUnifiedTopology: true});

clientDB1.connect(async () => {
  const collectionName = "quizzes";
  const dbName1 = "test";
  const dbName2 = "test";
  const collection = await clientDB1.db(dbName1).collection(collectionName).find({}).toArray();
  collectionData = Array.from(collection)

  clientDB2.connect(async () => {
    const collectionNewDB = await clientDB2.db(dbName2).collection(collectionName).find({}).toArray();

    if (collectionNewDB) { await clientDB2.db(dbName2).collection(collectionName).deleteMany() }

    await clientDB2.db(dbName2).collection(collectionName).insertMany(collectionData);
    console.log('DB was changed');
  })
});