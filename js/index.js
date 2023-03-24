const colorPicker = document.querySelector('input[type="color"]'); //color input element
let colorValue = (colorPicker.value).substring(1); //color currently selected with # removed
const selectScheme = document.getElementById('schemes'); //color scheme dropdown element
let schemeValue = selectScheme.value; //color scheme currently selected
const colorSchemes = document.querySelector('.color-schemes'); //color columns
const footer = document.querySelector('footer'); //area where hex value is visible


//update colorValue when the color picker is used
colorPicker.addEventListener('input', (e) => {
    colorValue = (e.target.value).substring(1);
    colorScheme(colorValue, schemeValue) //run function to update color palette
})

//update schemeValue when another scheme is selected
selectScheme.addEventListener('input', (e) => {
    schemeValue = e.target.value;
    colorScheme(colorValue, schemeValue) //run function to update color palette
})

//copy color in column
colorSchemes.addEventListener('click', (e) => {
    const clickedColumn = e.target.style["background-color"]
    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    columnColor = rgb2hex(clickedColumn);
    copyColor(columnColor);
    //rgb2hex source: https://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
})

//copy color in hex text
footer.addEventListener('click', (e) => {
    const hexText = (e.target.innerText).toLowerCase();
    copyColor(hexText);
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

//copy color to clipboard
function copyColor(colorData) {
        navigator.clipboard.writeText(colorData).then(
            () => {
                console.log(`Copied: ${colorData}`)    
            }, () => {
                console.log('Copy Failed')
            }
        )
    
}


colorScheme()