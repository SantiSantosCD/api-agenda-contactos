const express = require('express');
const app = express();

app.use(express.json());

// Endpoint para registrar contactos
app.post('/contactos', (req, res) => {
    const { dni, nombre, apellidos, email, telefono } = req.body;

    // Validación básica
    if (!dni || !nombre || !apellidos || !email || !telefono) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Aquí iría la lógica para guardar el contacto en una base de datos
    // Por ahora solo respondemos con el contacto recibido
    res.status(201).json({
        mensaje: 'Contacto registrado exitosamente.',
        contacto: { dni, nombre, apellidos, email, telefono }
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
