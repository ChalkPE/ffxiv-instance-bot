(function () {
  'use strict'

  let zone = {
    id: '0',
    name: ''
  }

  let profile = {
    id: '0',
    name: '',
    job: '0',
    level: 0
  }

  const JOB_CODES = {
    '1': '검술사',
    '2': '격투사',
    '3': '도끼술사',
    '4': '창술사',
    '5': '궁술사',
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
    '14': '몽크',
    '15': '전사',
    '16': '용기사',
    '17': '음유시인',
    '18': '백마도사',
    '19': '흑마도사',
    '1a': '비술사',
    '1b': '소환사',
    '1c': '학자',
    '1d': '쌍검사',
    '1e': '닌자',
    '1f': '기공사',
    '20': '암흑기사',
    '21': '점성술사',
    '22': '사무라이',
    '23': '적마도사'
  }

  function onLogLine (event) {
    let opcode = event.detail.opcode
    let payload = event.detail.payload

    console.log(opcode, payload)
    switch (opcode) {
      case 0:
        return onChatMessage(payload)

      case 1:
        return onZoneChange(payload)

      case 2:
        return onMeSpawned(payload)

      case 3:
        return onEntitySpawned(payload)
    }
  }

  function onChatMessage (payload) {
    let type = payload[0]
    let sender = payload[1]
    let message = payload[2]

    switch (type) {
      case '0010': break //1번 링크셸
      case '0011': break //2번 링크셸
      case '0012': break //3번 링크셸
      case '0013': break //4번 링크셸
      case '0018': break //자유부대
    }
  }

  function onZoneChange (payload) {
    let id = payload[0]
    let name = payload[1]

    if (id !== zone.id) {
      zone.id = id
      zone.name = name
    }
  }

  function onMeSpawned (payload) {
    let id = payload[0]
    let name = payload[1]

    if (id !== profile.id) {
      profile.id = id
      profile.name = name
    }
  }

  function onEntitySpawned (payload) {
    let id = payload[0]
    let name = payload[1]
    let job = payload[2]
    let level = parseInt(payload[3], 16)

    if (id === profile.id) {
      profile.job = job
      profile.level = level
    }
  }

  document.addEventListener('onLogLine', onLogLine)
})()