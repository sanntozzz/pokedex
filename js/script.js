const pokemonNumber = document.querySelector('.pokemonID')
const pokemonName = document.querySelector('.pokemonName')
const pokemonImage = document.querySelector('.pokemonImage')

const pokedexForm = document.querySelector('.pokedexForm')
const pokedexInput = document.querySelector('.pokedexForm input')
const buttonPrev = document.querySelector('.btnPrev')
const buttonNext = document.querySelector('.btnNext')

let searchPokemon = 1

async function fetchPokemon(pokemon) {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    )

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

async function renderPokemon(pokemon) {
    pokemonNumber.innerHTML = 'Loading...'
    pokemonName.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (!data) {
        pokemonNumber.innerHTML = ''
        pokemonName.innerHTML = '- Not found -'
        pokemonImage.style.display = 'none'
    }

    searchPokemon = data.id
    pokemonNumber.innerHTML = data.id + ' - '
    pokemonName.innerHTML = data.name
    pokemonImage.style.display = ''
    pokemonImage.src =
        data['sprites']['versions']['generation-v']['black-white']['animated'][
            'front_default'
        ]
    pokemonImage.alt = data.name
    data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
    ]
    pokedexInput.value = ''
}

pokedexForm.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(pokedexInput.value.toLowerCase())
})

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) searchPokemon--

    renderPokemon(searchPokemon)
})

buttonNext.addEventListener('click', () => {
    searchPokemon++
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
