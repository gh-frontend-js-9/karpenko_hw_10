const router = require('express').Router();
const path = require('path');
const lib = require('./lib');

router.get('/', (request,response) => {
    response.render(path.join('..', 'view', 'index.ejs'))
})

router.post('/api/calc', async (req, res) => {
    try {
        const data = {
            to: req.body.toCurrency,
            from: req.body.fromCurrency,
            amount: req.body.amount
        }
        if(lib.checkValidity(data)){
            let send_data = await lib.convert(data.from, data.to, data.amount)
            res.send({message: send_data.toString()})
        }else{
            res.send({error: "No valid data"})
        }
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router;