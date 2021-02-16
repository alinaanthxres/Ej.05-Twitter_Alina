window.addEventListener('load', () => {
    renderNav();
    initForm();
    renderTweets();
    initTweetEvents();
    initModalEvents();
    initExtras();
});



/**NAVEGADOR DINÁMICO*/

let renderNav = () => {
    let navegador = "";

    for (let i = 0; i < twitterData.navData.length; i++) {
        navegador +=
            `<div class="nav_element">
            <span class="${twitterData.navData[i].icon}"></span>
            <a href="${twitterData.navData[i].link}">${twitterData.navData[i].title}</a>
            </div>`;
    }

    const navData = document.querySelector('.nav');
    navData.innerHTML = navegador;

}

/**TUITEADOR (FORM CENTRAL)*/

let tweets = [];


let initForm = () => {
    let form = document.forms.new;
    let textarea = form.elements.tuitea;

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        if (textarea.value != "") {
            tweets.unshift({
                text: textarea.value,
                likes: 0,
            });
        }

        form.reset();
        renderTweets();
        initTweetEvents();
    });
};


/**PINTADO DE LOS TWEETS*/
let renderTweets = () => {
    let tuitFeed = document.querySelector('.tuitFeed');
    let HTMLString = "";

    tweets.forEach(tweet => {
        HTMLString += `<div class="tuit">

        <div class="tuitIcon">
            <img class="userIcon" src="${twitterData.userData.userIcon}" alt="userIcon">
        </div>

        <div class="tuitUser">
            <h1 class="userName">${twitterData.userData.name}</h1>
            <h2 class="userAt">@${twitterData.userData.userAt}</h2>
            <div class="trashButton">
                <span class="tuitIcon fa fa-trash"></span>
            </div>
        </div>

        <p class="tuitText">${tweet.text}</p>

        <div class="tuitIcons">
            <div class="commiButton">
                <span class="tuitIcon fa fa-comment"></span>
                <div class="numberCommi">0</div>
            </div>

            <div class="rtButton">
                <span class="tuitIcon fa fa-retweet"></span>
                <div class="numberRt">0</div>
            </div>

            <div class="likeButton">
                <span class="tuitIcon fa fa-heart"></span>
                <div class="numberLikes">${tweet.likes}</div>
            </div>

            <span class="tuitIcon fa fa-ellipsis-h"></span>
        </div>

    </div>`
    });
    tuitFeed.innerHTML = HTMLString;
    initTweetEvents();
};


/**EVENTOS DE CADA TWEET*/

let initTweetEvents = () => {
    let tweetsDom = document.querySelectorAll('.tuitFeed .tuit');

    tweetsDom.forEach((tweetDom, i) => {

        /**BORRAR INDIVIDUAL*/
        let trash = tweetDom.querySelector('.trashButton');
        trash.addEventListener('click', () => {

            tweets.splice(i, 1);
            renderTweets();
        });

        /**LIKES*/
        let like = tweetDom.querySelector('.likeButton');
        like.addEventListener('click', () => {

            tweets[i].likes++;
            renderTweets();
        });

    });

    /**CONTADOR DE TWEETS*/
    document.querySelector('.counterTweets').innerHTML = tweets.length;
};

    

/**VENTANAL MODAL Y EVENTOS DE VENTANA MODAL*/

let modalFormInit = () => {
    let form = document.forms.new_modal;
    let textarea = form.elements.tuitea;
    let modalTweet = document.querySelector('.modal');

    form.addEventListener('submit', (ev) => {
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


let initModalEvents = () => {
    let toggle = document.querySelector('.buttonCreate ');
    let modalTweet = document.querySelector('.modal');
    let closeButton = document.querySelector('.close_button');
    let overlay = document.querySelector('.modal_overlay');


    toggle.addEventListener('click', (ev) => {
        ev.preventDefault();
        modalTweet.classList.add('opened');
        document.body.style.overflow = 'hidden';
    });


    closeButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        modalTweet.classList.remove('opened');
    });


    overlay.addEventListener('click', () => {
        modalTweet.classList.remove('opened');
    });

    modalFormInit();
};

//EXTRAS:  //

let initExtras = () => {
    let trashAll = document.querySelector('.trashAll');

    trashAll.addEventListener('click', () => {
        tweets.splice(0, tweets.length);
        renderTweets();
    });

};



