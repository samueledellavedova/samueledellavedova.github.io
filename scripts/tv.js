const directory = '../assets/tv/';
const channels = [ '0_rick_and_morty.gif', '1_the_midnight_gospel.gif', '2_paul_robertson_void.gif', '3_paul_robertson_lost.gif' ];
let current = 0;

// Load GIFs from TV channels folder

function loadChannels() {
  /*$.ajax({
    url: directory,
    success: function(res) {
      $(res).find('a:contains(.gif)').each(function() { // load all gifs
        channels.push(this.title)
      });
      setChannel(current); // view the first channel
    }
  });*/ // GET not working on GitHub Pages
  setChannel(current);
}

// Play Specified Audio File

function playAudio(url, volume) {
  const audio = new Audio();
  audio.src = url;
  audio.volume = volume || 0.1;
  audio.play();
}

// View A Specified Channel

function setChannel(position) {
  playAudio('../assets/audios/noise.mp3', 0.05);
  $('#tv-video')
    .css('background', 'url(\'../assets/others/noise.gif\')')
    .css('background-size', 'cover')
    .css('background-repeat', 'no-repeat')
    .css('background-position', 'center')
    .delay(500) // after 0.5s
    .queue(function(next) {
      $(this)
        .css('background', `url('${directory}${channels[position]}')`)
        .css('background-size', 'cover')
        .css('background-repeat', 'no-repeat')
        .css('background-position', 'center')
      next();
    });

  $('#tv-video h1')
    .text(`CH 0${position + 1}`) // set channel name
    .delay(1250)
    .queue(function(next) {
      $(this).text('');
      next();
    })
}

// Change Channel + (Increase)

function increaseChannel() {
  playAudio('../assets/audios/dial.mp3', 0.9);
  if (!channels[current + 1]) return;
  current++;
  setChannel(current);
}

// Change Channel - (Decrease)

function decreaseChannel() {
  playAudio('../assets/audios/dial.mp3', 0.9);
  if (!channels[current - 1]) return;
  current--;
  setChannel(current);
}

// Draw Frequency Wave

function drawSine() {
  const canvas = $('#tv-freq-wave');
  const ctx = canvas[0].getContext('2d');
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#14fdce';
  
  const frequency = 5;
  let amplitude = 0;
  let x = 0, y = 0;

  for (x = 0; x < width / 2; x++) { 
    y = height / 2 + amplitude * Math.sin(x / frequency);
    ctx.lineTo(x, y);
    amplitude += 0.3; // increase wave amplitude in the first half
  }

  for (x = width / 2; x < width; x++) {
    y = height / 2 + amplitude * Math.sin(x / frequency);
    ctx.lineTo(x, y);
    amplitude -= 0.3; // decrease wave amplitude in the second half
  }

  ctx.stroke();
}

$(document).ready(function() {
  loadChannels();
  drawSine();

  $('#increase-ch').on('click', () => increaseChannel());

  $('#decrease-ch').on('click', () => decreaseChannel());
});









