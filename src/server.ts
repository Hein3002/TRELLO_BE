import app from './app';
import { config } from './config/config';

app.set('port', config.port);
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${config.port}`);
});