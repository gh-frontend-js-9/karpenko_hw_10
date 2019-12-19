const router = require('express').Router();
const path = require('path');
const lib = require('./lib');

router.get('/', (request,response) => {
    response.render(path.join('..', 'view', 'index.ejs'))
})

router.post('/api/calc', async (req, res) => {
    const data = {
        to: req.body.toCurrency,
        from: req.body.fromCurrency,
        amount: req.body.amount
    }
    try {
        let send_data = await lib.convert(data.from, data.to, data.amount)
        if(!lib.getExchangeRate(data.from, data.to)){
            res.status(400).send({message: "Cannot get exchange rate<br>Invalid currency code"}).end()
        }else{
            res.status(200).send({message: send_data.toString()}).end()
        }
    } catch (error) {
        res.send({error: "Cannot get exhange rate"}).end()
    }
})

module.exports = router;