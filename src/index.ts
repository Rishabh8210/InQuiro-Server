import express from 'express'
import bodyParser from 'body-parser'
import {PORT, SYNC} from './config/server-config'
import v1ApiRoutes from './routes/index'
import sequelize from './config/database-config'
import './models/associations'

function setupAndStartServer(){
    const app = express();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/api', v1ApiRoutes);
    app.listen(PORT,async() => {
        if(SYNC){
            await sequelize.sync({alter: true});
        }
        console.log(`Server is running at PORT ${PORT}`);
    })
}

setupAndStartServer();