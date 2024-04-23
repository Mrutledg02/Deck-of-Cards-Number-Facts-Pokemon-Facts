// Get a random integer between min and max (both inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

// 1. Make a single request to the Pokemon API to get names and URLs for every pokemon in the database.

function getAllPokemon() {
    return new Promise((resolve, reject) => {
      fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(response => response.json())
        .then(data => resolve(data.results))
        .catch(error => reject(error));
    });
  }

  // 2. Pick three at random and make requests to their URLs. Once those requests are complete, console.log the data for each pokemon.

  function getRandomPokemon() {
    return getAllPokemon()
      .then(pokemonList => {
        const randomPokemon = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = getRandomInt(0, pokemonList.length - 1);
          randomPokemon.push(pokemonList[randomIndex]);
        }
        return Promise.all(randomPokemon.map(pokemon => fetch(pokemon.url).then(response => response.json())));
      })
      .then(pokemonData => {
        pokemonData.forEach(pokemon => createPokemonCard(pokemon));
      })
      .catch(error => console.error(error));
  }

  // 3. Store the name of the pokemon in a variable and then make another request to that pokemon’s species URL. Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. If you find one, console.log the name of the pokemon along with the description you found.

  function getPokemonDescription(pokemon) {
    fetch(pokemon.species.url)
      .then(response => response.json())
      .then(speciesData => {
        const englishEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
        const description = englishEntry ? englishEntry.flavor_text : "No English description available.";
        const card = document.getElementById(pokemon.name);
        card.querySelector('.pokemon-description').textContent = description;
      })
      .catch(error => console.error(error));
  }

    // Create a card for the pokemon
    function createPokemonCard(pokemon) {
        const container = document.getElementById('pokemonContainer');
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = pokemon.name;
  
        const name = document.createElement('div');
        name.classList.add('pokemon-name');
        name.textContent = pokemon.name;
  
        const image = document.createElement('img');
        image.classList.add('pokemon-image');
        image.src = pokemon.sprites.front_default;
        image.alt = pokemon.name;
  
        const description = document.createElement('div');
        description.classList.add('pokemon-description');
  
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(description);
  
        container.appendChild(card);
  
        // Get the description for the pokemon
        getPokemonDescription(pokemon);
      }
  
      // Button event listener
      document.getElementById('generateBtn').addEventListener('click', () => {
        getRandomPokemon();
      });