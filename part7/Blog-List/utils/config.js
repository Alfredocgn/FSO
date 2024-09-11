require('dotenv').config()

const PORT = process.env.PORT
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_USER = process.env.MONGO_USER
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.wvrfzwd.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0`;
const MONGO_TEST_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.wvrfzwd.mongodb.net/testBlogs?retryWrites=true&w=majority`;

module.exports = {
  MONGO_PASS,
  MONGO_USER,
  PORT,
  MONGO_URL,
  MONGO_TEST_URL
}