// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = '2501-PUPPIES';
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

// ADDED AN OBJECT TO UPDATE AFTER EACH API CALL IS MADE
const state = {
  allPlayers: [],
  singlePlayer: {},
}

const newPlayerForm = document.querySelector("#new-player-form")
const main = document.querySelector('main')

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async()=> {
  try {
    const res = await fetch(`${API_URL}`)
    console.log(res)
    const data = await res.json()
    console.log(data)

    state.allPlayers = data.data.players;
    return state.allPlayers
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const res = await fetch(`${API_URL}/${playerId}`);
    const data = await res.json();
    
    console.log(data.data.player)
    state.singlePlayer = data.data.player
  
    return state.singlePlayer
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};
fetchSinglePlayer(29656)
/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
        const res = await fetch(`${API_URL}`,{
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: `${playerObj}.name`, 
            breed: `${playerObj}.id`,
            status: `${playerObj}.status`,
            imageUrl: `${playerObj}.imageUrl`,
            teamId: `${playerObj}.teamId`})
        });
        
      }catch (err) {
        console.error("Opops, something went wrong with that player!",err);
      }}

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  main.innerHTML = ""
  // TODO
  console.log(playerList)
  if(Array.isArray(playerList)){
    playerList.forEach((player) => {
      const card = document.createElement('div')
      card.classList.add('card')
      card.innerHTML = `
      <h1> ${player.name} </h1>
      <p> Player ID: ${player.id} </p>
      <img src="${player.imageUrl}" alt="${player.name}">
      <button class="seeDetails" data-id=${player.id}> See Details </button>
      <button class="removePlayer"> Remove Player </button>
      `
      main.append(card)
    } )
    const buttons = document.querySelectorAll('.seeDetails')
    buttons.forEach((button)=>{
      button.addEventListener('click', async (e)=>{
       renderAllPlayers (await fetchSinglePlayer(e.target.dataset.id))
      })
   })
  }else{
    const card = document.createElement('div')
    card.classList.add('card','single')
    card.innerHTML = `
    <img src="${playerList.imageUrl}" alt="${playerList.name}">
      <h1>${playerList.name}</h1>
      <p> ${playerList.id}</p>
      <button class="getDetails" id="goBack"> Go Back </button>
      <button class="removePlayer"> Remove Player </button>
    `
    main.replaceChildren(card)

    const button = document.querySelector("#goBack")
    button.addEventListener('click', ()=>{
      renderAllPlayers (state.allPlayers)
    })

    const buttonFav = document.querySelector("#remove")
    button.addEventListener('click', ()=>{
      renderAllPlayers (state.allPlayers)
    })

  };
}

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO -- DONE
};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick    removePlayer,    removePlayer,    removePlayer,
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
