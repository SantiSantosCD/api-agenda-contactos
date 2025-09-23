const express = require('express');
const app = express();
const PORT = 3000;

// Datos de ejemplo de contactos
let contactos = [
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

app.use(express.json());

// End-point para listar contactos
app.get('/contactos', (req, res) => {
  res.json(contactos);
});

// End-point para registrar contactos
app.post('/contactos', (req, res) => {
  const { DNI, Nombre, Apellidos, Email, Telefono } = req.body;

  if (!DNI || !Nombre || !Apellidos || !Email || !Telefono) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Verificar si el contacto ya existe
  const existe = contactos.find(c => c.DNI === DNI);
  if (existe) {
    return res.status(409).json({ error: 'El contacto ya existe.' });
  }

  const nuevoContacto = { DNI, Nombre, Apellidos, Email, Telefono };
  contactos.push(nuevoContacto);

  res.status(201).json({
    mensaje: 'Contacto registrado exitosamente.',
    contacto: nuevoContacto
  });
});

// End-point para actualizar un contacto
app.put('/contactos/:dni', (req, res) => {
  const { dni } = req.params;
  const { Nombre, Apellidos, Email, Telefono } = req.body;

  const contacto = contactos.find(c => c.DNI === dni);

  if (!contacto) {
    return res.status(404).json({ error: 'Contacto no encontrado.' });
  }

  if (!Nombre || !Apellidos || !Email || !Telefono) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  contacto.Nombre = Nombre;
  contacto.Apellidos = Apellidos;
  contacto.Email = Email;
  contacto.Telefono = Telefono;

  res.json({
    mensaje: 'Contacto actualizado exitosamente.',
    contacto
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
