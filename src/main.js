(function () {
  'use strict';

  let zone = '-1';
  let profile = {
    id: '',
    name: '',
    job: '',
    level: 0
  };

  const JOB_CODES = {
		'1': '검술사',
		'3': '도끼술사',
		'6': '환술사',
		'7': '주술사',
		'8': '목수',
		'9': '대장장이',
		'a': '갑주제작사',
		'b': '보석공예가',
    'c': '가죽공예가',
		'd': '재봉사',
		'e': '연금술사',
		'f': '요리사',
		'10': '광부',
		'11': '원예가',
		'12': '어부',
		'13': '나이트',
		'1a': '비술사',
		'1b': '소환사',
    '1c': '학자',
		'20': '암흑기사',
    '21': '점성술사',
		'22': '사무라이',
		'23': '적마도사'
  };

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

    if (id !== profile.id) {
      profile.id = id;
      profile.name = name;
    }
  }

  function onEntitySpawned(payload) {
    let id = payload[0];
    let name = payload[1];
    let job = payload[2];
    let level = parseInt(payload[3], 16);
  }
})()