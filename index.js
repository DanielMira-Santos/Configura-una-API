const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Simulación de base de datos en memoria
let usuarios = [
    { id: 1, nombre: 'Daniel' },
    { id: 2, nombre: 'Ernesto' },
    { id: 3, nombre: 'Santos' }
];

// Rutas CRUD básicas

// Obtener todos los usuarios (GET)
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Obtener un usuario por ID (GET)
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('Usuario no encontrado');
    res.json(usuario);
});

// Crear un nuevo usuario (POST)
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Actualizar un usuario existente (PUT)
app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.status(404).send('Usuario no encontrado');

    usuario.nombre = req.body.nombre;
    res.json(usuario);
});

// Eliminar un usuario (DELETE)
app.delete('/usuarios/:id', (req, res) => {
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado');

    const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
    res.json(usuarioEliminado);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
});
