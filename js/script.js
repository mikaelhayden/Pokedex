const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImage');
const form = document.querySelector('.form');
const search = document.querySelector('.inputSearch');
const prev = document.querySelector('.anterior');
const next = document.querySelector('.proximo');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200)
    {
        const data = await APIResponse.json();
        return data;
    }
    
}

const RPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data)
    {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search.value = '';
        searchPokemon = data.id;
    }
    else
    {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    RPokemon(search.value.toLowerCase());
});

prev.addEventListener('click', () => {
    if(searchPokemon >1)
    {
        searchPokemon-=1;
        RPokemon(searchPokemon);
    }
    
});

next.addEventListener('click', () => {
    searchPokemon+=1;
    RPokemon(searchPokemon);
});


RPokemon(searchPokemon);