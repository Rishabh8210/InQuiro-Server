import express from 'express'
import config from './config/server-config'
import sequelize from './config/db-config'
import v1ApiRoutes from './routes/index'
import bodyParser from 'body-parser'
async function setupAndStartServer(){
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));
    console.log(sequelize.Sequelize);
    app.listen(config.PORT, async() => {

        await sequelize.sync();
        
        app.use('/api', v1ApiRoutes);
        console.log(`Server is running at PORT ${config.PORT}`);
    })
}
setupAndStartServer();