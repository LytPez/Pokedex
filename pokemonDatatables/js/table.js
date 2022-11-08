let dtDataSource=[]
let table={}

function iniciarDatatables(){
  table=$('#myTable').DataTable({  
   order:[[2,'asc']],
   dom:'Brtip',
   buttons: [
     'pdf'
   ],
   data:dtDataSource,
   columns:[
     {data:'abilities.id'},
     {
       data: function(pokemon){
         let linkImage=pokemon['abilities']['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
         if(!linkImage){
           linkImage=pokemon['abilities']['sprites']['other']['official-artwork']['front_default']
         }
         return linkImage
       },
       render: function(data){
         return `<img src="${data}" style="height: 75px; width: 75px;">`;
       },
     },  
     {data:'name'},
     {
       data:'abilities.ability',
       render: function(data){
         let listaOrdenada=[]
        data.forEach(element => {
          listaOrdenada.push(`<li>${element}</li>`) 
         })     
         return `<ul>${listaOrdenada.join('')}</ul>`    
       }
     },    
   ], 
 })
} 

async function buscaPokemonsEmMassa(){
   await $.ajax({
    url:'https://pokeapi.co/api/v2/pokemon?limit=50',
    success: function(response){
      dtDataSource=preparaPokemonsEmMassa(response.results)   
    },
  })

  iniciarDatatables()
}

buscaPokemonsEmMassa()