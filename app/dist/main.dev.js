"use strict";

window.addEventListener('load', function () {
  renderNav();
  initForm();
  renderTweets();
  initTweetEvents();
  initModalEvents();
  initExtras();
});
/**NAVEGADOR DINÁMICO*/

var renderNav = function renderNav() {
  var navegador = "";

  for (var i = 0; i < twitterData.navData.length; i++) {
    navegador += "<div class=\"nav_element\">\n            <span class=\"".concat(twitterData.navData[i].icon, "\"></span>\n            <a href=\"").concat(twitterData.navData[i].link, "\">").concat(twitterData.navData[i].title, "</a>\n            </div>");
  }

  var navData = document.querySelector('.nav');
  navData.innerHTML = navegador;
};
/**TUITEADOR (FORM CENTRAL)*/


var tweets = [];

var initForm = function initForm() {
  var form = document.forms["new"];
  var textarea = form.elements.tuitea;
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (textarea.value != "") {
      tweets.unshift({
        text: textarea.value,
        likes: 0
      });
    }

    form.reset();
    renderTweets();
    initTweetEvents();
  });
};
/**PINTADO DE LOS TWEETS*/


var renderTweets = function renderTweets() {
  var tuitFeed = document.querySelector('.tuitFeed');
  var HTMLString = "";
  tweets.forEach(function (tweet) {
    HTMLString += "<div class=\"tuit\">\n\n        <div class=\"tuitIcon\">\n            <img class=\"userIcon\" src=\"".concat(twitterData.userData.userIcon, "\" alt=\"userIcon\">\n        </div>\n\n        <div class=\"tuitUser\">\n            <h1 class=\"userName\">").concat(twitterData.userData.name, "</h1>\n            <h2 class=\"userAt\">@").concat(twitterData.userData.userAt, "</h2>\n            <div class=\"trashButton\">\n                <span class=\"tuitIcon fa fa-trash\"></span>\n            </div>\n        </div>\n\n        <p class=\"tuitText\">").concat(tweet.text, "</p>\n\n        <div class=\"tuitIcons\">\n            <div class=\"commiButton\">\n                <span class=\"tuitIcon fa fa-comment\"></span>\n                <div class=\"numberCommi\">0</div>\n            </div>\n\n            <div class=\"rtButton\">\n                <span class=\"tuitIcon fa fa-retweet\"></span>\n                <div class=\"numberRt\">0</div>\n            </div>\n\n            <div class=\"likeButton\">\n                <span class=\"tuitIcon fa fa-heart\"></span>\n                <div class=\"numberLikes\">").concat(tweet.likes, "</div>\n            </div>\n\n            <span class=\"tuitIcon fa fa-ellipsis-h\"></span>\n        </div>\n\n    </div>");
  });
  tuitFeed.innerHTML = HTMLString;
  initTweetEvents();
};
/**EVENTOS DE CADA TWEET*/


var initTweetEvents = function initTweetEvents() {
  var tweetsDom = document.querySelectorAll('.tuitFeed .tuit');
  tweetsDom.forEach(function (tweetDom, i) {
    /**BORRAR INDIVIDUAL*/
    var trash = tweetDom.querySelector('.trashButton');
    trash.addEventListener('click', function () {
      tweets.splice(i, 1);
      renderTweets();
    });
    /**LIKES*/

    var like = tweetDom.querySelector('.likeButton');
    like.addEventListener('click', function () {
      tweets[i].likes++;
      renderTweets();
    });
  });
  /**CONTADOR DE TWEETS*/

  document.querySelector('.counterTweets').innerHTML = tweets.length;
};
/**VENTANAL MODAL Y EVENTOS DE VENTANA MODAL*/


var modalFormInit = function modalFormInit() {
  var form = document.forms.new_modal;
  var textarea = form.elements.tuitea;
  var modalTweet = document.querySelector('.modal');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (textarea.value != "") {
      tweets.unshift({
        text: textarea.value,
        likes: 0,
        dateCreation: new Date()
      });
    }

    form.reset();
    renderTweets();
    modalTweet.classList.remove('opened');
    initTweetEvents();
  });
};

var initModalEvents = function initModalEvents() {
  var toggle = document.querySelector('.buttonCreate ');
  var modalTweet = document.querySelector('.modal');
  var closeButton = document.querySelector('.close_button');
  var overlay = document.querySelector('.modal_overlay');
  toggle.addEventListener('click', function (ev) {
    ev.preventDefault();
    modalTweet.classList.add('opened');
    document.body.style.overflow = 'hidden';
  });
  closeButton.addEventListener('click', function (ev) {
    ev.preventDefault();
    modalTweet.classList.remove('opened');
  });
  overlay.addEventListener('click', function () {
    modalTweet.classList.remove('opened');
  });
  modalFormInit();
}; //EXTRAS:  //


var initExtras = function initExtras() {
  var trashAll = document.querySelector('.trashAll');
  trashAll.addEventListener('click', function () {
    tweets.splice(0, tweets.length);
    renderTweets();
  });
};