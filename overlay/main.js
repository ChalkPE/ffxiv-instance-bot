(function () {
  'use strict'

  let zone = {
    id: '0',
    name: ''
  }

  let zoneHistory = {}

  let profile = {
    id: '0',
    name: '',
    job: '0',
    level: 0
  }

  let loader = document.getElementById('loader')
  let status = document.getElementById('status')

  function onLogLine (event) {
    let opcode = event.detail.opcode
    let payload = event.detail.payload
    let timestamp = event.detail.timestamp

    if (location.protocol === 'file:' && opcode !== 251) {
      console.log(opcode, payload, timestamp)
    }

    switch (opcode) {
      // case 0: return onChatMessage(payload)
      case 1: return onZoneChanged(payload)
      case 2: return onMeSpawned(payload)
      case 3: return onEntitySpawned(payload)
      case 26: return onBuffed(payload)
    }
  }

  // function onChatMessage (payload) {
  //   let type = payload[0]
  //   let sender = payload[1]
  //   let message = payload[2]

  //   switch (type) {
  //     case '0003': break // 시스템 공지
  //     case '000a': break // 말하기
  //     case '000b': break // 외치기
  //     case '000c': break // 보낸 귓속말
  //     case '000d': break // 받은 귓속말
  //     case '0010': break // 1번 링크셸
  //     case '0011': break // 2번 링크셸
  //     case '0012': break // 3번 링크셸
  //     case '0013': break // 4번 링크셸
  //     case '0018': break // 자유부대
  //     case '001c': break // 감정 표현 (명령어)
  //     case '001d': break // 감정 표현 (일반)
  //     case '001e': break // 떠들기
  //     case '0025': break // 서버 초월 링크셸
  //     case '0039': break // 시스템 메세지
  //     case '0047': break // 장터 판매 알림?
  //     case '0048': break // 파티 모집 알림?
  //   }
  // }

  function onZoneChanged (payload) {
    let id = payload[0].toLowerCase()
    let name = payload[1]

    if (id !== zone.id) {
      zone.id = id
      status.textContent = zone.name = name

      if (zone.name && profile.name) {
        let z = zone.id + profile.job
        let t = config('threshold') === 'true'
        if (t && (Date.now() - zoneHistory[z]) < 900000) return

        zoneHistory[t] = Date.now()
        sendMessage(`<${profile.name}> ⇒${zone.name} (레벨 ${profile.level} ${profile.job})`)
      }
    }
  }

  function onMeSpawned (payload) {
    let id = payload[0].toLowerCase()
    let name = payload[1]

    if (id !== profile.id) {
      profile.id = id
      profile.name = name
    }
  }

  function onEntitySpawned (payload) {
    let id = payload[0].toLowerCase()
    // let name = payload[1]
    let job = payload[2]
    let level = parseInt(payload[3], 16)

    if (id === profile.id) {
      profile.job = JOB_NAMES[job] || `Unknown (${job})`
      profile.level = level
    }
  }

  function onBuffed (payload) {
    // let id = payload[0].toLowerCase()
    let name = payload[1]
    // let duration = payload[2]
    // let stack = payload[7]

    let sender = {
      id: payload[3].toLowerCase(),
      name: payload[4],
      health: payload[9]
    }
    let receiver = {
      id: payload[5].toLowerCase(),
      name: payload[6],
      health: payload[8]
    }

    let preference = BUFF_PREFERENCE[name]
    if (!preference || receiver.id !== profile.id || sender.id === receiver.id) return

    let love = preference.love
    if (love === 'all' || love.indexOf(profile.job) > -1) {
      return sendMessage(`<${sender.name}>님께서 <${receiver.name}>에게 "${name}"${josa(name, '을/를')} 하사하셨습니다.`)
    }

    let hate = preference.hate
    if (hate !== 'none' && hate.indexOf(profile.job) > -1) {
      sendMessage(`<${sender.name}>놈이 <${receiver.name}>에게 "${name}"${josa(name, '이/')}라는 빅엿을 선사하셨습니다.`)
    }
  }

  function config (key) {
    return localStorage.getItem(`instbot--${key}`)
  }

  function sendMessage (text) {
    let token = config('telegram-token')
    let chatId = config('telegram-chat-id')

    if (!token || !chatId) return
    loader.classList.add('loading')

    let endpoint = `https://api.telegram.org/bot${token}`
    let params = `chat_id=${chatId}&text=${encodeURIComponent(text)}`

    fetch(`${endpoint}/sendMessage?${params}`)
      .then(res => loader.classList.remove('loading'))
      .catch(err => console.error(err, loader.classList.remove('loading')))
  }

  function openConfig () {
    window.open('../config/index.html', 'config', 'width=400,height=600')
  }

  function josa (str, js) {
    return js.split('/')[(str.charCodeAt(str.length - 1) - 0xAC00) % 28 > 0 ? 0 : 1]
  }

  window.zone = zone
  window.profile = profile
  window.zoneHistory = zoneHistory

  status.addEventListener('click', openConfig)
  document.addEventListener('onLogLine', onLogLine)
})()
