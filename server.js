const express = require("express");
const app = express();
const fetch = require("node-fetch");
const p = require("./pokemon.json");
const pokes = [];
Object.keys(p).forEach((e) => {
  pokes.push(p[e]);
});

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/f", (req, res) => {
  res.redirect(
    "https://pokemonrevolution.net/forum/"
  );
});

app.get("/spots3", (req, res) => {
  let f3 = require("./spots3.json");
  res.json(f3);
});


app.get("/locs", (req, res) => {
  let f3 = require("./loc.json");
  res.json(f3);
});

app.get("/headbutt", (req, res) => {
  let f3 = require("./headbutt.json");
  res.json(f3);
});

app.get("/digspot", (req, res) => {
  let f3 = require("./dig.json");
  res.json(f3);
});



app.get("/lspawns", async (req, res) => {
  let data = await fetch(
    "https://pokemonrevolution.net/spawns/land_spawns.json"
  );
  data = await data.json();
  let data2 = await fetch(
    "https://pokemonrevolution.net/spawns/surf_spawns.json"
  );
  data2 = await data2.json();
  res.json([...data, ...data2]);
});


let ff = require("./redirect.json");
app.get("/p", (req, res) => {
  console.log(ff);
  res.send(ff.map(e => `<head><meta charset="utf-8"/><title>PRO Map - List of Redirects</title><meta name="theme-color" content="#00adb5" /><meta content="List of all redirects." property="og:description"/></head><a href="${e.url}">/p/${e.name}</a>`).join("<br>"));
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Listening on PORT: " + listener.address().port);
});
