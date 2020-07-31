const {createServer} = require('http');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//imports de los endpoints
const especialidades = require('./routes/especialidades.js');
const profesores = require('./routes/profesores.js');
const comite = require('./routes/comites.js');
const consejos = require('./routes/consejos.js');
const instituciones = require('./routes/instituciones.js');
const propuestas = require('./routes/propuestas.js');
const tesistas = require('./routes/tesistas.js');
const trabajos_grado = require('./routes/trabajos_grado.js');

//guardar credenciales de la bd
const pool = require('./db')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

//puerto donde va a correr el back (si esta en produccion correra en port y si no correra en localhost5000)
const normalizePort = port => parseInt(port,10)
const PORT = normalizePort(process.env.PORT || 3000)
const app = express()
const dev = app.get('env') !== 'production'

app.use(cors())
app.use(express.json())

if(!dev){
    app.use(compression())
    app.use(morgan('common'))
    app.use(express.static(path.resolve(__dirname,'dist')))
}else{
    app.use(morgan('dev'))
}

//Uso de los endpoints
app.use(profesores);
app.use(especialidades);
app.use(comite);
app.use(consejos);
app.use(instituciones);
app.use(propuestas);
app.use(trabajos_grado);
app.use(tesistas);

const server = createServer(app);

server.listen(PORT, err => {
    if(err) throw err
    console.log('Servidor iniciado en localhost:',PORT);
})