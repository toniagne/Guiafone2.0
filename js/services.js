angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [];

  return {
    all: function() {
      return chats;
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
                      }
  };
});
