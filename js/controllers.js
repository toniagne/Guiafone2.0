angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, $http, $ionicScrollDelegate, $ionicPopup, $ionicLoading) {

  $scope.pesquisa = "xxxx";    
  $scope.rodape = false;
  $scope.employees = ""; 
  $scope.erroi = "1";  

    $scope.limpapesquisa = function (){
      $scope.pesquisa = "xxxx"; 
      $scope.expres = "";
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

               var expressao = text.split(" ");               
                $http.get('data/todos.json')
                  .success(function(data) {
                    $scope.erroi = "2";  
                    $ionicLoading.hide(); 
                    $scope.rodape = true;
                   })
                  .then(        
                      function(res){
                        $scope.nomes  = res.data;        
                       });     
                      $scope.pesquisa = text;  
    };     

})

.controller('MenuCtrl', function($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
	$scope.showPopup = function () {
     $ionicPopup.alert({
       title: 'Popup',
       content: 'This is ionic popup alert!'
     });
    };
    $scope.showActionsheet = function () {
        $ionicActionSheet.show({
          titleText: 'Ionic ActionSheet',
          buttons: [
            {
              text: 'Facebook'
            },
            {
              text: 'Twitter'
            },
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function () {
            console.log('CANCELLED');
          },
          buttonClicked: function (index) {
            console.log('BUTTON CLICKED', index);
            return true;
          },
          destructiveButtonClicked: function () {
            console.log('DESTRUCT');
            return true;
          }
        });
    };
    $ionicModal.fromTemplateUrl('templates/modal.html', function (modal) {
        $scope.modal = modal;
      }, {
        animation: 'slide-in-up'
      });
})



.controller('ChatsCtrl', function($scope, Chats, $ionicScrollDelegate, $http, $ionicLoading) {
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
               
                $http.get('data/todos.json')
                  .success(function(data) {
                    $scope.erroi = "2";  
                    $ionicLoading.hide(); 
                    $scope.rodape = true;
                   })
                  .then(        
                      function(res){
                        $scope.nomes  = res.data;        
                       });   
    };               
    
   
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('DetalhesContatoSelecionado', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $http) {
   $http.get('data/uteis.json')
                  .success(function(data) { 
                   })
                  .then(        
                      function(res){
                        $scope.uteis  = res.data;        
                       }); 
});
