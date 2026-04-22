// Endpoint para adicionar saldo (simulação)
app.post('/adicionar', async (req, res) => {
  const { asset, amount } = req.body;

  // Aqui você pode registrar em banco de dados ou apenas simular
  res.json({ sucesso: true, mensagem: `Saldo de ${amount} ${asset} adicionado ao YA_QRCODE.` });
});
