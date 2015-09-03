angular.module('starter.controllers', ['ionic'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {  
    
 });
})

.controller('Abertura', function($scope, $stateParams, $location) {
 setTimeout(function () 
       {          
            $location.path('/tab/dash');     
       }, 2000);
})

.controller('DashCtrl', function($scope, $http, $ionicScrollDelegate, Chats, $ionicPopup, $ionicLoading) {
  $scope.pesquisa = "xxxx";    
  $scope.expres = "";
  $scope.rodape = false;
  $scope.nomes = ""; 
  $scope.erroi = "1";  
  $scope.airlines = [];
  $scope.botaolimpador = false;
  $scope.pesquisa = true;
  
    $scope.limpapesquisa = function (){
      $scope.pesquisa = "xxxx"; 
      $scope.expres = "testes"; 
      $scope.nomes = ""; 
      $scope.erroi = "1";  
      $scope.rodape = false;
      $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
      $scope.botaolimpador = false;
      $scope.pesquisa = true;
    };

    $scope.abreaviso = function(text){
      $scope.rodape = false;
      return $ionicPopup.alert({
                       title: 'ATENÇÃO.',
                       template: text
                     });
    }

    $scope.pesquisar = function(text)  {    
          $scope.botaolimpador = true;
          $scope.pesquisa = false;
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

.controller('ChatsCtrl', function($scope, $rootScope, Chats, $ionicScrollDelegate, $http, $ionicLoading) {

    $scope.nomes  = ""; 

    $scope.rodape = false;
    $scope.numero = false;
    $scope.erroi = "1";   

    $scope.update = function (test){
      console.log(test);
    }

    $scope.inserirnumero = function(nomerua){
      $scope.enderecoselecionado = nomerua;
      $scope.rodape = true;
      $scope.numero = true; 
      $scope.expres2 = nomerua;  

    }

    $scope.limpapesquisa = function (){
        $scope.pesquisa = "xxxx"; 
        $scope.expres = "xxxx";
        $scope.expres2 = "";  
        $scope.nomes  = "";  
        $scope.erroi = "1";  
        $scope.rodape = false;
        $scope.numero = false; 

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
               
                $scope.nomes = Chats.listagemenderecos($scope.pesquisa);
                $scope.erroi = "2";  
                $ionicLoading.hide(); 
                $scope.rodape = true; 
    };               
    
   
})

.controller('VerDetalhes', function($scope, $stateParams, Chats) {
  $scope.nomes  = "";  
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('DetalhesContatoSelecionado', function($scope, $stateParams, Chats, $ionicPopup, $window) {
 

  $scope.favo = $window.localStorage && $window.localStorage.getItem('my-storage');
  $scope.results = [ 
      ];

   $scope.favoritar = function (data){

      var itens   =   data.split("*"); 
      var arrObjetos = [{strNome:itens[1], strEndereco:itens[2], strTelefone1:itens[3], strTelefone2:itens[4], strTelefone3:itens[5], pic:itens[6]}];
       Chats.incluiFavoritos(arrObjetos);  


      return $ionicPopup.alert({
                       title: 'ATENÇÃO.',
                       template: 'Você incluiu <b>'+itens[1]+'</b> na sua lista de favoritos.<br><br> Para você visualizar sua lista de favoritos, acesso o menu suspenso e toque em FAVORITOS.'
                     });

          
    
    }
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('Sugestoes', function($scope, $stateParams, Chats, $http, $ionicPopup, $ionicLoading) {
 $scope.veritem = false;

 $scope.exibedetalhes = function (){
  $scope.veritem = true;
 }

 $scope.submit = function(contactform, formData) {
    $ionicLoading.show({
            content: 'Carregando Unidades',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
            if (contactform.$valid) {             
                $http({
                    method  : 'POST',
                    url     : 'http://www.jornaldopovo.com.br/guiafoneApp/sugestoes.php?telefone='+formData['telefone']+'&email='+formData['email']+'&assunto='+formData['assunto']+'&texto='+formData['texto'],
                    data    : $scope.formData,  //param method from jQuery //set the headers so angular passing info as form data (not request payload)
                }).success(function(data){
                      $ionicLoading.hide(); 
                      return $ionicPopup.alert({
                       title: 'ATENÇÃO.',
                       template: 'Sua mensagem foi enviada com sucesso !<br><br> Em breve entraremos em contato.'
                     });
                    
                }).error(function(data){
                  $ionicLoading.hide(); 
                  return $ionicPopup.alert({
                       title: 'ERRO.',
                       template: 'Houve um erro no envio, verifique sua conexão, ou tente novamente.'
                     });
                });
            } else {
                return $ionicPopup.alert({
                       title: 'ERRO.',
                       template: 'Houve um erro no envio, verifique sua conexão, ou tente novamente.'
                     });
            }
            formData['assunto'] = null;
          formData['telefone'] = null;
          formData['texto'] = null;
          formData['email'] = null;
        }})

.controller('Cadastro', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup) {
    $scope.submit = function(contactform, formData) {

    $ionicLoading.show({
            content: 'Carregando Unidades',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
            if (contactform.$valid) {             
                $http({
                    method  : 'POST',
                    url     : 'http://www.jornaldopovo.com.br/guiafoneApp/inscrevase.php?telefone='+formData['telefone']+'&email='+formData['email']+'&nome='+formData['nome']+'&observacao='+formData['observacao']+'&endereco='+formData['endereco']+'&telefone2='+formData['telefone1']+'&telefone3='+formData['telefone2'],
                    data    : $scope.formData,  //param method from jQuery //set the headers so angular passing info as form data (not request payload)
                }).success(function(data){
                      $ionicLoading.hide(); 
                      return $ionicPopup.alert({
                       title: 'ATENÇÃO.',
                       template: 'Sua mensagem foi enviada com sucesso !<br><br> Em breve entraremos em contato.'
                     });
                    
                }).error(function(data){
                  $ionicLoading.hide(); 
                  return $ionicPopup.alert({
                       title: 'ERRO.',
                       template: 'Houve um erro no envio, verifique sua conexão, ou tente novamente.'
                     });
                });
            } else {
                return $ionicPopup.alert({
                       title: 'ERRO.',
                       template: 'Houve um erro no envio, verifique sua conexão, ou tente novamente.'
                     });
            }

          formData['nome'] = null;
          formData['endereco'] = null;
          formData['telefone'] = null;
          formData['telefone1'] = null;
          formData['telefone2'] = null;
          formData['email'] = null;
          formData['observacao'] = null;
        }
})

.controller('Anuncie', function($scope, $stateParams, $http, $ionicLoading, $ionicPopup) {
    $scope.submit = function(contactform, formData) {
    $ionicLoading.show({
            content: 'Carregando Unidades',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
            if (contactform.$valid) {             
                $http({
                    method  : 'POST',
                    url     : 'http://www.jornaldopovo.com.br/guiafoneApp/anuncie.php?telefone='+formData['telefone']+'&email='+formData['email']+'&nome='+formData['nome']+'&observacao='+formData['observacao']+'&endereco='+formData['endereco'],
                    data    : $scope.formData,  //param method from jQuery //set the headers so angular passing info as form data (not request payload)
                }).success(function(data){
                      $ionicLoading.hide(); 
                      return $ionicPopup.alert({
                       title: 'ATENÇÃO.',
                       template: 'Sua mensagem foi enviada com sucesso !<br><br> Em breve entraremos em contato.'
                     });
                    
                }).error(function(data){
                  $ionicLoading.hide(); 
                  return $ionicPopup.alert({
                       title: 'ERRO.',
                       template: 'Houve um erro no envio, verifique sua conexão, ou tente novamente.'
                     });
                });
            } else {
                return $ionicPopup.alert({
                       title: 'ERRO.',
                       template: 'Houve um erro no envio, verifique sua conexão, ou tente novamente.'
                     });
            }

          formData['nome'] = null;
          formData['endereco'] = null;
          formData['telefone'] = null;
          formData['telefone1'] = null;
          formData['telefone2'] = null;
          formData['email'] = null;
          formData['observacao'] = null;
        }
})

.controller('Configuracoes', function($scope, $stateParams, Chats) {
  $scope.nomes  = "";  
  $scope.versao = "2.0.9";
  $scope.mes = "Julho/2015"; 
})

.controller('Favoritos', function($scope, $stateParams, Chats, $ionicModal, $http, $window, $interval) {
 

    $interval(function() {
       //$window.location.reload();
       $scope.count = 1;
    }, 10000);

    
   $scope.stopTimer = function() {
          $window.location.reload(false);
    };

 //  $window.location.reload();
  $scope.fechajanela = function(){
    return $scope.modal.hide(); 
    } 
  
    $scope.post = Chats.favoritos();
  
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

 //$scope.chat = Chats.categorias($stateParams.chatId);
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
