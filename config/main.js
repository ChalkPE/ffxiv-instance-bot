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
            type: 'text',
            key: 'telegram-token',
            name: '텔레그램 봇 토큰',
            placeholder: '예) 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
          }, {
            type: 'number',
            key: 'telegram-chat-id',
            name: '텔레그램 챗 ID',
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