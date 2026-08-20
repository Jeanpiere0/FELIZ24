const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/FELIZ24.html");
});

app.post("/visita", (req, res) => {

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
        req.socket.remoteAddress;

    const visita = {
        ip: ip,
        fecha: new Date().toLocaleString("es-PE"),
        navegador: req.body.navegador || "Desconocido",
        idioma: req.body.idioma || "Desconocido",
        pantalla: req.body.pantalla || "Desconocida",
        zonaHoraria: req.body.zonaHoraria || "Desconocida"
    };

    console.log("\n===== NUEVA VISITA =====");
    console.log(visita);

    fs.appendFileSync(
        "visitas.txt",
        JSON.stringify(visita) + "\n"
    );

    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
