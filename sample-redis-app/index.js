const express = require("express");
const redis = require("redis");
const axios = require("axios");

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;
const redisURL = "redis://127.0.0.1:6379";

const client = redis.createClient(REDIS_PORT);

(async () => client.connect())();

client.on("connect", function () {
  console.log("Redis is ready");
});

client.on("error", function () {
  console.log("Error in Redis");
});

const app = express();

async function getProducts(req, res, next) {
  // Set data to Redis
  console.log("fetching..");
  const { data } = await axios.get("http://localhost:4500/api/products");

  client.set("products", JSON.stringify(data));

  res.send(data);
}

// Cache middleware
async function cache(req, res, next) {
  const data = await client.get("products");

  if (data !== null) {
    res.send(JSON.parse(data));
  } else {
    next();
  }
}

app.get("/api/products", cache, getProducts);

app.listen(5000, () => {
  console.log(`App listening on port ${PORT}`);
});
