const express = require("express");
const fetch = require("node-fetch");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const API_KEY = process.env.BINANCE_API_KEY;
const SECRET_KEY = process.env.BINANCE_SECRET_KEY;
const BASE_URL = "https://api.binance.com";

function signQuery(queryString) {
  return crypto.createHmac("sha256", SECRET_KEY).update(queryString).digest("hex");
}

app.get("/api/saldo", async (req, res) => {
  const timestamp = Date.now();
  const queryString = `timestamp=${timestamp}`;
  const signature = signQuery(queryString);

  const url = `${BASE_URL}/api/v3/account?${queryString}&signature=${signature}`;
  const response = await fetch(url, { headers: { "X-MBX-APIKEY": API_KEY } });
  const data = await response.json();
  res.json({ BTC: data.balances.find(b => b.asset === "BTC").free, ETH: data.balances.find(b => b.asset === "ETH").free });
});

app.post("/api/comprarBTC", async (req, res) => {
  const timestamp = Date.now();
  const queryString = `symbol=BTCUSDT&side=BUY&type=MARKET&quantity=0.001&timestamp=${timestamp}`;
  const signature = signQuery(queryString);

  const url = `${BASE_URL}/api/v3/order?${queryString}&signature=${signature}`;
  const response = await fetch(url, { method: "POST", headers: { "X-MBX-APIKEY": API_KEY } });
  const data = await response.json();
  res.json(data);
});

app.post("/api/retirarBTC", async (req, res) => {
  const timestamp = Date.now();
  const queryString = `coin=BTC&address=SEU_ENDERECO&amount=0.001&timestamp=${timestamp}`;
  const signature = signQuery(queryString);

  const url = `${BASE_URL}/sapi/v1/capital/withdraw/apply?${queryString}&signature=${signature}`;
  const response = await fetch(url, { method: "POST", headers: { "X-MBX-APIKEY": API_KEY } });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
