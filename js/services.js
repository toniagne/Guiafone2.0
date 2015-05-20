angular.module('starter.services', [])

.factory('Chats', function($http) {

  var chats = $http.get('data/todos.json')                  
                  .then(        
                      function(res){   
                       return res.data;  
                       }); 
 

  return {
    all: function() {
      return chats;
    },
    listagem: function(text) {
     var conteudo = chats.$$state.value;
     var results = [];

     var itens = text.split(" ");  
     var termo1 = itens[0];
     var termo2 = itens[1];

      for(var i=0; i<conteudo.length; i++) {
        for(key in conteudo[i]) {
          if(conteudo[i][key].indexOf(termo1)!=-1 || conteudo[i][key].indexOf(termo2)!=-1) {
              results.push(conteudo[i]);            
          }    
        }
      } 


      return results;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
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
