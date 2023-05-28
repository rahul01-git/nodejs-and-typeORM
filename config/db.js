const typeorm = require("typeorm")
const EntitySchema = typeorm.EntitySchema;
const dotenv = require("dotenv");
dotenv.config();

const createConnection = async () =>{
    try{
        const conn = await typeorm.createConnection({
            type: 'postgres',
            host: process.env.HOST,
            port: process.env.PORT,
            username: process.env.USER,
            password: process.env.PASS,
            database: process.env.DATABASE,
            synchronize: true,
            entities: [new EntitySchema(require("../Entity/todo.json"))]
        })
        console.log("db connected")
        return conn;
    }catch(error){
        console.log(error);
    }
}

module.exports = createConnection