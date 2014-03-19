$(document).ready( function () {

  var blah = $('#name');
  var blahShadow = $('#shadow');
  var x = 0, y = 0, z = 0, overSwitch = false;

  blah.text("AHHHHHH").css({'':''});
  //blahShadow.text("AHHHHHH").css({'top':'+=50', 'left':'+=50'});
  
  var intID = setInterval(function () {

    TweenLite.fromTo('#name', 3,{
      'right':'200px', 
      'bottom':'200px',
      'rotationY':'0deg',
      'rotationX':"0deg",
      'rotationZ':'0deg'
    }, {
      'right':'0px', 
      'bottom':'0px',
      'rotationY':'720deg',
      'rotationX':"720deg",
      'rotationZ':'100deg', 
      ease: Bounce.easeInOut
    });
  }, 4000);

  $('#box').focus();

  $('#box').on('keydown', function(e){
    e.preventDefault();

    switch(e.which){
    case 37: //left
      //blah.animate( {'left':'-=10'}, 0);
      y -= 9;
      rotate(blah, x, y, z);
      rotate(blahShadow, x, y, z);
      moveOver(blahShadow, y);
      break;
    case 38: //up
      //blah.animate( {'top':'-=10'}, 0);
      x -= 9;
      rotate(blah, x, y, z);
      rotate(blahShadow, x, y, z);
      moveOver(blahShadow, x);
      break;
    case 39: //right
      //blah.animate( {'left':'+=10'}, 0);
      y += 9;
      rotate(blah, x, y, z);
      rotate(blahShadow, x, y, z);
      moveOver(blahShadow, y);
      break;
    case 40: //down
      //blah.animate( {'top':'+=10'}, 0);
      x += 9;
      rotate(blah, x, y, z);
      rotate(blahShadow, x, y, z);
      moveOver(blahShadow, x);
      break;
    case 32: //space
      z += 9;
      rotate(blah, x, y, z);
      rotate(blahShadow, x, y, z);
      break;
    }

    blah.css({'color':'#'+(Math.random()*0xFFFFFF<<0).toString(16)});
  });

  function rotate (thing, xPos, yPos, zPos) {
    thing.css({
      'transform': 'rotateY(' + yPos + 'deg) rotateX(' + xPos + 'deg) rotateZ(' + zPos + 'deg)'
    });
  }
  
  function moveOver (thing, pos) {
    if (pos % 90 === 0 && pos % 180 !== 0) {
      overSwitch = !overSwitch;
      thing.css({
        'z-index':overSwitch ? '1' : '-1',
        'text-shadow':overSwitch ? 'none' : '0px 0px 30px #888888'
      });
    }
  }
  
});