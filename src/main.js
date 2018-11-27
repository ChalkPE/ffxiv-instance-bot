(function () {
  'use strict'

  let zone = '-1';
  let me = ['-1', ''];

  const JOB_CODES = {
    'c': '가죽공예가',
    '1c': '학자',
    '21': '점성술사'
  }

  document.addEventListener('onLogLine', event => {
    let opcode = event.detail.opcode;
    let payload = event.detail.payload;

    console.log(opcode, payload);
    switch (opcode) {
      case 0:
        return onChatMessage(payload);

      case 1:
        return onZoneChange(payload);

      case 2:
        return onMeSpawned(payload);

      case 3:
        return onEntitySpawned(payload);
    }
  })

  function onChatMessage(payload) {
    let type = payload[0];
    let sender = payload[1];
    let message = payload[2];
  }

  function onZoneChange(payload) {
    let id = payload[0];
    let name = payload[1];

    if (id !== zone) {
      zone = id;
    }
  }

  function onMeSpawned(payload) {
    let id = payload[0];
    let name = payload[1];

    if (me[0] !== id) {
      me = [id, name];
    }
  }

  function onEntitySpawned(payload) {
    let id = payload[0];
    let name = payload[1];
    let job = payload[2];
    let level = parseInt(payload[3], 16);
  }
})()