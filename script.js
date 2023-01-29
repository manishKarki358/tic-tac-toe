const cellElements=document.querySelectorAll('[data-cell]')
const board=document.querySelector('#board')
const mainWinningMsg=document.querySelector('#winning-msg')
const winningMsg=document.querySelector('[data-winning-msg-text]')
const restartBtn=document.querySelector('#restart')

let turn
const question=document.querySelector('.question')
const chooseX=document.querySelector('.xcl')
const chooseC=document.querySelector('.ccl')
chooseX.addEventListener('click',()=>{
board.style.display="grid"
question.style.display="none"
turn=false
})
chooseC.addEventListener('click',()=>{
    board.style.display="grid"
    question.style.display="none"
    turn=true
    })


const winningConditions=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [2,4,6],
    [1,4,7],
    [2,5,8],
    [6,7,8],
    [3,4,5],
]
const xClass='x'
const circleClass='circle'


startGame()
function startGame(){
   

    cellElements.forEach(cell=>{
        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
    
    })
    setHover()
    mainWinningMsg.classList.remove('show')
}
// {once:true} is used to make sure each one is only clicked 1 time}
function handleClick(e){
    const cell=e.target
    const currentClass=turn ?circleClass:xClass
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
console.log('winner');
endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    swapTurns()
    setHover()
}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass) 
    })
}
function endGame(draw){
    if(draw){
winningMsg.innerText="Draw!"
    }
    else{
        winningMsg.innerText=`${turn ?"O's":"X's"} Wins`
    }
    mainWinningMsg.classList.add('show')
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    turn=!turn
}
function setHover(){
    board.classList.remove(xClass)
    board.classList.remove(circleClass)
    if(turn){
        board.classList.add(circleClass)

    }
    else{
        board.classList.add(xClass)
    }

}
function checkWin(currentClass){
    return winningConditions.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
        
    })
}
restartBtn.addEventListener('click',startGame)