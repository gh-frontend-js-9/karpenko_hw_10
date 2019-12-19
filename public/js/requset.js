function checkOnlyLetterField(dom_element){
    dom_element.onkeypress = (e) => {
        console.log(e.keyCode || e.charCode)
        e = e || window.event
        if(e.charCode && (e.charCode > 47 && e.charCode < 58)){
            console.log(e.charCode)
            console.log(e.charCode && (e.charCode > 47 && e.charCode < 57))
            return false
        }
    }
}

checkOnlyLetterField(document.querySelector("#toCurrency"))
checkOnlyLetterField(document.querySelector("#fromCurrency"))

document.querySelector("button").addEventListener("click", async (e) => {
    e.preventDefault(); // cancel page reload
    let field = document.querySelector(".resoult__field")
    let data = {
        toCurrency: document.querySelector("#toCurrency").value,
        fromCurrency: document.querySelector("#fromCurrency").value,
        amount: document.querySelector("#amount").value
    }
    if(data.toCurrency == data.toCurrency.toUpperCase() && data.fromCurrency == data.fromCurrency.toUpperCase()
    && data.amount == Math.abs(data.amount)){
        try {
            const response = await fetch('/api/calc', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
            const resoult = await response.json();
            const value = Object.values(resoult)
            document.querySelector(".resoult__field").innerHTML = value
        } catch (error) {
            document.querySelector(".resoult__field").innerHTML = "Cannot get exchange rete.<br>Invalid currency code"
        }
    }else{
        field.innerHTML = "Number must be positive number or currency code must be uppercase"
    }
})