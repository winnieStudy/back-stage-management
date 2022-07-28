import Vue from 'vue'
 //防抖
const preventReClick = Vue.directive('preventReClick', {
  inserted: function (el, binding) {
      el.addEventListener('click', () => {
          if (!el.disabled) {
              el.disabled = true
              setTimeout(() => {
                  el.disabled = false
              }, binding.value || 3000)
          }
      })
  }
});

export { preventReClick }