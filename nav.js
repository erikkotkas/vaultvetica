(function () {
  'use strict';

  var ROOMS = [
    { id: 1,  name: 'ROOM 1',      href: 'room1.html' },
    { id: 2,  name: 'ROOM 2',      href: 'room2.html' },
    { id: 3,  name: 'ROOM 3',      href: 'room3.html' },
    { id: 4,  name: 'LIVING ROOM', href: 'living-room.html' },
    { id: 5,  name: 'ROOM 5',      href: 'room5.html' },
    { id: 6,  name: 'GYM',         href: 'gym.html' },
    { id: 7,  name: 'BEDROOM',     href: 'room7.html' },
    { id: 8,  name: 'ROOM 8',      href: 'room8.html' },
    { id: 9,  name: 'PUB',         href: 'pub.html' },
    { id: 10, name: 'HMP KERNING', href: 'hmp-kerning.html' },
    { id: 11, name: 'THE VAULT',   href: null }
  ];

  var currentRoom = typeof window.CURRENT_ROOM !== 'undefined' ? window.CURRENT_ROOM : null;
  var selectedRoom = currentRoom;
  var open = false;

  function getRoom(id) {
    return ROOMS.filter(function (r) { return r.id === id; })[0] || null;
  }

  function buildMenu() {
    return '<aside id="map-menu" class="map-menu" aria-label="Room navigation">' +
      '<div class="menu-title">VaultVetica</div>' +
      '<div class="menu-body">' +
        '<div class="menu-map" aria-hidden="true">' +
          '<svg viewBox="0 0 1135 3400" class="menu-map-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">' +
            '<rect class="menu-map-shaft" x="493" y="50" width="149" height="3119"></rect>' +
            '<rect class="menu-map-corridor" x="435" y="353"  width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="435" y="922"  width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="435" y="1591" width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="435" y="2027" width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="435" y="2585" width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="642" y="568"  width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="642" y="1138" width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="642" y="1591" width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="642" y="2306" width="58" height="140"></rect>' +
            '<rect class="menu-map-corridor" x="642" y="2865" width="58" height="140"></rect>' +
            '<rect class="menu-map-room" data-room="1"  x="104" y="312"  width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="3"  x="104" y="881"  width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="5"  x="104" y="1550" width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="7"  x="104" y="1986" width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="9"  x="104" y="2544" width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="2"  x="700" y="527"  width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="4"  x="700" y="1097" width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="6"  x="700" y="1550" width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="8"  x="700" y="2265" width="331" height="181"></rect>' +
            '<rect class="menu-map-room" data-room="10" x="700" y="2824" width="331" height="181"></rect>' +
            '<rect class="menu-map-vault" x="359" y="3169" width="417" height="181"></rect>' +
          '</svg>' +
        '</div>' +
        '<div class="menu-list">' +
          ROOMS.map(function (room) {
            var disabled = !room.href;
            return '<button class="menu-room' + (disabled ? ' is-disabled' : '') + '" type="button" data-room="' + room.id + '"' + (disabled ? ' disabled' : '') + '>' +
              '<span class="menu-room-label">' + room.name + '</span>' +
              '<span class="menu-room-pip" aria-hidden="true"></span>' +
            '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="menu-actions">' +
        '<button class="btn menu-close" type="button" aria-label="Close menu">&#x2715;</button>' +
        '<div class="menu-actions-gap"></div>' +
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
      el.classList.remove('is-current', 'is-selected', 'is-home');
      if (id === currentRoom) el.classList.add('is-home');
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
    document.querySelector('.menu-close').addEventListener('click', function () { setOpen(false); });
    document.querySelector('.menu-home').addEventListener('click', function () { goToPage('index.html'); });
    document.getElementById('menu-enter').addEventListener('click', function () {
      var room = getRoom(selectedRoom);
      if (room && room.href) goToPage(room.href);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) { setOpen(false); return; }
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
