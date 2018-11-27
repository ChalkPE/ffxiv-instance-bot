(function () {
  'use strict'

  let tokenField = document.getElementById('token');

  tokenField.addEventListener('change', function () {
    localStorage.setItem('token', tokenField.value)
    console.log(event.target.value)
  })

  document.addEventListener('DOMContentLoaded', function () {
    tokenField.value = localStorage.getItem('token') || ''
  })
})()