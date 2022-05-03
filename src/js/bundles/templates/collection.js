import 'Styles/templates/collection.scss';

export default () => {
    (function (collectionFilters) {
      "use strict";
      const dom = {};
  
      const cacheDom = () => {
        dom.productGrid = document.querySelector(".plp__productGrid");
        dom.sortSelect = document.querySelector(".plp__sort-select");
      };
  
      const bindUIActions = () => {  
        document.addEventListener("DOMContentLoaded", () => {  

          if(document.querySelector('.plp__sort-select') != null){
            let sortLocalValue = localStorage.getItem('sortByFilter');
  
            if(sortLocalValue != null){
              document.querySelector(".plp__sort-select").value = sortLocalValue;
              updateDOM(sortLocalValue);
            }
          }
  
          dom.sortSelect.addEventListener('change', e => {
            const sortByFilter = e.target.value;
            localStorage.setItem('sortByFilter', sortByFilter);
            updateDOM(sortByFilter);
          })
        });
      };
  
      const updateDOM = async sortByFilter => {
        const URL = window.location.href;
        let newURL = URL;

        if (sortByFilter) {
          newURL = newURL + "?sort_by=" + sortByFilter;
        } else {
          var sortFilter = document.querySelector(".plp__sort-select").value;
          newURL = newURL + "?sort_by=" + sortFilter;
        }
        document.querySelectorAll(".plp__productMain")[0].setAttribute("data-url", newURL);
        try{
          const resp = await fetch(newURL);
          const respHtml = await resp.text();
          var parser = new DOMParser();
          var doc = parser.parseFromString(respHtml, "text/html");
          const filterProducts = doc.querySelector(".plp__productMain").innerHTML;
          document.querySelector(".plp__productMain").innerHTML = filterProducts;
          document.dispatchEvent(new CustomEvent("swym:collections-loaded"));
        }
        catch(e){
            console.log(e)
        }
      }
      const init = () => {
        cacheDom();
        bindUIActions();
      };
  
      collectionFilters.init = init;
    })((window.collectionFilters = window.collectionFilters || {}));
  };


