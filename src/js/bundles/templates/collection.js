import 'Styles/templates/collection.scss';

export default () => {
    (function (collectionFilters) {
      "use strict";
      const dom = {};
  
      const cacheDom = () => {
        dom.productGrid = document.querySelector(".plp__productGrid");
      };
  
      const bindUIActions = () => {
        /*For Ajax Filter on PLP */
  
        document.addEventListener("DOMContentLoaded", function (e) {
        //   var filters = [];
        //   const event = new Event("change");
        //   var filterCheckBox = document.querySelectorAll(".js-filter-input");
        //   addPromoBox();
  
          if(document.querySelector('.plp__sort-select') != null){
            let sortLocalValue = localStorage.getItem('sortByFilter');
  
            if(sortLocalValue != null){
              document.querySelector(".plp__sort-select").value = sortLocalValue;
            //   document.querySelector('.js-sort-input[value='+sortLocalValue+']').checked = true;
              updateDOM(sortLocalValue);
            }
          }
  
        //   for (var i = 0; i < filterCheckBox.length; i++) {
        //     filterCheckBox[i].addEventListener("change", function (e) {
        //       const checboxValue = e.target.value;
        //       if (e.target.checked) {
        //         filters.push(checboxValue);
        //       } else {
        //         const indexValue = filters.indexOf(checboxValue);
        //         if (indexValue > -1) {
        //           filters.splice(indexValue, 1);
        //         }
        //       }
        //       updateDOM(filters);
        //     });
        //   }
  
        //   document.addEventListener("click", function (e) {
        //     if (
        //       (e.target && e.target.classList.contains("js-clear-tags")) ||
        //       e.target.classList.contains("js-reset-state") ||
        //       e.target.parentNode.classList.contains('js-reset-state"')
        //     ) {
        //       if (document.querySelector(".js-reset-state") != null) {
        //         document
        //           .querySelector(".js-reset-state")
        //           .classList.add("is--active");
        //       }
  
        //       document
        //         .querySelectorAll(".js-filter-input")
        //         .forEach(function (item) {
        //           item.checked = false;
        //         });
        //       document.querySelector(".collection__sortByInput").value = "manual";
        //       document.querySelector('.js-sort-input[value="manual"]').checked = true;
        //       filters = [];
        //       localStorage.removeItem('sortByFilter');
        //       updateDOM(filters);
        //       setTimeout(function () {
        //         addPromoBox();
        //       }, 1200);
        //     }
  
        //     if (e.target && e.target.className == "collection__removeTag") {
        //       let tagToRemove = e.target.getAttribute("data-tag");
  
        //       document
        //         .querySelectorAll(".js-filter-input")
        //         .forEach(function (item) {
        //           if (item.value == tagToRemove) {
        //             item.checked = false;
        //             item.dispatchEvent(event);
        //           }
        //         });
        //     }
  
        //     if (
        //       e.target.classList.contains("js-load-more") ||
        //       e.target.parentElement.classList.contains("js-load-more")
        //     ) {
        //       var $this = e.target;
        //       var nextUrl = document.querySelector("[data-next-url]").value;
  
        //       if (nextUrl.length == 0) {
        //         $this.setAttribute("disabled", true);
        //         return false;
        //       }
  
        //       fetch(nextUrl)
        //         .then(function (response) {
        //           return response.text();
        //         })
        //         .then(function (html) {
        //           var parser = new DOMParser();
        //           var doc = parser.parseFromString(html, "text/html");
  
        //           const nextProducts = doc.querySelector(
        //             ".collection__productGrid"
        //           ).innerHTML;
  
        //           document.querySelector(".collection__productGrid").innerHTML +=
        //             nextProducts;
        //           var nextPageURL = doc.querySelector(".collection__productGrid")
        //             .dataset.nextpage;
        //           document.querySelector("[data-next-url]").value = nextPageURL;
        //           setTimeout(function () {
        //             document
        //               .querySelector(".js-load-more")
        //               .classList.remove("is--active");
        //           }, 1000);
  
        //           if (nextPageURL.length == 0) {
        //             $this.style.display = "none";
        //           }
  
        //           removeBlurFilter();
        //           document.dispatchEvent(
        //             new CustomEvent("swym:collections-loaded")
        //           );
        //         })
        //         .catch(function (err) {
        //           console.warn("Something went wrong in pagination", err);
        //         });
        //     }
  
        //     if (e.target.classList.contains("js-show-more")) {
        //       e.target.previousElementSibling.classList.toggle("is--active");
        //       e.target.innerText =
        //         e.target.innerText == "Show More" ? "Show Less" : "Show More";
        //     }
  
        //     /* For mobile events */
        //     if (
        //       e.target.classList.contains("collection__filterBtn") ||
        //       e.target.classList.contains("collection__filterBtnArrow")
        //     ) {
        //       document
        //         .querySelector("#filter-drawer")
        //         .setAttribute("aria-hidden", "false");
        //       document.body.classList.add("drawer-open");
        //     }
  
        //     if (
        //       e.target.classList.contains("js-close-filterDrawer") ||
        //       e.target.classList.contains("js-apply-filter") ||
        //       e.target.closest(".js-apply-filter")
        //     ) {
        //       document
        //         .querySelector("#filter-drawer")
        //         .setAttribute("aria-hidden", "true");
        //       document.body.classList.remove("drawer-open");
        //     }
  
        //     if (
        //       e.target.classList.contains("js-toggle-filter") ||
        //       e.target.classList.contains("collection__filterArrow")
        //     ) {
        //       e.target
        //         .closest(".collection__filter")
        //         .classList.toggle("is--active");
        //     }
  
        //     /* For mobile events ends*/
        //   });
  
          document.addEventListener("change", function (e) {
            if (
              e.target.className == "plp__sort-select"
            ) {
              const sortByFilter = e.target.value;
              localStorage.setItem('sortByFilter', sortByFilter);
              updateDOM(sortByFilter);
            }
          });
        });
  
        /*For Ajax Filter on PLP ends */
      };
  
      const updateDOM = (sortByFilter) => {
        const URL = window.location.href;
        let newURL = URL;
  
  
        if (sortByFilter) {
          newURL = newURL + "?sort_by=" + sortByFilter;
        } else {
          var sortFilter = document.querySelector(
            ".plp__sort-select"
          ).value;
          newURL = newURL + "?sort_by=" + sortFilter;
        }
  
        document.querySelectorAll(".plp__productMain")[0].setAttribute("data-url", newURL);
  
        fetch(newURL)
          .then(function (response) {
            return response.text();
          })
          .then(function (html) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");

            // const ResultProductCount = doc.querySelectorAll(".js-poduct-count")[0].innerHTML;
  
            // let countDiv = document.querySelectorAll(".js-poduct-count");
            // countDiv.forEach(function (el) {
            //   el.innerHTML = ResultProductCount;
            // });
  
            const filterProducts = doc.querySelector(".plp__productMain").innerHTML;
            document.querySelector(".plp__productMain").innerHTML =
              filterProducts;
  
            // if (filterArray.length == 0) {
            //   document.querySelector(".js-collection-tags").style.display =
            //     "none";
            // } else {
            //   document.querySelector(".js-collection-tags").style.display =
            //     "flex";
            // }
            // removeBlurFilter();
            document.dispatchEvent(new CustomEvent("swym:collections-loaded"));
          })
          .catch(function (err) {
            console.warn("Something went wrong.", err);
          });
        };
  
      const removeBlurFilter = () => {
        setTimeout(function () {
          document
            .querySelectorAll(
              '.collection__productGridItem picture[data-loaded="false"]'
            )
            .forEach((item) => lazyImageFn(item));
        }, 100);
      };
  
      const addPromoBox = () => {
        if (document.getElementById("collection__offerImage") != null) {
          const _offerImage = document.getElementById(
            "collection__offerImage"
          ).value;
  
          const _offerTitle = document.getElementById(
            "collection__offerContent"
          ).value;
          const _offerDesc = document.getElementById(
            "collection__offerDesc"
          ).value;
          const _offerLink = document.getElementById(
            "collection__offerLink"
          ).value;
          let _offerPosition = document.getElementById(
            "collection__offerPosition"
          ).value;
          _offerPosition = _offerPosition.length > 0 ? _offerPosition - 2 : 1;
          let offerHTML = '<div class="collection__offerWrap">';
          offerHTML +=
            '<a href="' + _offerLink + '" class="collection__offerLink">';
          offerHTML += '<div class="collection__offerImageWrap">';
          offerHTML +=
            '<img data-sc="' +
            _offerImage +
            '" src="' +
            _offerImage +
            '" class="collection__offerImage">';
          offerHTML += "</div>";
          offerHTML += '<div class="collection__offerRte">';
          offerHTML +=
            '<h5 class="collection__offerTitle">' + _offerTitle + "</h5>";
          offerHTML +=
            '<div class="collection__offerSubTitle lead-secondary">' +
            _offerDesc +
            "</div>";
          offerHTML += "</div>";
          offerHTML += "</a>";
          offerHTML += "</div>";
  
          const promoDiv = document.createElement("div");
          promoDiv.className =
            "collection__productGridItem collection__productGridItem--fullWidth";
          promoDiv.innerHTML = offerHTML;
  
          if (document.querySelector(".collection__productGrid") != null) {
            document
              .querySelector(".collection__productGrid")
              .insertBefore(
                promoDiv,
                document.querySelectorAll(".collection__productGridItem")[
                  _offerPosition
                ].nextSibling
              );
          }
        }
      };
  
      const init = () => {
        cacheDom();
        bindUIActions();
      };
  
      collectionFilters.init = init;
    })((window.collectionFilters = window.collectionFilters || {}));
  };