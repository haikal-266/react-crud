import sequelize from 'sequelize';

const db = new sequelize('react_crud', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

export default db;
