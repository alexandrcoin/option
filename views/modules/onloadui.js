// Sounds
var bottlePop = new buzz.sound( "/assets/ogg/pop.ogg");
var ircBloop = new buzz.sound( "/assets/ogg/ff.ogg");

var tr;
function bottlepop(tx, amount) {
  if (tx != tr) {
    bottlePop.play();
    showSuccess('<i class="fa fa-btc"></i>'+amount+' has been added to your account.', '', showSymbols) 
    tr = tx;
  }
}

// Trading
$(function() {
<<<<<<< HEAD
  var defaultsymbol = ['CADUSD'];
=======
  var defaultsymbol = ['BTCUSD'];
>>>>>>> 3f1d22f20fb15d79da6a1d320a42ea7ca697c1d3
  page('trade', defaultsymbol);

// $("[data-translate]").jqTranslate('trans',{defaultLang: 'es'});
$(".hook").on("mousedown",".reveal",function(e) {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'text'));
});
$(".hook").on("mouseup",".reveal",function(e) {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'password'));
});

var lastitem;
$(".globalheader").on("click",".keystones li a",function(e) {
  e.preventDefault();
  var symbol = [$(this).parent().attr('id')];
  if (lastitem != symbol) {
  page('trade',symbol);
  lastitem = symbol;
  }
});

var allopen = false;
$(".globalheader").on("click",".keystones .seeall",function(e) {
  e.preventDefault();
  if (allopen == false) {
  $('.linktray').css('height', '60px');
  $(this).css('bottom', '-12px').html('Less');
  allopen = true;
  } else if (allopen == true) {
    $('.linktray').css('height', '30px');
    $(this).css('bottom', '-3px').html('More');
    allopen = false;
  }
});

$(".hook").on("click",".keystonelink",function(e) {
  e.preventDefault();
  var symbol = [$(this).attr('id')];
  if (lastitem != symbol) {
  page('trade',symbol);
  lastitem = symbol;
  }
});

//console.log('loaded ui jquery');
  $(".right").on("keyup","#username",function(e) {
    if(e.keyCode == 13) {
      $('.loginbtn').html('Working');
      login();
    }
  });
  $(".right").on("keyup","#password",function(e) {
    if(e.keyCode == 13) {
      $('.loginbtn').html('Working');
      login();
    }
  });

  $(".right").on("click",".loginbtn",function(e) {
    login();
  });

  var showlogin = false;
  $(".right").on("click",".username",function(e) {
    if (showlogin == false) {
      showAccount();
      showlogin = true;
    } else {
      showSymbols();
      showlogin = false;
    }
  });
  var showfin = false;
  $(".right").on("click",".userbal",function(e) {
    page('deposit');
    //if (showfin == false) {
      showFinances();
      //showfin = true;
    //} else {
      //showSymbols();
      //showfin = false;
    //}
    
  });  $(".right").on("click",".username",function(e) {
    page('security');
    //if (showfin == false) {
      showSecurity();
      showAccount();
      //showfin = true;
    //} else {
      //showSymbols();
      //showfin = false;
    //}
    
  });

  function login () {
        var email = $("#email").val();
    var password = $("#password").val();
    if (email && password) {
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
  }
  }

    $(".hook").on("click",".applytrade",function(e) {
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
  $(".hook").on("change",".amountfield",function() {
    var symbol = $(this).parent().parent().parent().parent().attr('id');
    var offer = $('#'+symbol+' .info .details .rawoffer').html();
    var amount = $('#'+symbol+' .info .trader .amount .amountfield').val();
    var lastbal = 999;
    if (amount > 0) {
      if (amount < lastbal) {
        var possiblewin = (+amount+(amount*offer));
        $('#'+symbol+' .info .details h1').html("m฿" + possiblewin.toFixed(2));
      } else {
         $('#'+symbol+' .info .trader .amount .amountfield').val(lastbal);
      }
    } else { // keep amount above zero
      $('#'+symbol+' .info .trader .amount .amountfield').val(0);
      $('#'+symbol+' .info .details h1').html(offer * 100 + "%");
    }
  });  $(".hook").on("keyup",".amountfield",function() {
    var symbol = $(this).parent().parent().parent().parent().attr('id');
    var offer = $('#'+symbol+' .info .details .rawoffer').html();
    var amount = $('#'+symbol+' .info .trader .amount .amountfield').val();
    var lastbal = 999;
    if (amount > 0) {
      if (amount < lastbal) {
        var possiblewin = (+amount+(amount*offer));
        $('#'+symbol+' .info .details h1').html("m฿" + possiblewin.toFixed(2));
      } else {
         $('#'+symbol+' .info .trader .amount .amountfield').val(lastbal);
      }
    } else { // keep amount above zero
      //$('#'+symbol+' .info .trader .amount .amountfield').val(0);
      $('#'+symbol+' .info .details h1').html(offer * 100 + "%");
    }
  });
  $(".hook").on("click",".callbtn",function() {
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
  $(".hook").on("click",".putbtn",function() {

    var symbol = $(this).parent().parent().attr('id');
    $('.apply'+symbol).removeClass('btn-default').addClass('btn-warning');
    $('.put'+symbol).addClass('btn-danger').removeClass('btn-default');
    $('.call'+symbol).addClass('btn-default').removeClass('btn-success');
    uitradeico(symbol, 0, 1);
    $('#'+symbol+' .direction .action').html('Put');
    //$('.controls .price .lock').html('<span class="glyphicon glyphicon-lock"></span>');
    var direction = 'put';
  });


  $(".globalheader").on("click","#account",function() {
    page('account');
  });

  $(".globalheader").on("click","#deposit",function() {
    page('deposit');
  });    

  $(".globalheader").on("click","#security",function() {
    page('security');
  });  
  
  $(".globalheader").on("click","#prefs",function() {
    page('prefs');
  });  

  $(".globalheader").on("click","#withdrawl",function() {
    page('send');
  });  
  $(".globalheader").on("click","#history",function() {
    page('history');
  });   
  $(".globalheader").on("click","#referrals",function() {
    page('referrals');
  });  
  $(".hook").on("click","#terms",function() {
    page('terms');
  });
  $(".hook").on("click","#adminpage",function() {
    page('admin');
  });
// UI Stuff
// Animated header strip

  // $('.header').click(function(e) {
  //   //e.preventDefault();
  //   $(this).disableSelection();
  //   $(this).next().toggleClass('hideme');
  // });
$('.btnlogo').click(function() {
  showSymbols();
  page('trade', defaultsymbol);
});

    //showloginfield();
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

// onload
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
    hideAllPanels();next();
  },6500);
}
function showDanger(msg, xp, next) {
  hideAllPanels();
  $(".announcedanger").css('height', 30);
  $(".announcedanger .container ul li a").html(msg);
  $(".announcedanger .container span").html(xp);
  setTimeout(function(){
    hideAllPanels();next();
  },6500);
}


function showSplit(x, y, z, next) {
  hideAllPanels();
  $(".announcesplit").css('height', 30);

var total = x+y+z;
$(".announcesplit .x").css('width', (x/total)*100+'%');
if (((x/total)*100) > 10) { $(".announcesplit .x").html('Won for m฿ '+x); }
$(".announcesplit .y").css('width', (y/total)*100+'%').css('left', (x/total)*100+'%');
if (((y/total)*100) > 10) { $(".announcesplit .y").html('Pushed for m฿ '+y); }
$(".announcesplit .z").css('width', (z/total)*100+'%');
if (((z/total)*100) > 10) {  $(".announcesplit .z").html('Lost for m฿ '+z); }

    if (x>z) { $(".announcesplit .x").addClass('applyspotlight'); $(".announcesplit .z").removeClass('applyspotlight'); }
    if (x<z) { $(".announcesplit .z").addClass('applyspotlight'); $(".announcesplit .x").removeClass('applyspotlight'); }
    if (x==y || y>0) { $(".announcesplit .z").removeClass('applyspotlight'); $(".announcesplit .x").removeClass('applyspotlight'); }
    if (y>0) $(".announcesplit .y").addClass('applyspotlight');
    if (y==0) $(".announcesplit .y").removeClass('applyspotlight');
    setTimeout(function(){
      hideAllPanels();next();
    },5700);
}

function showXp(xp, next) {
  hideAllPanels();
  $(".announcexp").css('height', 30);
  $(".announcexp .y").css('width', 100+'%').html('You gained '+xp+'XP');
    setTimeout(function(){
      hideAllPanels();next();
    },2670);
}

function showSymbols() {
  hideAllPanels();
  $(".linktray").css('height', 30);
}
function showAccount() {
  hideAllPanels();
  $(".accounttray").css('height', 30);
}
function showFinances() {
  hideAllPanels();
$(".financestray").css('height', 30);
}
function uitradeico(symbol, direction, manual) {
  if (manual) { autocolor = 0; }
  if (direction == 0) {
       $(".icon"+symbol).removeClass('green').removeClass('glyphicon-arrow-up').addClass('red').addClass('glyphicon-arrow-down');
    } else {
        $(".icon"+symbol).removeClass('red').removeClass('glyphicon-arrow-down').addClass('green').addClass('glyphicon-arrow-up');
    }
}
