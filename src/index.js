const JOB_CODES = {
  '1c': '학자',
  'c': '가죽공예가',
  '21': '점성술사'
}

document.addEventListener('onLogLine', event => {
  let detail = event.detail
  
  switch (detail.opcode) {
    case 0:
      onChatMessage(detail.payload);
      break;

    case 1:
      onZoneChange(detail.payload);
      break;

    case 2:
      onMeSpawned(detail.payload);
      break;

    case 3:
      onEntitySpawned(detail.payload);
      break;
  }
})

let myName = '';
let lastZone = -1;

function onChatMessage(payload) {
  let type = payload[0];
  let sender = payload[1];
  let message = payload[2];
}

function onZoneChange(payload) {
  let id = payload[0];
  let name = payload[1];

  if (id !== lastZone) {
    lastZone = id;
  }
}

function onMeSpawned(payload) {
  let id = payload[0];
  let name = payload[1];
}

function onEntitySpawned(payload) {
  let id = payload[0];
  let name = payload[1];
  let job = payload[2];
  let level = parseInt(payload[3], 16);
}