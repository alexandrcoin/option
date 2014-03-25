

// Trading
$(function() {


  $('.loginbtn').click(function() {
    var email = $("#email").val();
    var password = $("#password").val();
        console.log(email);
    var url = encodeURIComponent("/login/" + email + "/" + password);
    $.ajax({
      url: url,
      cache: false
    }).done(function( html ) {
      if (html == "Too many requests.") {
        $('.loginbtn').removeClass('btn-warning').addClass('btn-danger').html(html);
      } else if (html == "Invalid username or password."){
        $('.loginbtn').removeClass('btn-success').addClass('btn-warning').html('Try again');
      } else if (html == "OK") {
        $('.loginbtn').removeClass('btn-warning').addClass('btn-success').html('Logged in');
        setTimeout(function(){location.reload()},1000);
      }
    });
  });

    $(".applytrade").click(function(e) {
          var symbol = $(this).parent().parent().attr('id');
          var direction = $('#'+symbol+' .info .direction .action').html();
          var amount = Number($('#'+symbol+' .info .amount .amountfield').val());
          console.log('New trade:' + user +':'+ symbol +':'+ amount +':'+ direction)
          amount = amount.toFixed(2);
          //user = userid;
          socket.emit('trade', {
            symbol : symbol,
            amount : amount,
            direction : direction,
            user : user
          });
        });
  $( ".amountfield" ).change(function() {
    var symbol = $(this).parent().parent().parent().parent().attr('id');
    var offer = $('#'+symbol+' .info .details .rawoffer').html();
    var amount = $('#'+symbol+' .info .trader .amount .amountfield').val();
    if (amount > 0) {
      if (amount <= lastbal) {
        var possiblewin = (+amount+(amount*offer));
        $('#'+symbol+' .info .details h1').html("m฿" + possiblewin.toFixed(2));
      } else {
         $('#'+symbol+' .info .trader .amount .amountfield').val(lastbal);
      }
    } else { // keep amount above zero
      $('#'+symbol+' .info .trader .amount .amountfield').val(0);
      $('#'+symbol+' .info .details h1').html(offer * 100 + "%");
    }
  });
  $(".callbtn").click(function() {
    console.log('callbtn');
    var symbol = $(this).parent().parent().attr('id');
    $('.apply'+symbol).removeClass('btn-default').addClass('btn-warning');
    $('.put'+symbol).removeClass('btn-danger').addClass('btn-default');
    $('.call'+symbol).removeClass('btn-default').addClass('btn-success');
    uitradeico(symbol, 1, 1);
    $('#'+symbol+' .direction .action').html('Call');
    //$('.controls .price .lock').html('<span class="glyphicon glyphicon-lock"></span>');
    var autocolor = 0;
    var direction = 'call';
  });
  $(".putbtn").click(function() {
    var symbol = $(this).parent().parent().attr('id');
    $('.apply'+symbol).removeClass('btn-default').addClass('btn-warning');
    $('.put'+symbol).addClass('btn-danger').removeClass('btn-default');
    $('.call'+symbol).addClass('btn-default').removeClass('btn-success');
    uitradeico(symbol, 0, 1);
    $('#'+symbol+' .direction .action').html('Put');
    //$('.controls .price .lock').html('<span class="glyphicon glyphicon-lock"></span>');
    var direction = 'put';
  });

});
$(function() {

// UI Stuff
// Animated header strip

  // $('.header').click(function(e) {
  //   //e.preventDefault();
  //   $(this).disableSelection();
  //   $(this).next().toggleClass('hideme');
  // });


    showloginfield();
    $('.info .details h1').html(0.75*100+'%');

// Proto chat

    $('#chattext').keyup(function(event) {
      if(event.keyCode == 13) {
       if ($chatInput.val()) {
        //event.preventDefault();
        chat($chatInput.val());
        $chatInput.val('');
       }
      }
    });

    $('#messages form').submit(function (event) {
      //event.preventDefault();
      message(users[target], $messagesInput.val());
      $messagesInput.val('');
    });


//Uncaught ReferenceError: $users is not defined 
    // $users.on('click', 'li', function (event) {
    //   var $user = $(this);
    //   target = $user.index();
    //   $users.find('li').removeClass('selected');
    //   $user.addClass('selected');
    // });
console.log('loaded ui jquery');

});

// Ui functions

function isOdd(num) { return num % 2;}


function hideAllPanels() {
  $(".financestray").css('height', '0px');
  $(".accounttray").css('height', '0px');    
  $(".announcesuccess").css('height', '0px');
  $(".announcedanger").css('height', '0px');
  $(".announcesplit").css('height', '0px');
  $(".announcexp").css('height', '0px');
  $(".linktray").css('height', '0px');
}

function showSuccess(msg, xp, next) {
  hideAllPanels();
  $(".announcesuccess").css('height', 30);
  $(".announcesuccess .container ul li a").html(msg);
  $(".announcesuccess .container span").html(xp);
  setTimeout(function(){
    next();
  },3500);
}
function showDanger(msg, xp, next) {
  hideAllPanels();
  $(".announcedanger").css('height', 30);
  $(".announcedanger .container ul li a").html(msg);
  $(".announcedanger .container span").html(xp);
  setTimeout(function(){
    next();
  },3500);
}

function showSplit(x, y, z, next) {
  hideAllPanels();
  $(".announcesplit").css('height', 30);

var total = x+y+z;
$(".announcesplit .x").css('width', (x/total)*100+'%').html('Won m฿ '+x);
$(".announcesplit .y").css('width', (y/total)*100+'%').css('left', (x/total)*100+'%').html('Pushed m฿ '+y);
$(".announcesplit .z").css('width', (z/total)*100+'%').html(z+' m฿ Lost');

    if (x>z) { $(".announcesplit .x").addClass('applyspotlight'); $(".announcesplit .z").removeClass('applyspotlight'); }
    if (x<z) { $(".announcesplit .z").addClass('applyspotlight'); $(".announcesplit .x").removeClass('applyspotlight'); }
    if (x==y || y>0) { $(".announcesplit .z").removeClass('applyspotlight'); $(".announcesplit .x").removeClass('applyspotlight'); }
    if (y>0) $(".announcesplit .y").addClass('applyspotlight');
    if (y==0) $(".announcesplit .y").removeClass('applyspotlight');
    setTimeout(function(){
      next();
    },5700);
}

function showXp(xp, next) {
  hideAllPanels();
  $(".announcexp").css('height', 30);
  $(".announcexp .y").css('width', 100+'%').html('You gained '+xp+'XP');
    setTimeout(function(){
      next();
    },2670);
}

function showSymbols() {
  hideAllPanels();
  $(".linktray").css('height', 30);
}
function showAccount() {
  //hideAllPanels();
  //$(".accounttray").css('height', 30);
  console.log('show accound func');

}
function showFinances() {
  hideAllPanels();
$(".financestray").css('height', 30);
}
