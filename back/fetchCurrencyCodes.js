const baseCurrencySelector = document.querySelector('#from')
const convertedCurrencySelector = document.querySelector('#to')

const API_KEY = 'a5b63e062e991e08f20dad74'
const URL_CURRENCY_CODES = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`

//Async function to fetch all currency codes
async function fetchCurrencyCodes() {
    try {
        const response = await fetch(URL_CURRENCY_CODES)
        const data = await response.json()
        //Extract only currency codes
        const currencies = data.supported_codes.map(currency => currency[0])
        return currencies

    } catch (error) {
        console.error(`Error fetching currencies: ${error}`)
    }
}

async function displayCurrencyDropdown() {
    const currencyCodes = await fetchCurrencyCodes()

    if (Array.isArray(currencyCodes) && currencyCodes.length > 0) {
        currencyCodes.forEach(currency => {
            let option = document.createElement('option')
            option.text = currency
            option.value = currency
            option.setAttribute('data-flag', currency.substring(0, 2).toLowerCase()) 
            baseCurrencySelector.appendChild(option)
        })
        currencyCodes.forEach(currency => {
            let option = document.createElement('option')
            option.text = currency
            option.value = currency
            option.setAttribute('data-flag', currency.substring(0, 2).toLowerCase()) 
            convertedCurrencySelector.appendChild(option)
        })
    } else {
        console.error("No currency codes available to populate dropdown.")
    }
}

displayCurrencyDropdown()