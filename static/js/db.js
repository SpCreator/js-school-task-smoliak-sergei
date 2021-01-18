const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://admin:q1w2e3@games.kqsr6.mongodb.net";
const client = new MongoClient(url);

module.exports = async () => {
    await client.connect();
    return client.db("cubes");
}