// Récupération de la liste des devises de base
const baseCurrencySelect = document.querySelector('#from')
// Récupération de la liste des devises converties
const convertedCurrencySelect = document.querySelector('#to') 
//Récupérer le multiplicateur
const exchangeRate = document.querySelector('.multiplicateur')
//Multiplicateur de base
let exchangeRateValue = 1

// Fonction pour mettre à jour l'URL complète
function updateExchangeRateURL() {
    // Récupération des valeurs et des textes des options sélectionnées
    const baseCurrencyText = baseCurrencySelect.options[baseCurrencySelect.selectedIndex].text
    const convertedCurrencyText = convertedCurrencySelect.options[convertedCurrencySelect.selectedIndex].text
    
    // Génération de l'URL complète avec les valeurs sélectionnées
    const EXCHANGE_RATE_URL = `https://v6.exchangerate-api.com/v6/7dbbc298278440e39aa48772/pair/${baseCurrencyText}/${convertedCurrencyText}`
    
    //Fonction asynchrone pour fetch le bon multiplicateur
    async function fetchExchangeRate() {
        try {
            const response = await fetch(EXCHANGE_RATE_URL)
            const data = await response.json()
            
            exchangeRateValue = data.conversion_rate

            // Mettre à jour l'affichage du multiplicateur
            exchangeRate.textContent = `x ${exchangeRateValue}`
            
        } catch (error) {
            console.error(`Error fetching the exchange rate: ${error}`)
        }
    }

    fetchExchangeRate()
    
}



// Ajout des gestionnaires d'événements 'change' pour détecter le changement dans les deux <select>
baseCurrencySelect.addEventListener('change', updateExchangeRateURL)
convertedCurrencySelect.addEventListener('change', updateExchangeRateURL)



const inputCurrencyValue = document.querySelector('#montant')
const outputCurrencyValue = document.querySelector('#resultat')
const updateArrow = document.querySelector('#fleche')

updateArrow.addEventListener('click',() => {


    updateExchangeRateURL()
    convertCurrency()
    inputCurrencyValue=0

})

function convertCurrency() {

    const convertedValue = (inputCurrencyValue.value * exchangeRateValue).toFixed(2)

    outputCurrencyValue.textContent = convertedValue
}

inputCurrencyValue.addEventListener('input', convertCurrency)

