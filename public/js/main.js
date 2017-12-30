const socket = io();

socket.on('goods:added', function (good) {
  var goodEl = document.querySelector('.color-' + good.color);

  var countEl = goodEl.querySelector('.count');

  countEl.innerHTML = good.count;
});
