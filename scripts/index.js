let firstX, firstY, down = false;

// Boot Text Animation

function boot() {
  const message = 'Welcome to my Odd World...';
  const callback = () => setTimeout(() => $('#splash').fadeOut(1000), 500);
  
  if ($('#mobile-msg').is(':visible'))
    write('#mobile-msg', 'I\'m sorry but mobile version is currently disabled :(', 0, 75)
  else
    write('#splashmessage', message, 0, 105, callback)

  $('#bg-audio')
    .prop('volume', 0.05)
    //.trigger('play')
}

// Write Letter Per Letter Between Specified Interval

function write(target, message, index, interval, callback) {  
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(() => write(target, message, index, interval, callback), interval);
  } else {
    if (callback && typeof callback === 'function') callback();
  }
}

// Get Top Z Index Between Opened Windows

function getTopZIndex() {
  const allDivs = $('.window');
  let topZindex = 0;

  allDivs.each(function() {
    const currentZindex = parseInt($(this).css('z-index'));
    if (currentZindex > topZindex) topZindex = currentZindex;
  });
  return topZindex;
}

// Show Window

function openWindow(id) {
  $(`#${id}`).fadeIn(250);
  $(`#${id}`).css('z-index', getTopZIndex() + 1);

  removeFocus();

  $(`#dock-${id}`).addClass('button-on');
  $(`#dock-${id}`).removeClass('button-off');
}

// Set Icon

jQuery.fn.setIcon = function() {
  if (this.data('icon')) this.css('background-image', `url(${this.data('icon')})`);
}

// Dynamically Generate Program Windows

function createProgram(id, title, img, url) {
  $('#startbutton').after(`<span class="program button-on" id="dock-${id}">${title}</span>`);
  $(`#dock-${id}`).css('background-image', `url('${img}')`);

  const content = `
    <div class="window ui-widget" id="${id}">
      <div class="window-inner">
        <div class="window-header">
          <img class="window-header-icon" src="${img}" />
          <p>${title}</p>
          <div class="window-icon close"></div>
          <div class="window-icon maximise"></div>
          <div class="window-icon minimise"></div>
        </div>
        <div class="window-content" id="${id}-content">
          <iframe width="100%" height="100%" src="${url}" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;

  $('#desktop').after(content);

  $('.window')
    .draggable({
      handle: '.window-header',
      cursor: 'grabbing',
      containment: 'window',
      stack: '.window'

    }).resizable({
      handles: 'e, s, se', // 'n, e, s, w, ne, se, sw, nw'
      minHeight: 500,
      minWidth: 800

    }).css({
      position: 'absolute',
      'margin-left': -$('.window').outerWidth() / 2 + 'px',
      'margin-top': -$('.window').outerHeight() / 2 + 'px'

    });

  openWindow(id);
}

// Check If Window Is Maximised

function isWindowMaximised(id) {
  return $(`#${id}`).outerWidth() >= $(window).width();
}

// Check If Window Is Open

function isWindowOpen(id) {
  return $(`#dock-${id}`).length > 0;
}

// Close Program

function closeProgram(id) {
  $(`#dock-${id}`).fadeOut(250);
  $(`#${id}`).fadeOut(250);
}

// Maximise Window

function maximiseWindow(id) {
  const target = $(`#${id}`);
  const original = {
    margin: target.css('margin'),
    left: target.position().left,
    top: target.position().top,
    width: target.width(),
    height: target.height()
  };

  target
    .draggable('disable')
    .resizable('disable')
    .data('margin', original.margin)
    .data('top', original.top)
    .data('left', original.left)
    .data('width', original.width)
    .data('height', original.height)
    .animate({
      margin: 0,
      top: 0,
      left: 0,
      width: $(window).width(),
      height: $(window).height() - 38,
    }, 500);
};

// Unmaximise Window

function unMaximiseWindow(id) {
  const target = $(`#${id}`);

  target
    .draggable('enable')
    .resizable('enable')
    .animate({
      margin: target.data('margin'),
      top: target.data('top'),
      left: target.data('left'),
      width: target.data('width'),
      height: target.data('height')
    }, 500);
}

// Remove Focus From Windows

function removeFocus() {
  $('.window').each(function() {
    const targetId = $(this).attr('id');

    $(`#dock-${targetId}`).removeClass('button-on');
    $(`#dock-${targetId}`).addClass('button-off');
  });
}

// Return If Cursor Is Hovering A Button

function notHoveringButtons() {
  return !$('#startbutton').is(':hover');
}

// Return If Cursor Is Hovering A Desktop Icon

function notHoveringIcons() {
  return $('.icons.focus:hover').length === 0;
}

// When Page Is Loaded

$(document).ready(function() {

  $('#startbutton').on('click', function(e) { // Start button click
    $(this).toggleClass('button-on');
    $('#startmenu').toggle('slide', { direction: 'down' });
  });

  $('#desktop').on('click', function(e) { // Click on desktop
    $('#startbutton').removeClass('button-on');
    $('#startmenu').hide('slide', { direction: 'down' });

    removeFocus();
  });

  $('.icons').on('click', function(e) { // Single Icon Click
    $('.icons').removeClass('focus').removeClass('border');
    $(this).addClass('focus').addClass('border');
  });
    
  $('.icons.launch').on('dblclick', function(e) { // Double Click On Icons
    const target = $(this).data('launch');
    const title = $(this).data('title');
    const img = $(this).data('icon');
    const url = $(this).data('url');

    switch (target) {
      case 'Discord':
        window.open('https://discord.gg/gsnJxAZ', '_blank');
        break;
      default:
        if (!isWindowOpen(target)) createProgram(target, title, img, url);
        else openWindow(target);
        break;
    }
  });

  $('#dock').on('click', '.program', function(e) { // Click on dock
    const id = $(this).attr('id');
    const windowId = id.substring(5);
    const window = $(`#${windowId}`);

    $(this).toggleClass('button-on');
    $(this).toggleClass('button-off');

    if (window.is(':visible')) {
      const z = getTopZIndex();

      if (window.css('z-index') == z) window.fadeOut(250);
      if (window.css('z-index') < z) openWindow(windowId);

    } else {
      openWindow(windowId);
    }
  });

  $('#dock-time').on('click', function(e) { // Dock time click
    $(this).toggleClass('muted');
    $('.audio').prop('muted', !$('.audio').prop('muted'));
  });

  $(document.body)
    .on('click', '.close', function(e) { // Close button click
      const target = $(this).parent().parent().parent();
      const targetId = target.attr('id');

      closeProgram(targetId);

    }).on('click', '.minimise', function(e) { // Minimise button click
      const target = $(this).parent().parent().parent();
      const targetId = target.attr('id');

      $(`#dock-${targetId}`).removeClass('button-on');
      $(`#dock-${targetId}`).addClass('button-off');

      $(`#${targetId}`).fadeOut(250);

    }).on('click', '.maximise', function(e) { // Maximise button click
      const target = $(this).parent().parent().parent();
      const targetId = target.attr('id');

      !isWindowMaximised(targetId) ? maximiseWindow(targetId) : unMaximiseWindow(targetId);

    }).on('click', '.window', function(e) { // Click on window
      const targetId = $(this).attr('id');
      const z = getTopZIndex();
      const minimise = $(`.window`).children('.window-inner').children('.window-header').children('.minimise').attr('class');

      if (!minimise) return;

      if ($(`.${minimise.substring(12)}:hover`).length === 0) {
        removeFocus();

        $(`#dock-${targetId}`).addClass('button-on');
        $(`#dock-${targetId}`).removeClass('button-off');
      }

      $(`#${targetId}`).css('z-index', z + 1);

    }).on('mousedown', function(e) {
      $('#selection').remove();
      down = true;
      firstX = e.clientX;
      firstY = e.clientY;

    }).on('mousemove', function(e) {
      if (down && $('.window:hover').length === 0) {
        $('#desktop').append('<div id="selection"></div>');
        $('#selection').css('top', e.clientY + 'px');
        $('#selection').css('left', e.clientX + 'px');
        
        const diffX = e.clientX - firstX,
              diffY = e.clientY - firstY;

        if (diffY <= 0) $('#selection').css('top', e.clientY + 'px');
        else $('#selection').css('top', firstY + 'px');

        if (diffX <= 0) $('#selection').css('left', e.clientX + 'px');
        else $('#selection').css('left', firstX + 'px');

        $('#selection').css('width', Math.abs(diffX) + 'px');
        $('#selection').css('height', Math.abs(diffY) + 'px');
        $('.icons').removeClass('focus border');
        $('#selection').overlaps('.icons').addClass('focus border');

      } else $('#selection').remove();

    }).on('mouseup', function() {
      $('#selection').remove();
      down = false;

    }).on('click', function() {
      if (notHoveringIcons()) $('.icons').removeClass('focus');

      if (notHoveringButtons() && $('#startmenu').hasClass('open')) {
        $('#startmenu').removeClass('open');
        $('#startbutton').removeClass('button-on').addClass('button-off');
      }
    });

  $('#startmenu').on('click', '.launch', function(e) { // Click on start menu item that launches a window
    const target = $(this).data('launch');
    const title = $(this).data('title');
    const img = $(this).data('icon');
    const url = $(this).data('url');

    if (!isWindowOpen(target)) {
      createProgram(target, title, img, url);
      $('#startmenu').hide('slide', { direction: 'down' });
      $('#startbutton').removeClass('button-on');
    } else {
      openWindow(target);
      $('#startmenu').hide('slide', { direction: 'down' });
      $('#startbutton').removeClass('button-on');
    }
  });

  $('.item').each(function() { // Set icon for items if supplied
    $(this).setIcon();
  });

  $('.dropdown-item').each(function() { // Set icon for sub-items if supplied
    $(this).setIcon();
  });

});