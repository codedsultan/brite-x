<script>
	// PokeList.svelte
	const pageName="Poke-List";
	import { onMount } from 'svelte';
    import {getEvents, getOrganizations} from './services/BriteService'
	// import { getPokemonList, getPokemonByName } from "../api/pokemon"; 
    import {o_O} from './Helpers'
      
	let pokemonDetail = {};
	let pokemonList = [];
    let events = {
		data :{ events:''}
	};
    let error = null;
    let response = null;
    let organizations = null;
    let eventlength = null;
  
	// Get the data from the api, after the page is mounted.
	onMount(async () => {
        handleFetch('144370389754');
        handleFetchOrgs('FYE26YJH3ZU4ULOYNERD');
          const s = document.createElement('script');
          s.type = 'text/x-content';
          s.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
          document.body.appendChild(s);
          
        //   handleCheck()
	//   const res = await getPokemonList();
	//   pokemonList = res;
	});
  
	// method to handle the event to get the detail of the pokemon.
	const handleOnClick = event =>{
	  const name = event;
	  handleCheck(name)
	//   .then(res => {
	// 	pokemonDetail= {
	// 	  name,
	// 	  types: res.types,
	// 	  image: res.sprites.front_default
	// 	};
	//   });
	};
    async function handleFetch(x){
        let [err, data] = await o_O(getEvents(x));
              if(err){
                  error = err.response.data;
                  response = null;
              }else{
                events = data
                eventlength = events.data.events.length
              }
			  console.log(events.data.events)
              
        // return getEvents()
      };
      async function handleFetchOrgs(x){
        let [err, data] = await o_O(getOrganizations(x));
              if(err){
                  error = err.response.data;
                  response = null;
              }

              organizations = data
        // return getEvents()
      };

	  const exampleCallback = () => {
        console.log('Order complete!');
    };

	// const getPokemonTypes = () => {
	//   return pokemonDetail.types.map(e => e.type.name).join(",");
	// };

    const  handleCheck  = (x) => {
        window.EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: x,
        modal: true,
        modalTriggerElementId: 'eventbrite-widget-modal-trigger-' + x,
        onOrderComplete: exampleCallback
    });
    };
  </script>
  
  <style>
  main {
		  text-align: center;
		  padding: 1em;
		  max-width: 240px;
		  margin: 0 auto;
	  }
  
	  h1 {
		  color: #ff3e00;
		  text-transform: uppercase;
		  font-size: 4em;
		  font-weight: 100;
	  }
  
	  @media (min-width: 640px) {
		  main {
			  max-width: none;
		  }
	  }
	.pokemonDetails{
	  float: right;
	  width: 500px;
	   text-transform: capitalize;
	}
	.pokemonList{
	  width: 300px;
	  float: left;
	  max-height: 400px;
	  overflow-y: auto;
	}
	.pokemonList li{
	  list-style: none;
	  text-align: left;
	  margin-bottom: 5px;
	}
	.pokemonList .pokeName{
	  text-transform: capitalize;
	  font-size: 18px;
	  font-weight: 700;
	}
	button {
	  background: none!important;
	  border: none;
	  padding: 0!important;
	  color: #069;
	  text-decoration: underline;
	  cursor: pointer;
	}
  </style>
  
  <main>
	  <h1> </h1>
	  <p>Welcome to my <b>{ events.data.events}</b></p>
	  <ul  class="pokemonList">
        {#each events.data.events as pokemon}
            <li>
              <label class="pokeName">
                {pokemon.name.text}
              </label>
              <button 
                type="button" 
                name={pokemon.name.text}
                on:click={handleOnClick(pokemon.id)}>See Details</button>
            </li>
        {/each}
      </ul>
  </main>