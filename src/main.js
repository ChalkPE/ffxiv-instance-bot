(function () {
  'use strict';

  let zone = {
    id: '0',
    name: ''
  };

  let profile = {
    id: '0',
    name: '',
    job: '0',
    level: 0
  };

  const JOB_CODES = {
    'c': '가죽공예가',
    '14': '몽크',
    '15': '전사',
    '16': '용기사',
    '17': '음유시인',
    '18': '백마도사',
    '19': '흑마도사',
    '1c': '학자',
    '1e': '닌자',
    '1f': '기공사',
    '20': '암흑기사',
    '21': '점성술사',
    '22': '사무라이'
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

    switch (type) {
      case '0010': break; //1번 링크셸
      case '0011': break; //2번 링크셸
      case '0012': break; //3번 링크셸
      case '0013': break; //4번 링크셸
      case '0018': break; //자유부대
    }
  }

  function onZoneChange(payload) {
    let id = payload[0];
    let name = payload[1];

    if (id !== zone.id) {
      zone.id = id;
      zone.name = name;
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

    if (id === profile.id) {
      profile.job = job;
      profile.level = level;
    }
  }
})()