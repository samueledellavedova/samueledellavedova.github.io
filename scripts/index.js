const splash = $('#splash');

const startbutton = $('#startbutton')
const startmenu = $('#startmenu');

const icons = $('.icons');
const selection = $('#selection');
var firstX, firstY, down = false;

const notHoveringButtons = () => {
  return !startbutton.is(':hover');
}
const notHoveringIcons = () => {
  return $('.icons.focus:hover').length === 0;
}

function boot() {
  const message = 'Welcome to my Odd World...';
  const callback = () => setTimeout(() => splash.fadeOut(1000), 500);
  
  write('#splashmessage', message, 0, 105, callback)
}

function write(target, message, index, interval, callback) {   
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(() => write(target, message, index, interval, callback), interval);
  } else {
    if (callback && typeof callback === 'function') callback();
  }
}

// Handle start-button click

startbutton.on('click', function() {
  return alert('Ooops! I\'m sorry, the website\'s currently under construction :)');
  startmenu.toggleClass('open');
});

// Handle single, double and right clicks on icons

icons.on('click', function() {
  icons.removeClass('focus').removeClass('border');
  $(this).addClass('focus').addClass('border');

}).on('dblclick', function() {
  return alert('Ooops! I\'m sorry, the website\'s currently under construction :)');

}).on('contextmenu', function() {
  return alert('Ooops! I\'m sorry, the website\'s currently under construction :)');
});

// Pressing in any part of the screen (that's not over a button) will remove all hover effects and will hide start menu

$(document).on('click', function() {
  if (notHoveringIcons()) icons.removeClass('focus');

  if (notHoveringButtons() && startmenu.hasClass('open')) startmenu.removeClass('open');
});

$(document).mousedown(function(e) {
  selection.remove();
  down = true;
  firstX = e.clientX;
  firstY = e.clientY;
}).mousemove(function(e) {
  if (down) {
    $('body').append("<div id='selection'></div>");
    selection.css('top',e.clientY+'px');
    selection.css('left',e.clientX+'px');
    var diffX = e.clientX-firstX,
        diffY = e.clientY-firstY;
    if (diffY<=0) {
      selection.css('top',e.clientY+'px');
    } else {
      selection.css('top',firstY+'px');
    }
    if (diffX<=0) {
      selection.css('left',e.clientX+'px');
    } else {
      selection.css('left',firstX+'px');
    }
    selection.css('width',Math.abs(diffX)+'px');
    selection.css('height',Math.abs(diffY)+'px');
    $('.icons').removeClass('focus border');
    selection.overlaps('.icons').addClass('focus border');
  } else {
    selection.remove();
  }
}).mouseup(function() {
  selection.remove();
  down = false;
})