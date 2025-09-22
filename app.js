const express = require('express');
const app = express();
const PORT = 3000;

// Datos de ejemplo de contactos
const contactos = [
  {
    DNI: '12345678A',
    Nombre: 'Juan',
    Apellidos: 'Pérez García',
    Email: 'juan.perez@example.com',
    Telefono: '600123456'
  },
  {
    DNI: '87654321B',
    Nombre: 'Ana',
    Apellidos: 'López Martínez',
    Email: 'ana.lopez@example.com',
    Telefono: '600654321'
  }
];

// Middleware para parsear JSON (opcional si luego agregas POST/PUT)
app.use(express.json());

// End-point para listar contactos
app.get('/contactos', (req, res) => {
  res.json(contactos);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
