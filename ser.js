// Configuração Binance
const apiKey = "SUA_API_KEY";
const apiSecret = "SUA_API_SECRET";

// Exemplo de saque via Binance API
async function sacarBinance(asset, amount, address) {
  const timestamp = Date.now();
  const queryString = `asset=${asset}&amount=${amount}&address=${address}&timestamp=${timestamp}`;

  // Assinatura HMAC SHA256
  const signature = CryptoJS.HmacSHA256(queryString, apiSecret).toString();

  const response = await fetch("https://api.binance.com/sapi/v1/capital/withdraw/apply", {
    method: "POST",
    headers: {
      "X-MBX-APIKEY": apiKey,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: queryString + `&signature=${signature}`
  });

  const data = await response.json();
  if (data.id) {
    alert(`Saque solicitado com sucesso. ID: ${data.id}`);
  } else {
    alert("Erro ao solicitar saque: " + JSON.stringify(data));
  }
}
