'use strict';

window.Velocity = window.Velocity || (window.jQuery || window.Zepto || window).Velocity;

function onReady() {}

function onBackgroundLoad() {
  wallpaper.fadeIn();
  runAnimation();
}

function runAnimation() {

  $.Velocity = window.Velocity;

  var $one = $('#one');
  var $two = $('#two');
  var $three = $('#three');

  $.Velocity.RegisterEffect('numberIn', {
    defaultDuration: 600,
    calls: [[{ scale: [1, 1.05], opacity: [1, 0] }, 1, { easing: 'easeInBack' }]]
  });

  var fadeOneIn = { e: $one, p: 'numberIn', o: { stagger: 300 } };
  var fadeTwoIn = { e: $two, p: 'numberIn', o: { stagger: 300 } };
  var fadeThreeIn = { e: $three, p: 'numberIn', o: { stagger: 300 } };

  var sequence = [fadeOneIn, fadeTwoIn, fadeThreeIn];

  setTimeout(function () {

    // Run main sequence
    $.Velocity.RunSequence(sequence);
  }, 1000);
}