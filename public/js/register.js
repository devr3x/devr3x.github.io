document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Usuario registrado exitosamente') {
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error durante el registro');
    });
});
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear un nuevo usuario con rol de 'user' por defecto
        const newUser = new User({ 
            username, 
            password: hashedPassword, 
            role: 'user'  // El rol por defecto es 'user'
        });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro de usuario' });
    }
});
