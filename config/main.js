(function () {
  'use strict'

  function tabComponent(tab) {
    return {
      name: tab.id[0].toUpperCase() + tab.id.slice(1) + 'Tab',
      template: `
        <section id="tab-${tab.id}">
          ${document.getElementById(tab.id).innerHTML}
        </section>`
    }
  }

  const tabs = [
    {
      id: 'general',
      displayName: '일반',
      data: () => ({
        s: window.localStorage,
        fields: [
          {
            type: 'checkbox',
            key: 'alert-buff',
            def: 'true',
            name: '버프 알림 보내기',
            hint: '내 캐릭터가 특정 버프를 받으면 알림을 전송합니다. 현재 직업에 따라 내용이 바뀝니다.',
          }, {
            type: 'checkbox',
            key: 'threshold',
            def: 'true',
            name: '전송 제한하기',
            hint: '15분 동안은 이미 진입했던 지역에 재진입해도 알림을 보내지 않습니다.'
          }, , {
            type: 'text',
            key: 'telegram-token',
            name: '텔레그램 봇 토큰',
            placeholder: '예) 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
          }, {
            type: 'number',
            key: 'telegram-chat-id',
            name: '텔레그램 Chat ID',
            placeholder: '예) 56781234'
          }
        ]
      }),
    },

    { id: 'about', displayName: '정보' }
  ]

  const routes = tabs
    .map(tab => ({
      name: tab.id,
      path: '/' + tab.id,
      component: Object.assign(tabComponent(tab), tab)
    }))
    .concat({ path: '*', redirect: '/general' })

  window.app = new Vue({
    el: '#app',
    data: () => ({tabs}),
    router: new VueRouter({routes})
  })
})()