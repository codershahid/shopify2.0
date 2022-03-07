export default() => {
    (function (deskNavigation) {
      'use strict';
  
      const dom = {};
  
      const cacheDom = () => {
        dom.headWrapper = document.querySelector(".header__wrapper");
        dom.navItems = document.querySelectorAll('.nav__item');
        dom.megaMenu = document.querySelectorAll('.megamenu');
      }
  
      const bindUIActions = () => {
            dom.navItems?.forEach(item => {
                item.addEventListener('mouseover', e => {
                  item.classList.add('nav__item--active')
                  setTimeout(()=> {
                    item.querySelector('.megamenu').style.borderTop = '1px solid #cecdb6';
                  }, 800)
                })
                item.addEventListener('mouseout', e =>{
                  item.classList.remove('nav__item--active')
                  item.querySelector('.megamenu').style.borderTop = '1px solid transparent';
                })
            })
            let prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
              dom.navItems.forEach(item => {item.classList.remove('nav__item--active')})
            let currentScrollPos = window.pageYOffset;
              if (prevScrollpos > currentScrollPos) {
                dom.headWrapper.style.top = "0";
              } else {
                dom.headWrapper.style.top = "-50px";
              }
              prevScrollpos = currentScrollPos;
            }


        }

      const init = () => {
        cacheDom();
        bindUIActions();
      }
  
      deskNavigation.init = init;
  
    })((window.deskNavigation = window.deskNavigation || {}));
  }