angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, $http, $ionicScrollDelegate, Chats, $ionicPopup, $ionicLoading) {

  $scope.pesquisa = "xxxx";    
  $scope.expres = "";
  $scope.rodape = false;
  $scope.nomes = ""; 
  $scope.erroi = "1";  
  $scope.airlines = [];
  
    $scope.limpapesquisa = function (){
      $scope.pesquisa = "xxxx"; 
      $scope.expres = "";
      $scope.nomes = ""; 
      $scope.erroi = "1";  
      $scope.rodape = false;
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    };

    $scope.abreaviso = function(text){
      $scope.rodape = false;
      return $ionicPopup.alert({
                       title: 'ATENÇÃO.',
                       template: text
                     });
    }

    $scope.pesquisar = function(text)  {          
          $ionicLoading.show({
            content: 'Carregando Unidades',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
          

                var textodigita   = text.toLowerCase();   

                $scope.nomes = Chats.listagem(textodigita);
                $scope.erroi = "2";  
                $ionicLoading.hide(); 
                $scope.rodape = true;

                if ($scope.nomes.length == 0) {
                  $ionicPopup.alert({
                     title: 'Aviso',
                     content: 'se você não encontrou quem estava buscando, procure digitar somente o nome ou sobrenome, os clientes GuiafoneJP podem estar abreviados.'
                   }); 
                }
    };     

})

.controller('MenuCtrl', function($scope, $ionicPopup, $ionicActionSheet, $ionicModal) { 


    $ionicModal.fromTemplateUrl('templates/modal.html', function (modal) {        
        $scope.modal = modal;
        $scope.teste = function (){consoel.log("vaimerda");}
      }, {
        animation: 'slide-in-up'
      }).then(function(modal) {
      $scope.modal = modal;
    });
 

}) 

.controller('ChatsCtrl', function($scope, Chats, $ionicScrollDelegate, $http, $ionicLoading) {
    $scope.nomes  = "";  
    $scope.rodape = false;
    $scope.numero = false;
    $scope.erroi = "1";  
    $scope.expres = "";

    $scope.inserirnumero = function(nomerua){
      $scope.enderecoselecionado = nomerua;
      $scope.numero = true;
    }

    $scope.limpapesquisa = function (){
        $scope.pesquisa = "xxxx"; 
        $scope.expres = "";
        $scope.nomes  = "";  
        $scope.erroi = "1";  
        $scope.rodape = false;
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
      };

    $http.get('data/enderecos.json')
                  .success(function(data) {
                    $scope.rodape = true;
                   })
                  .then(        
                      function(res){
                        $scope.enderecos  = res.data;        
                  });     


    $scope.pesquisar = function(text)  { 
          $scope.pesquisa = $scope.enderecoselecionado+', '+text; 
          $ionicLoading.show({
            content: 'Carregando Unidades',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
               
                $scope.nomes = Chats.listagem($scope.pesquisa);
                $scope.erroi = "2";  
                $ionicLoading.hide(); 
                $scope.rodape = true; 
    };               
    
   
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.nomes  = "";  
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('DetalhesContatoSelecionado', function($scope, $stateParams, Chats, $ionicPopup) {
  
   $scope.favoritar = function (data){
 
      $scope.favo = JSON.parse(window.localStorage['post']);
      var itens = data.split("*"); 
      $scope.favo.push({strNome:itens[1], strEndereco:itens[2], strTelefone1:itens[3], strTelefone2:itens[4], strTelefone3:itens[5], pic:itens[6]})
      window.localStorage['post'] = JSON.stringify($scope.favo);

    return $ionicPopup.alert({
                       title: 'ATENÇÃO.',
                       template: 'Você incluiu <b>'+itens[1]+'</b> na sua lista de favoritos.<br><br> Para você visualizar sua lista de favoritos, acesso o menu suspenso e toque em FAVORITOS.'
                     });
    }
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('Sugestoes', function($scope, $stateParams, Chats) {
  $scope.nomes  = "";    
})

.controller('Cadastro', function($scope, $stateParams, Chats) {
  $scope.nomes  = "";   
})

.controller('Configuracoes', function($scope, $stateParams, Chats) {
  $scope.nomes  = "";   
})

.controller('Favoritos', function($scope, $stateParams, Chats, $ionicModal, $http) {
  $scope.fechajanela = function(){
    return $scope.modal.hide(); 
    } 
    $scope.post = JSON.parse(window.localStorage['post'] || '{}');    
 
 
})

.controller('SegmentosDetalhes', function($scope, $http, $stateParams, Chats, $ionicLoading) {
   $ionicLoading.show({
            content: 'Carregando Unidades',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
               
 $scope.nomes = Chats.listagemCategorias($stateParams.chatId);
                $scope.erroi = "2";  
                $ionicLoading.hide(); 
                $scope.rodape = true;

  $scope.chat = Chats.categorias($stateParams.chatId);
})

.controller('Segmentos', function($scope, $http, $ionicLoading) { 
  $ionicLoading.show({
            content: 'Carregando Unidades',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
   $http.get('data/categorias.json')
                  .success(function() { 
                    $ionicLoading.hide(); 
                   })
                  .then(        
                      function(res){
                        $scope.segmentos  = res.data;    

                       }); 
})

.controller('AccountCtrl', function($scope, $http) {
  $scope.nomes  = "";  
   $http.get('data/uteis.json')
                  .success(function(data) { 
                   })
                  .then(        
                      function(res){
                        $scope.uteis  = res.data;        
                       }); 
});
