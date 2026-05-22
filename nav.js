(function () {
  'use strict';

  var ROOMS = [
    { id: 1,  name: 'ROOM 1',  desc: 'Living quarters',      href: 'room1.html' },
    { id: 2,  name: 'ROOM 2',  desc: 'Room description',     href: 'room2.html' },
    { id: 3,  name: 'ROOM 3',  desc: 'Room description',     href: 'room3.html' },
    { id: 4,  name: 'LIVING ROOM', desc: 'Room description',  href: 'room4.html' },
    { id: 5,  name: 'ROOM 5',  desc: 'Room description',     href: 'room5.html' },
    { id: 6,  name: 'GYM',      desc: 'Gym',                  href: 'room6.html' },
    { id: 7,  name: 'BEDROOM', desc: 'Room description',     href: 'room7.html' },
    { id: 8,  name: 'ROOM 8',  desc: 'Room description',     href: 'room8.html' },
    { id: 9,  name: 'PUB',      desc: 'Pub',                  href: 'room9.html' },
    { id: 10, name: 'HMP KERNING', desc: 'Room description',     href: 'room10.html' }
  ];

  var currentRoom = typeof window.CURRENT_ROOM !== 'undefined' ? window.CURRENT_ROOM : null;
  var selectedRoom = currentRoom;
  var open = false;

  function getRoom(id) {
    return ROOMS.filter(function (r) { return r.id === id; })[0] || null;
  }

  function buildMenu() {
    return '<aside id="map-menu" class="map-menu" aria-label="Room navigation">' +
      '<div class="menu-title">ROOM SELECT</div>' +
      '<div class="menu-map" aria-hidden="true">' +
        '<svg viewBox="0 0 280 650" class="menu-map-svg" xmlns="http://www.w3.org/2000/svg">' +
          '<rect class="menu-map-shaft" x="126" y="0" width="28" height="650"></rect>' +
          '<rect class="menu-map-corridor" x="80" y="62"  width="120" height="26"></rect>' +
          '<rect class="menu-map-room" data-room="1"  x="20"  y="45"  width="80" height="58"></rect>' +
          '<rect class="menu-map-room" data-room="2"  x="180" y="45"  width="80" height="58"></rect>' +
          '<text class="menu-map-label" x="60"  y="76"  text-anchor="middle">01</text>' +
          '<text class="menu-map-label" x="220" y="76"  text-anchor="middle">02</text>' +
          '<rect class="menu-map-corridor" x="80" y="192" width="120" height="26"></rect>' +
          '<rect class="menu-map-room" data-room="3"  x="20"  y="175" width="80" height="58"></rect>' +
          '<rect class="menu-map-room" data-room="4"  x="180" y="175" width="80" height="58"></rect>' +
          '<text class="menu-map-label" x="60"  y="206" text-anchor="middle">03</text>' +
          '<text class="menu-map-label" x="220" y="206" text-anchor="middle">04</text>' +
          '<rect class="menu-map-corridor" x="80" y="322" width="120" height="26"></rect>' +
          '<rect class="menu-map-room" data-room="5"  x="20"  y="305" width="80" height="58"></rect>' +
          '<rect class="menu-map-room" data-room="6"  x="180" y="305" width="80" height="58"></rect>' +
          '<text class="menu-map-label" x="60"  y="336" text-anchor="middle">05</text>' +
          '<text class="menu-map-label" x="220" y="336" text-anchor="middle">06</text>' +
          '<rect class="menu-map-corridor" x="80" y="452" width="120" height="26"></rect>' +
          '<rect class="menu-map-room" data-room="7"  x="20"  y="435" width="80" height="58"></rect>' +
          '<rect class="menu-map-room" data-room="8"  x="180" y="435" width="80" height="58"></rect>' +
          '<text class="menu-map-label" x="60"  y="466" text-anchor="middle">07</text>' +
          '<text class="menu-map-label" x="220" y="466" text-anchor="middle">08</text>' +
          '<rect class="menu-map-corridor" x="80" y="582" width="120" height="26"></rect>' +
          '<rect class="menu-map-room" data-room="9"  x="20"  y="565" width="80" height="58"></rect>' +
          '<rect class="menu-map-room" data-room="10" x="180" y="565" width="80" height="58"></rect>' +
          '<text class="menu-map-label" x="60"  y="596" text-anchor="middle">09</text>' +
          '<text class="menu-map-label" x="220" y="596" text-anchor="middle">10</text>' +
        '</svg>' +
      '</div>' +
      '<div class="menu-list">' +
        ROOMS.map(function (room) {
          return '<button class="menu-room' + (room.href ? '' : ' is-disabled') + '" type="button" data-room="' + room.id + '"' + (room.href ? '' : ' disabled') + '>' +
            '<span><span class="menu-room-name">' + room.name + '</span><span class="menu-room-desc">' + room.desc + '</span></span>' +
          '</button>';
        }).join('') +
      '</div>' +
      '<div class="menu-actions">' +
        '<button class="btn menu-home" type="button">HOME</button>' +
        '<button id="menu-enter" class="btn menu-enter" type="button" disabled>ENTER</button>' +
      '</div>' +
    '</aside>';
  }

  function setOpen(nextOpen) {
    var panel = document.getElementById('map-menu');
    var button = document.querySelector('.map-button');
    open = nextOpen;
    if (panel) panel.classList.toggle('is-open', open);
    if (button) button.classList.toggle('is-active', open);
  }

  function updateStates() {
    var hasDestination = selectedRoom !== null && selectedRoom !== currentRoom;
    document.querySelectorAll('[data-room]').forEach(function (el) {
      var id = parseInt(el.dataset.room, 10);
      el.classList.remove('is-current', 'is-selected');
      if (!hasDestination && id === currentRoom) el.classList.add('is-current');
      if (hasDestination && id === selectedRoom) el.classList.add('is-selected');
    });
    var enter = document.getElementById('menu-enter');
    var selected = getRoom(selectedRoom);
    if (!enter) return;
    enter.disabled = !(selected && selected.href);
    enter.textContent = selected && selected.href ? 'ENTER ' + selected.name : 'ENTER';
  }

  function selectRoom(id) {
    var room = getRoom(id);
    if (!room || !room.href) return;
    selectedRoom = id;
    updateStates();
  }

  function goToPage(url) {
    if (typeof window.fadeToPage === 'function') { window.fadeToPage(url); return; }
    window.location.href = url;
  }

  function init() {
    var header = document.querySelector('.header');
    var mapButton = document.querySelector('.map-button');
    if (!header || !mapButton) return;
    header.insertAdjacentHTML('afterend', buildMenu());
    mapButton.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!open); });
    document.querySelectorAll('.menu-room, .menu-map-room').forEach(function (el) {
      el.addEventListener('click', function () { selectRoom(parseInt(el.dataset.room, 10)); });
    });
    document.querySelector('.menu-home').addEventListener('click', function () { goToPage('index.html'); });
    document.getElementById('menu-enter').addEventListener('click', function () {
      var room = getRoom(selectedRoom);
      if (room && room.href) goToPage(room.href);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && open) {
        var room = getRoom(selectedRoom);
        if (room && room.href) goToPage(room.href);
      }
    });
    document.addEventListener('click', function (e) {
      var panel = document.getElementById('map-menu');
      if (!open || !panel) return;
      if (!panel.contains(e.target) && e.target !== mapButton) setOpen(false);
    });
    updateStates();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
