export default () => ({
    port: parseInt(process.env.PORT) | 3000,
    database: {
        db_host: process.env.DB_HOST,
        db_user: process.env.DB_USER,
        db_pass: process.env.DB_PASS,
        db_name: process.env.DB_NAME
    }
})