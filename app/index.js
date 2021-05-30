const express = require('express')
const rp = require('request-promise');
const cors = require('cors')
const app = express()
const port = 3000


// requisição da api
const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
    qs: {
        'start': '1',
        'limit': '5000',
    },
    headers: {
       // 'X-CMC_PRO_API_KEY': 'sua chave api vem aqui'
    },
    json: true,
    gzip: true
};

app.use(cors())

// rota 1 para servidor devolve os dados básicos 
app.get('/', (req, res) => {
    
    rp(requestOptions).then(response => {
        console.log(response)
        res.send(response)
    }).catch((err) => {
        console.log('API call error:', err.message);
    })
    
})


// rota 2 para requisição traz mais dados
app.get('/id:id', (req, res) => {

    let id = req.params.id

    const requestOptions = {
        method: 'GET',
        uri: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${id}`,
        headers: {
           // 'X-CMC_PRO_API_KEY': 'sua chave api vem aqui'
        },
        json: true,
        gzip: true
    };
    rp(requestOptions).then(response => {
        console.log(id)
        console.log(response)
        res.send(response)
    }).catch((err) => {
        console.log('API call error:', err.message);
    })
})

app.listen(port, () => {
    console.log('server ok')
})