import express from 'express'
import userRouter from '../routers/UserRouter';
import salesRouter from '../routers/SalesRouter';
import productRouter from '../routers/ProductRouter';

const app = express();
// Middleware para habilitar CORS
app.use((req, res, next) => {
    // Permitir solicitudes desde cualquier origen (cambia esto según tus necesidades)
    res.header('Access-Control-Allow-Origin', '*');
    
    // Especifica los métodos HTTP permitidos
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    // Especifica las cabeceras permitidas en la solicitud
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Permitir solicitudes preflight OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    next();
});

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', salesRouter);
app.use('/api', productRouter);

export default app;