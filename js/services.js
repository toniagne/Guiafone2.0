angular.module('starter.services', ['ngStorage'])

.factory('Chats',  function($http, $window, $localStorage) {
  var chats = $http.get('data/todos.json')                  
                  .then(        
                      function(res){   
                       return res.data;  
                       }); 
  var favoritos =  $window.localStorage && $window.localStorage.getItem('my-storage');   


  return {
    all: function() {
      return chats;
    },

    incluiFavoritos: function(itens){    

       $localStorage.favoritando = JSON.stringify(itens[0]);


    /*
     var favoritosObject = JSON.parse(favoritos);
     var favoritosObject = [];
     var resultado = favoritosObject.push(itens[0])
     localStorage.setItem("favoritos", favoritosObject);
     $localStorage.favoritosNovo = resultado;
     localStorage["names"] = JSON.stringify(favoritosObject);      
     $window.localStorage && $window.localStorage.setItem('my-storage', localStorage["names"]);
    */



    },

    listagem: function(text) {
      function replaceSpecialChars(str)
            {
                str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
                str = str.replace(/[àáâãäå]/,"a");
                str = str.replace(/[ÈÉÊË]/,"E");
                str = str.replace(/[Ç]/,"C");
                str = str.replace(/[ç]/,"c"); 
                return str.replace(/[^a-z0-9]/gi,''); 
            }

     var conteudo = chats.$$state.value;
     var results = [];

     var itens = text.split(" ");  
     var termo1 = replaceSpecialChars(itens[0]);
     var termo2 = itens[1];

     if (!termo2){
      for(var i=0; i<conteudo.length; i++) {
        for(key in conteudo[i]) {
          if(conteudo[i][key].indexOf(termo1)!=-1) {
              results.push(conteudo[i]);            
          }    
        }
      } 
     }
     else if (!termo1){

     } else{
      for(var i=0; i<conteudo.length; i++) {
        for(key in conteudo[i]) {
          if(conteudo[i][key].indexOf(termo1)!=-1 && conteudo[i][key].indexOf(termo2)!=-1) {
              results.push(conteudo[i]);            
          }    
        }
      } 
     }
      


      return results;
    },

    listagemCategorias: function(text) {  

     var conteudo = chats.$$state.value;
     var results = []; 

     for(var i=0; i<conteudo.length; i++) {
        for(key in conteudo[i]) {
          if(conteudo[i][key].indexOf(text)!=-1) {
              results.push(conteudo[i]);            
          }    
        }
      }    
      return results; 
      },

     listagemenderecos: function(text) {     
     var conteudo = chats.$$state.value;
     var results = []; 

     for(var i=0; i<conteudo.length; i++) {
        for(key in conteudo[i]) {
          if(conteudo[i][key].indexOf(text)!=-1) {
              results.push(conteudo[i]);            
          }    
        }
      }    
      return results;
    },

    favoritos: function() {       
    
      console.log(JSON.parse($localStorage.favoritando));
     return  JSON.parse($localStorage.favoritando);
 
    },

    get: function(chatId) {
      var itens = chatId.split("*"); 
                             var detalheContato = [
                                {
                                    "id": itens[0], 
                                    "strNome": itens[1], 
                                    "strTelefone1": itens[2], 
                                    "strTelefone2": itens[3], 
                                    "strTelefone3": itens[4], 
                                    "strEndereco":  itens[5], 
                                    "fotoInterna": itens[6], 
                                    "pic": itens[7] 
                                  },
                             ];         
                        return detalheContato[0];    
                      },
     categorias: function(chatId) {
                             var detalheContato = [
                                {
                                    "nome": chatId
                                  },
                             ];         
                        return detalheContato[0];    
                      }
  };
});
