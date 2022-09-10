function rearrange(resolu)
{
  if(resolu.matches)
  {
    if(h1txt) $("h1").html("+Simon Game+<br>Touch screen to Start");
    document.addEventListener("click",start);
  }
  else
  {
    if (h1txt) $("h1").html("+Simon Game+<br>Press A Key to Start");
    document.addEventListener("keypress",start);
    document.removeEventListener("click",start);
  }
}

function start()
{
  lvl=0;okrun=true;h1txt=false;
  document.removeEventListener("click",start);
  document.removeEventListener("keypress",start);
  if(i==0)
  {
    new Audio("sound/start.wav").play();
    document.querySelector("h1").classList.add("start");
    setTimeout(function() {document.querySelector("h1").classList.remove("start");},300);
    if (!restartxt)
    {
      document.querySelector(".replaytxt").classList.add("start");
      $(".replaytxt").remove();
      restartxt=true;
    }
    setTimeout(function() {nextSequence();},200);
  }
  initialbtn();
  i++;
}

function nextSequence()
{
  if(okrun)
  {
    $("#level-title").text("Level "+(++lvl));
    var randomColor=color[Math.floor(4*Math.random())];
    map.push(randomColor);
    setTimeout(function()
    {
      $("#"+randomColor).animate({opacity: 0.2},100);
      new Audio("sound/"+randomColor+".mp3").play();
      setTimeout(function() {$("#"+randomColor).animate({opacity: 1},100);},200);
    },1500);
  }
  return 0;
}

function initialbtn()
{
  $(".btn").css("cursor","pointer");
  $(".btn").on("click",function ()
  {
    var colorName=this.getAttribute("id");
    userMap.push(colorName);
    new Audio("sound/"+colorName+".mp3").play();
    this.classList.add("pressed");
    setTimeout(function() {document.querySelector("#"+colorName).classList.remove("pressed");},100);
    checkTurn(m++);
  });
  return 0;
}

function checkTurn(k)
{
  if(userMap[k]!=map[k])
  {
    j=0;m=0;okrun=false;
    $(".btn").off("click");
    document.querySelector("body").classList.add("game-over");
    new Audio("sound/wrong.mp3").play();
    $("#level-title").html("Game-over !<br>Score: lvl "+lvl);
    if(restartxt)
    {
      $("#level-title").after("<span class='replaytxt'>(please wait 3s)</span>");
      restartxt=false;
      time=2;
      let counts=setInterval(function()
      {
        $(".replaytxt").remove();
        $("#level-title").after("<span class='replaytxt'>(please wait "+time+"s)</span>");
        if((time--)<0)
        {
          clearInterval(counts);
          i=0;
          document.addEventListener("click",start);
          document.addEventListener("keypress",start);
          $(".replaytxt").remove();
          $("#level-title").after("<span class='replaytxt'>Press any key/Touch screen<br>to replay</span>");
        }
      },1000);
    }
    setTimeout(function() {document.querySelector("body").classList.remove("game-over");},100);
    userMap=[];map=[];
    return 0;
  }
  else
  {
    j++;
    if(j==map.length)
    {
      j=0;m=0;
      userMap=[];
      setTimeout(function() {new Audio("sound/lvlup.mp3").play();document.querySelector("h1").classList.add("shine");},500);
      setTimeout(function() {document.querySelector("h1").classList.remove("shine");},1000);
      setTimeout(function(){nextSequence();},700);
      return 0;
    }
  }
}

function showNote()
{
  noteon=true;
  document.querySelector("#note").classList.add("note-expand");
  setTimeout(function()
  {
    document.querySelector(".notetxt").style.fontSize="15px";
    document.querySelector(".notetxt").style.padding="0 20px 0 12px";
  }, 10);
}

function hideNote()
{
  noteon=false;
  document.querySelector(".notetxt").style.fontSize="0px";
  document.querySelector(".notetxt").style.padding="0px";
  setTimeout(function() {document.querySelector("#note").classList.remove("note-expand");}, 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var color=["red", "blue", "green", "yellow"];
var map=[],userMap=[];
var i=0,j=0,m=0,lvl=0,okrun=true,restartxt=true,h1txt=true,time;

var resolu=window.matchMedia("(max-width: 670px)");
rearrange(resolu); // Call listener function at run time
resolu.addListener(rearrange); // Attach listener function on state changes

document.addEventListener("keypress",start);
document.querySelector("#note").addEventListener("mouseenter",showNote);
document.querySelector("#note").addEventListener("mouseleave",hideNote);
