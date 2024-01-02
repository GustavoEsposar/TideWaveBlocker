import express from "express";
import fetch from "node-fetch";
import cors from "cors"; // Importe o pacote cors

const app = express();
const port = 3000; // Porta da sua API local

app.use(cors()); // Use o middleware do cors

app.use(express.json());

app.post("/checkurl", async (req, res) => {
  const url = "https://checkurl.phishtank.com/checkurl/";
  res.header("Access-Control-Allow-Private-Network", "true");
  try {
    const requestData = {
      url: req.body.url,
      format: "json",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "phishtank/Tidewave",
      },
      body: new URLSearchParams(requestData).toString(),
    });
    console.log(response);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro na requisição" });
  }
});

app.listen(port, () => {
  console.log(`API local rodando na porta ${port}`);
});
