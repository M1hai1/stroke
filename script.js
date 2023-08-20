let wrapper = document.querySelector('.wrapper')
let red = document.querySelector('.red')
let appWidth = document.documentElement.clientWidth
let appHeight = document.documentElement.clientHeight


function smoothEnd(element) {
    element.classList.add('smooth-end')
}
function smoothStart(element) {
    element.classList.add('smooth-start')
}
function removeChosen() {
    document.querySelectorAll('.chosen').forEach((item) => {
        setTimeout(() => {
            item.classList.remove('chosen')
        }, 500)
    })
}
let step = 0

let topCor = [
    appWidth / 100 * 22,
    appWidth / 100 * 32,
    appWidth / 100 * 42,
]
let leftCor = [
    appWidth / 100 * 23,
    appWidth / 100 * 33,
    appWidth / 100 * 43,
    appWidth / 100 * 53,
    appWidth / 100 * 63,
]
let back = [
    `./images/informed.png` ,
    `./images/gradient.png` ,
    `./images/book.png` ,
    `./images/magic.png` ,
    `./images/surprised.png` ,
    `./images/zalip.png` ,
]

let stroke1 = ['informed', 'zalip', 'zalip', 'magic', 'surprised']
let stroke2 = ['zalip', 'gradient', 'gradient', 'gradient', 'book']
let stroke3 = ['informed', 'surprised', 'magic', 'zalip', 'book']

function renderStroke1(arr) {
    arr.forEach((item, index) => {
        let div = document.createElement('div')
        div.classList.add('item')
        div.style.backgroundImage = `url(./images/${item}.png)`
        div.setAttribute('number', index+1)
        div.setAttribute('data-item', item)
        div.setAttribute('stroke', arr === stroke1 ? 1 : arr === stroke2 ? 2 : 3)
        div.style.top = (arr === stroke1 ? topCor[0] : arr === stroke2 ? topCor[1] : topCor[2]) + 'px'
        div.style.left = leftCor[index] + 'px'
        wrapper.prepend(div)
    })
}
renderStroke1(stroke1)
renderStroke1(stroke2)
renderStroke1(stroke3)

function moveItems() {
    let stroke = currentStroke[0]
    let data = currentData[0]
    let numbers = []
    document.querySelectorAll('.item').forEach((item) => {
        let itemStroke = item.getAttribute('stroke')
        let itemData = item.getAttribute('data-item')
        if (itemStroke === stroke && itemData === data) {
            smoothEnd(item)
            setTimeout(() => {
                item.remove()
            }, 500);
            left = item.getBoundingClientRect().left
            numbers.push(item.getAttribute('number'))
        }
    })
    numbers.reverse()

    document.querySelectorAll('.item').forEach((item) => {
        if (+item.getAttribute('stroke') === (stroke - 1) && item.getAttribute('number') === numbers[0]) {
            item.style.top = topCor[1] + 'px'
            item.setAttribute('stroke', stroke)
        } else if (+item.getAttribute('stroke') === (stroke - 1) && item.getAttribute('number') === numbers[1]) {
            item.style.top = topCor[1] + 'px'
            item.setAttribute('stroke', stroke)
        } else if (+item.getAttribute('stroke') === (stroke - 1) && item.getAttribute('number') === numbers[2]) {
            item.style.top = topCor[1] + 'px'
            item.setAttribute('stroke', stroke)
        }
    })

    setTimeout(() => {
        document.querySelectorAll('.item').forEach((item) => {
            if (+item.getAttribute('stroke') === 1) {
                item.remove()
            }
        })
        come(stroke)

    }, 1000)
}
function come(stroke) {
    if (step === 0 && +stroke === 2) {
        console.log('условие 1')
        stroke1 = ['informed', 'book', 'surprised', 'surprised', 'surprised']
        step++
    } else if (step === 1 && +stroke === 2) {
        console.log('условие 1')
        console.log('work')
        stroke1 = ['magic', 'book', 'surprised', 'surprised', 'surprised']
        step++
    } else if (step === 1 && +stroke === 1) {
        console.log('условие 1')
        console.log('work')
        stroke1 = ['informed', 'book', 'book', 'book', 'magic']
        step++
    } else if (step == 2 && +stroke === 2) {
        stroke1 = ['magic', 'book', 'book', 'book', 'magic']
    }
    renderStroke1(stroke1)
}

function checkStroke() {
    return (currentStroke[0] === currentStroke[1] && currentStroke[1] === currentStroke[2] && currentStroke[0] === currentStroke[2]) 
}
function checkData() {
    return (currentData[0] === currentData[1] && currentData[1] === currentData[2] && currentData[0] === currentData[2]) 
}

function checkForMatch() {
    if (checkData() && checkStroke()) {
        moveItems()
    }

    currentStroke = []
    currentData = []
}

let currentData = []
let currentStroke = []
let i = 0

function checkIsItem(item) {
    let data = item.getAttribute('data-item')
    let stroke = item.getAttribute('stroke')
    if (!item.classList.contains('chosen')) {
        item.classList.add('chosen')
        currentData.push(data)
        currentStroke.push(stroke)
        i++
    }
    if (i === 3) {
        checkForMatch()
        removeChosen()
        i = 0
    }
}

window.addEventListener('click', e => {
    if (e.target.classList.contains('item')) {
        checkIsItem(e.target)
    }
})