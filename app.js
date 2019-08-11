var express = require('express')
var proxy = require('http-proxy-middleware')
var app = express()
const serverConfig  = require('./config/serverConfig')


for(var i = 0; i < serverConfig.routes.length;i++){
    //console.log(serverConfig.routes[i].route)
    app.use("/api"+serverConfig.routes[i].route,
        proxy({
            target: serverConfig.routes[i].address,
            changeOrigin: true,
            pathRewrite: (path, req) => {
                console.log(path)
                var x = path.split('/').slice(3).join('/')
                return path.split('/').slice(3).join('/');
                
            }
        })
    );
}

app.listen(8080, () => {
    console.log('Proxy listening on port 80');
});