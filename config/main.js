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
        ls: window.localStorage,
        fields: [
          {
            type: 'checkbox',
            key: 'instbot--threshold',
            name: '전송 제한하기',
            hint: '10분 동안은 이미 진입했던 지역에 재진입해도 알림을 보내지 않습니다.'
          }, {
            type: 'text',
            key: 'instbot--telegram-token',
            name: '텔레그램 봇 토큰',
            placeholder: '예) 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
          }, {
            type: 'number',
            key: 'instbot--telegram-chat-id',
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