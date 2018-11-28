(function () {
  'use strict'

  const fields = [
    {
      type: 'text',
      key: 'telegram-token',
      name: '텔레그램 봇 토큰',
      placeholder: '예) 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
    }, {
      type: 'text',
      key: 'telegram-chatid',
      name: '텔레그램 챗 ID',
      placeholder: '예) 56781234'
    }
  ]

  const tabs = [
    {id: 'general', name: '일반', data: {fields}},
    {id: 'about', name: '정보'}
  ]

  const routes = tabs.map(tab => ({
    name: tab.name,
    path: '/' + tab.id,
    component: {
      data: () => tab.data || {},
      template: `<section id="tab-${tab.id}">
        ${document.getElementById(tab.id).innerHTML}
      </section>`
    }
  }))

  routes.push({path: '*', redirect: '/general'})

  const app = new Vue({
    data: () => ({tabs}),
    router: new VueRouter({routes})
  })

  app.$mount('#app')
})()