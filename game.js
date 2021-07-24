var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];

var started=false;
var level=0;


function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)

    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    
}

$('body').keypress((event)=>{
    if(!started){
        $("#level-title").text('Level '+level)
        nextSequence();
        started=true;
    }
})
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
};

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success")
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }else{
        console.log('wrong')
        playSound("wrong")
        $('body').addClass('game-over')                

        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        $('#level-title').text("Game Over,Press Any Key to Restart");
        startOver()
    }
   

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed")
    }, 100);
    console.log("mohnish")
  }


$(".btn").on("click",function(){
    var userChosenColor=this.id;
    // var userChosenColor=$(this).attr("id")
    userClickedPattern.push(userChosenColor)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)

    
  });



  
