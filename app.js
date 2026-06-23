const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://tu-frontend.onrender.com"
    ]
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});