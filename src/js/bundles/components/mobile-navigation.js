export default() => {
  (function (mobileNavigation) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.trigger = document.getElementsByClassName('js-nav-trigger')[0];
      dom.body = document.getElementsByTagName('body')[0];
      dom.html = document.getElementsByTagName('html')[0];
      dom.subNavTriggers = document.querySelectorAll('.js-toggle-subanv');
    }

    const bindUIActions = () => {
      dom.trigger.addEventListener('click', toggleNavigation);
      dom.subNavTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          let target = trigger.dataset.target;
          dom.body.classList.toggle('subnav--open');
          document.getElementById(target).classList.toggle('is--active');
        })
      })
    
      function mobileNavHeight(){
        const nav = document.querySelector('.mobileNav');
        const bar = document.querySelector('.announcement');
        const header = document.querySelector('.header');
        const height = window.innerHeight - (bar.offsetHeight + header.offsetHeight)
        nav.style.height = height + 'px'

        window.addEventListener('scroll', function(e) {
          const scrollPosition = window.scrollY;
          if (scrollPosition > 2) {
            nav.style.height = window.innerHeight - header.offsetHeight + 'px'
          }
        });
      }
      mobileNavHeight()

    }

    const toggleNavigation = () => {
      dom.body.classList.toggle('nav--open');
      dom.html.classList.toggle('nav--open');
    }


    const init = () => {
      cacheDom();
      bindUIActions();
    }

    mobileNavigation.init = init;

  })((window.mobileNavigation = window.mobileNavigation || {}));
}