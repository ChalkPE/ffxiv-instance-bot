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


  function onLogLine (event) {
    let opcode = event.detail.opcode
    let payload = event.detail.payload

    console.log(opcode, payload)

    switch (opcode) {
      case 0: return onChatMessage(payload)
      case 1: return onZoneChanged(payload)
      case 2: return onMeSpawned(payload)
      case 3: return onEntitySpawned(payload)
    }
  }

  function onChatMessage (payload) {
    let type = payload[0]
    let sender = payload[1]
    let message = payload[2]

    switch (type) {
      case '0003': break // 시스템 공지
      case '0010': break // 1번 링크셸
      case '0011': break // 2번 링크셸
      case '0012': break // 3번 링크셸
      case '0013': break // 4번 링크셸
      case '0018': break // 자유부대
      case '001c': break // 감정 표현 (명령어)
      case '001d': break // 감정 표현 (일반)
      case '0039': break // 시스템 메세지

      case '0047': break // 장터 판매 알림?
      case '0048': break // 파티 모집 알림?
    }
  }

  function onZoneChanged (payload) {
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
    let level = payload[3]

    if (id === profile.id) {
      profile.job = JOB_CODES[job] || `Unknown (${job})`
      profile.level = parseInt(level, 16)
    }
  }

  window.zone = zone
  window.profile = profile

  document.addEventListener('onLogLine', onLogLine)
})()