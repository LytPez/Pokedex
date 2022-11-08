const pokemonName= document.querySelector('.pokemon_name');
const pokemonNumber= document.querySelector('.pokemon_number');
const pokemonImage= document.querySelector('.pokemon_image');

const form= document.querySelector('.form');
const input= document.querySelector('.input_search');

const buttonPrev= document.querySelector('.btn-prev');
const buttonNext= document.querySelector('.btn-next');

const pokeImage= document.querySelector('.poke-image');

const paragrafoType= document.querySelector('.type')
const paragrafoAbility= document.querySelector('.ability');
const paragraDescricao = document.querySelector('.description');
const divContainerDetails=document.querySelector('.container-status');

const btnStatus= document.getElementById('button-status');




let searchPokemon=1;

const fetchPokemon= async (pokemon)=>{
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);  
  if(APIResponse.status === 200){
    const data= await APIResponse.json();
    return data
  } 
};

const renderPokemon= async (pokemon)=>{
  pokemonName.innerHTML='Loading ...';
  pokemonNumber.innerHTML='';
  const data = await fetchPokemon(pokemon);
  if(data){
    pokemonImage.style.display='block';
    pokemonName.innerHTML=data.name;
    pokemonNumber.innerHTML=data.id;
    pokemonImage.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];    
    input.value='';
    
    pokeImage.src=data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];   

    input.value='';

    searchPokemon= data.id;
    paragrafoType.innerText=data.types[0].type.name;

    const valorAbility=data.abilities[0].ability.name;
    const complementoAbility= async ()=>{
    
      const apiComplemento= await fetch(`https://pokeapi.co/api/v2/ability/${valorAbility}/`);
    
      const descricao= await apiComplemento.json();
      
      const textoAbility=descricao.effect_entries[0].effect;

      paragrafoAbility.innerText=valorAbility+': '+textoAbility;
    }    
    complementoAbility();

    const descricaoPokemon= async()=>{
      const personalidade = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`);

      const responsePersonalidade = await personalidade.json();

      const textoSpecies= responsePersonalidade.flavor_text_entries[0].flavor_text;

      paragraDescricao.innerHTML=textoSpecies

    }
    descricaoPokemon();
  } else{
    pokemonName.innerHTML='Not found :c';
    pokemonNumber.innerHTML='';
    input.value='';
    pokemonImage.style.display='none';
  }
  
};

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());  
});

buttonPrev.addEventListener('click',()=>{
  if(searchPokemon >1){
    searchPokemon-=1;
  renderPokemon(searchPokemon);
  } ;
});
buttonNext.addEventListener('click',()=>{
  searchPokemon+=1;
  renderPokemon(searchPokemon);
});

const typePokemon = async (type)=>{
  const typePoke = await fetchPokemon(pokemon);
  
};
let aux=1
function ativar(a){
  divContainerDetails.classList.toggle('ativo')
  console.log(divContainerDetails.classList)
  if( divContainerDetails.classList[1]=='ativo'){
    btnStatus.innerText='Pokémon'
  } else{
    btnStatus.innerText='Detalhes'
  }
}
btnStatus.addEventListener('click', ativar);

renderPokemon(searchPokemon);