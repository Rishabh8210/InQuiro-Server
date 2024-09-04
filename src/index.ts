import express from 'express'
import config from './configs/server-config'
async function setupAndStartServer(){
    const app = express()
    app.listen(config.PORT, () => {
        console.log(`Server is running at PORT ${config.PORT}`);
    })
}
setupAndStartServer();