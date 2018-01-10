//DOMContent Loaded->Add form listeners->user complete search form->run fetch for movie results->get results{Loop through results,clear old results,nav to first page,build html cards,add click listener to cards}->user click movie cards->fetch recommandation by movie id->{get results,clear old results, loop through and build cards,nav to secong page}






const app = {
    pages: [],
    baseURL: 'https://api.themoviedb.org/3/',
    baseImageURL: 'https://',
    configData: null,
    activePage: null,
    keyword: null,
    movie_id:0,
    title: '',
    INPUT: null,
    init: function () {
        //fetch the config info
        app.INPUT = document.getElementById('search-input');
        
        app.INPUT.focus();
        //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runsearch);
        //listen to return or enter press
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13) {
                //they hit <enter> or <return>
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });

    },
    runsearch: function (ev) {
        ev.preventDefault; //best practice
        if (app.INPUT.value) {
            //if theyacyuakky typed something other than <enter>
            //SIX falsey type: false, 0, NAN, Null, undefined, ''
            let url = app.baseURL + 'search/movie?api_key=932e49a260becae1c18a847b27b61a0b';
            url += '&query=' + app.INPUT.value;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data.results);
                })
                .catch(err => {
                    console.log(err);
                })

        }
    },
    showMovies: function(movies) {
        
        let section = document.querySelector('#search-results .content');
        console.log(section);
        let df = document.createDocumentFragment();
        section.innerHTML = ''; //clear and get rid of the previous content
        movies.forEach(function (movie) {
            let div = document.createElement('div');
            div.setAttribute('data-movie',movie.id);
            div.addEventListener('click',app.getRecommended);
            div.classList.add('movie');
            
            let  h2 = document.createElement('h2');
            h2.textContent = movie.title;
            div.appendChild(h2);
           
            let img = document.createElement('img');
            img.src= app.baseImageURL +"/w192/"+ movie.poster_path;
            //img.textContent = movie.poster;
            div.appendChild(img);
            
            let p = document.createElement('p');
            //p.setAttribute('data-overview', movie.overview);
            p.textContent = movie.overview;
            div.appendChild(p);
            
            df.appendChild(div);

        })
        section.appendChild(df);
        app.showResultsPage();
    },
    showResultsPage: function(){
        document.getElementById("search-results").classList.add('active')
        document.getElementById("recommend-results").classList.remove('active')
    },
    showRecommendedPage: function (){
         document.getElementById("search-results").classList.remove('active')
        document.getElementById("recommend-results").classList.add('active')
    },
    
    getRecommended: function(ev){
        let movie_id=ev.target.getAttribute('data-movie');
        console.log(movie_id);
    }
};
//
//<div class="movie" data-movie="435">
//                    <h2 class="">title</h2>
//                    <img src="" alt="" class="poster" />
//                    <p>overview</p>

window.addEventListener('DOMContentLoaded', app.init);

//wait for DOMContentLoaded
//fetch the configuration information for image location anf sizes
//focus on the text field
//listen for click on the search button
//listen for keypress <enter> OR <return>

//after the click/<enter> press run a fetch
////results come back from the fetch
//show movie results page
//loop through the results and build <div>s.

//make something in the div clicable
//get the id from the clicable element
//fetch the recommandations based on the movie id
