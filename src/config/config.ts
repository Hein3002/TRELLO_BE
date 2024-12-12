require('dotenv').config();

export const config = {
    port: process.env.PORT || 3000,
    limit_size: process.env.LIMIT_SIZE || 3145728,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'da_4',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'I am the best OK!',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
};