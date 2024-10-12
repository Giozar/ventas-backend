import app from './app/app'
import { port } from './config/index';

app.listen(port);

console.log('Corriendo en el puerto', port);