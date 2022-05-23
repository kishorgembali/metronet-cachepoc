const express = require("express");
const products = require("./data");

const app = express();

const delay = (time) => new Promise((res) => setTimeout(res, time));

app.get("/api/products", async (req, res) => {
  await delay(5000);
  res.send(products);
});

app.listen(4500, () => console.log("app running on 4500"));
