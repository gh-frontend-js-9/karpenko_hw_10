const axios = require('axios');
const config = require('./config');

const lib = {}

lib.getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const responce = await axios.get(`http://data.fixer.io/api/latest?access_key=${config.fixerio.apiKey}&format=1`);
        const rate = responce.data.rates;
        const euro = 1/ rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];
    
        return exchangeRate;
    } catch (error) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`)
    }
}

lib.getCountries = async (currencyCode) => {
    try {
        const responce = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return responce.data[0].name;
    } catch (error) {
        throw new Error(`Unable to get country name from ${currencyCode}`)
    }
}

lib.convert = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await lib.getExchangeRate(fromCurrency, toCurrency);
    const countries = await lib.getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.` + 
            `You can spend these in the following countries: ${countries}`;
}

lib.run = (fromCurrency, toCurrency, amount) => {
    lib.convert(fromCurrency, toCurrency, 20)
    .then(message => {
        console.log(message)
    })
    .catch(err => {
        console.log(err.message)
    })
}
// lib.run('UAR', 'USD', 23);