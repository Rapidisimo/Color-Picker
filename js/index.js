const colorPicker = document.querySelector('input[type="color"]'); //color input element
let colorValue = (colorPicker.value).substring(1); //color currently selected with # removed
const selectScheme = document.getElementById('schemes'); //color scheme dropdown element
let schemeValue = selectScheme.value; //color scheme currently selected
const colorSchemes = document.querySelector('.color-schemes'); //color columns
const footer = document.querySelector('footer'); //area where hex value is visible


//update colorValue when the color picker is used
colorPicker.addEventListener('input', (e) => {
    colorScheme(colorValue, schemeValue) //run function to update color palette
})

//update schemeValue when another scheme is selected
selectScheme.addEventListener('input', (e) => {
    schemeValue = e.target.value;
    colorScheme(colorValue, schemeValue) //run function to update color palette
})

function colorScheme() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorValue}&mode=${schemeValue}&count=5`)
    .then( response => response.json() )
    .then( data => {
        colorSchemes.innerHTML = ''; //reset color scheme selection
        footer.innerHTML = ''; //reset hex text
        data.colors.map( function(colorText) {
            //Give me color bars!
            colorSchemes.innerHTML += `
                <div class="color-column" style="background-color: ${colorText.hex.value}"></div>
            `;
            //color bar hex value
            footer.innerHTML += `
                <div class="hex-value"><h3>${colorText.hex.value}</h3></div>
            `;
        })
    })
}


colorScheme()