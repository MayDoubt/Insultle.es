
let insultle;
const getWord = () => {
    $.ajax({
        url: '/php/askDayInsult.php',
        type: 'GET',
        success: function (response) {
            insultle = response;
        }
    })
}

getWord();

const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

console.log(insultle)

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'Ñ',
    'ENTER',
    'Z',
    'X',    
    'C',
    'V',
    'B',
    'N',
    'M',
    '«'
]

const guessRows = [
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','','']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow,guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    //Cambiar con insultle.length
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key =>{
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (key) => {
    console.log('clicked', key)
    if (key === '«') {
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    /*Comprueba la palabra */
    if (key === 'ENTER') { 
        checkRow()
        console.log('guessRows', guessRows)
    }
    else if (key != 'ENTER'){
        addLetter(key)
        console.log('guessRows', guessRows)
    }
}

const addLetter = (key) => {
    if (currentTile < insultle.length && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = key
        guessRows[currentRow][currentTile] = key
        tile.setAttribute('data', key)
        currentTile++
    } 
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    if (currentTile === insultle.length) {
        //check diccionario
        //if(no existe en el diccionario)
        //showMessage('Esa palabra no existe fierah');
        //else
        console.log('guess is ' + guess, 'insultle is ' + insultle)
        flipTile()
        if (insultle == guess) {
            showMessage('Ere un crack!')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('Lo siento hermano')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    rowTiles.forEach((tile, index) => {
        const dataLetter = tile.getAttribute('data')

        setTimeout(() => {
            tile.classList.add('flip')
            if (dataLetter == insultle[index]) {
                tile.classList.add('green-overlay')
                addColorToKey(dataLetter, 'green-overlay')
            } else if (insultle.includes(dataLetter)) {
                tile.classList.add('yellow-overlay')
                addColorToKey(dataLetter, 'yellow-overlay')
            } else {
                tile.classList.add('grey-overlay')
                addColorToKey(dataLetter, 'grey-overlay')
            }
        }, 500 * index) 
    })
}
