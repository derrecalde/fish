/*Defering loading :: https://varvy.com/pagespeed/defer-images.html */
/*  How it work :
  * src = the real src is a base 64 fake
  * the real src is data-src 
  * example : <img src="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="my/url/myfile.jpg">
  */ 
function initDeferImg() {
    var imgDefer = document.getElementsByTagName('img');
    for (var start=0; start<imgDefer.length; start++) {
    (function(i){
      if(imgDefer[i].getAttribute('data-src')) {
        imgDefer[i].setAttribute('src',imgDefer[i].getAttribute('data-src'))
        //visual effects
        window.setTimeout(function(){
          requestAnimationFrame(()=>{
            //imgDefer[i].style.opacity = 100
            //imgDefer[i].style.transform = 'translate(0,0%)'
            imgDefer[i].classList.add('img-appeared')
          })
        }, 200 * i)
      }
    })(start)
  }
}
window.onload = initDeferImg;

/*CHIFOUMI*/
let getCoputerChoice = ()=>{
  return Choices[Math.floor(Math.random() * 3)]
}

var Choices = ['Rock','Paper','Scissors'] // Set the choices
var UserChoice = Choices[2] //Set a default user choice
var computerChoice = getCoputerChoice()
var sessions = 0
var userScore = 0
var computerScore = 0

//Listen on piscto elements & launch the game
let clicables = document.querySelector('.container--clicables-pictos').childNodes;
//Listen foreach child
clicables.forEach(element => {
  element.onclick = function(){
    //Get value of data-value attribute
    UserChoice = Choices[this.getAttribute('data-value')] //rewrite a User choice
    //console.log(determineWinner())
    showResultAnimation(determineWinner(),this,computerChoice)
    console.log('Sessions : ' + sessions)
    console.log('Score : You = ' + userScore + ' Computer = ' + computerScore )
  }
})

let determineWinner = ()=>{
   console.log('User : ' + UserChoice)
   console.log('Comp : ' + computerChoice)
  sessions++
  

  if(UserChoice === computerChoice){
    return 'Try again!'
  }else{
    
    if(UserChoice === Choices[0]){
      if(computerChoice === Choices[1]){
        computerScore++
        return 'Computer Win!'
      }else{
        userScore++
        return 'You win!'
      }
    }
    
    if(UserChoice === Choices[1]){
      if(computerChoice === Choices[2]){
        computerScore++
        return 'Computer Win!'
      }else{
        userScore++
        return 'You win!'
      }
    }
    
    if(UserChoice === Choices[2]){
      if(computerChoice === Choices[0]){
        computerScore++
        return 'Computer Win!'
      }else{
        userScore++
        return 'You win!'
      }
    }
    
  }
}

let showResultAnimation = (result,objUser,nameComputerChoice)=>{  
  //Initailize all elmts with class "img-animation--fail"
  document.querySelectorAll('.img-appeared').forEach(element => {
    element.classList.remove('img-appeared')
    element.classList.add('img-animation--fail')
  })
  // Show the User and computer choice
  objUser.classList.add('img-animation--success')
  document.getElementsByName(nameComputerChoice)[0].classList.add('img-animation--success')

  //Show the result
  document.querySelector('.container--result').append(result)
}

//Restart 
document.getElementById('restart').onclick =  function(){
  document.querySelectorAll('.container--clicables-pictos img').forEach(element => {
    element.classList.remove('img-appeared')
    element.classList.remove('img-animation--fail')
    element.classList.remove('img-animation--success')
  })
  //empty result
  document.querySelector('.container--result').innerHTML = ""
  computerChoice = getCoputerChoice()
  initDeferImg();
}