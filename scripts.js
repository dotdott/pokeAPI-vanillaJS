const displayResult = document.querySelector('.display-results');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.previous-btn');

let pageNumber = 0;
let url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

function nextPage(){
    pageNumber += 10;
    url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageNumber}`
    searchPokemons();
}

function previousPage(){
    if(pageNumber >= 10){
        pageNumber -= 10;
        url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageNumber}`
        searchPokemons();
    }
}

function searchPokemons(){
    fetch(url).then(result => {
        return result.json();
    }).then(json => {    
        const pokemons = json.results.map(obj =>{
            const para = document.createElement('p');
            const img = document.createElement('img');
            const article = document.createElement('article');

            const url = obj.url;
            fetch(url).then(response => {
                return response.json();
            }).then(json => {
                para.textContent = obj.name;
                img.src = json.sprites.other['official-artwork']['front_default'];
                
                displayResult.appendChild(article);
                article.appendChild(para);
                article.appendChild(img);
            })
            nextBtn.onclick = nextPage;
            previousBtn.onclick = previousPage;
            displayResult.innerHTML = null;
        });
    });
};
searchPokemons();
