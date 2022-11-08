
function conteudoSelect(poke){
  if(!poke.id){
    return poke.text
  }
  let url=''
  $.ajax({
    url:`https://pokeapi.co/api/v2/pokemon/${poke.text}`,
    async:false,
    success:function(data){
      url=data.sprites.other['official-artwork'].front_default
    }
  })
   url=$(`<span><img src="${url}" style="max-width: 25%;"/>${poke.text}</span>`)  
  return url
}

function preparaPokemonsEmMassa(results){
  pokemons=results
  let totalPokemons=pokemons.length
  for(let i=0; i<totalPokemons; i++){
    $.ajax({
      type:'GET',
      url:pokemons[i].url,
      async:false,
      success:(dados)=>{
        pokemons[i]['abilities']=dados       
        let j=0
        let lengthAbility=pokemons[i]['abilities']['abilities'].length;              
        const arrayAbility=[]
        for(j=0; j<lengthAbility; j++){
          let objectAbility=pokemons[i]['abilities']['abilities'][j]['ability']['name'];
          arrayAbility.push(objectAbility)     
        }
        pokemons[i]['abilities']['ability']=arrayAbility
      } 
    })
  }        
  return pokemons
}

function preparaResultadoBusca(pokemonId){
   $.ajax({
    type:'GET',
    url:`https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
    async: false,
    success:function(data){          
      pokemon=data
      let abilitiesLenght=pokemon.abilities.length
      const arrayAbility=[]
      for(let i=0; i<abilitiesLenght;i++){
        let objectAbility=pokemon['abilities'][i]['ability']['name'];
        arrayAbility.push(objectAbility)
         pokemon['ability']=arrayAbility
      }
      data={
        name:pokemon.name,
        url:'',
        abilities:pokemon
      }
      dtDataSource.push(data)
    }
  })
}

function dtSearchAction(itemSelecionado, idColuna){
  let idPokemons = itemSelecionado.val();
  if(idPokemons==''||idPokemons==null){
    table.destroy()
    buscaPokemonsEmMassa()
  } else {
    dtDataSource=[]
    for(let i=0; i<idPokemons.length;i++){
     preparaResultadoBusca(idPokemons[i])
    }      
    table.destroy()  
    iniciarDatatables() 
  }    
}

$('#select2').select2({
  ajax: {
     url: function (params) {
      let urlComplemento= params.term ? '/'+params.term : '?limit=10' 
      return 'https://pokeapi.co/api/v2/pokemon' + urlComplemento  ;
    },
    data: params => '',
    processResults: function (data) {
      let id=1;
      let items=[]
      if(!data.abilities){
        items=$.map(data.results,obj=>({
          id:id++,
          text:obj.name
        }))
      } else{
        items=[{
          id:data.id,
          text:data.name          
        }]
      }
      return {
        results: items
      };
    }
  },
  placeholder:'Busque o Pokémon',
  templateResult: conteudoSelect,
  // allowClear: true,
  maximumSelectionLength : 10,
  multiple:true,
})

$('#select2').change(function(){
  dtSearchAction($(this),0)
})
