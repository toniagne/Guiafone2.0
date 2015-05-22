// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider 

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.abertura', {
    url: '/abertura',
    views: {
      'tab-abertura': {
        templateUrl: 'templates/abertura.html',
        controller: 'Abertura'
      }
    }
  })
  // Each tab has its own nav history stack:
  .state('tab.segmentos', {
    url: '/segmentos',
    views: {
      'tab-segmentos': {
        templateUrl: 'templates/segmentos.html',
        controller: 'Segmentos'
      }
    }
  })
  .state('tab.segmentos-detalhes', {
    url: '/segmentos/:chatId',
    views: {
      'tab-segmentos': {
        templateUrl: 'templates/tab-segmentos-detalhes.html',
        controller: 'SegmentosDetalhes'
      }
    }
  })
  .state('tab.segmentos-detalhes-contato', {
    url: '/segmentos/detalhes/:chatId',
    views: {
      'tab-segmentos': {
        templateUrl: 'templates/tab-dash-detalhes.html',
        controller: 'DetalhesContatoSelecionado'
      }
    }
  })
  .state('tab.servicos-sugestoes', {
    url: '/servicos/sugestoes',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/sugestoes.html',
        controller: 'Sugestoes'
      }
    }
  })
  .state('tab.servicos-cadastro', {
    url: '/servicos/cadastro',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/cadastro.html',
        controller: 'Cadastro'
      }
    }
  })
  .state('tab.servicos-configuracoes', {
    url: '/servicos/configuracoes',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/configuracoes.html',
        controller: 'Configuracoes'
      }
    }
  })
  .state('tab.servicos-favoritos', {
    url: '/servicos/favoritos',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/favoritos.html',
        controller: 'Favoritos'
      }
    }
  })
  .state('tab.servicos-sobre', {
    url: '/servicos/sobre',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/sobre.html',
        controller: 'Configuracoes'
      }
    }
  })
    .state('tab.servicos-termos', {
    url: '/servicos/termos',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/termos.html',
        controller: 'Configuracoes'
      }
    }
  })
    .state('tab.servicos-anuncie', {
    url: '/servicos/anuncie',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/anuncie.html',
        controller: 'Anuncie'
      }
    }
  })
    .state('tab.servicos-sistema', {
    url: '/servicos/sistema',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/sistema.html',
        controller: 'Configuracoes'
      }
    }
  })



  .state('tab.servicos-detalhes-contato', {
    url: '/favoritos/:chatId',
    views: {
      'tab-servicos': {
        templateUrl: 'templates/tab-dash-detalhes.html',
        controller: 'DetalhesContatoSelecionado'
      }
    }
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

    .state('tab.dash-detalhes', {
    url: '/dash/:chatId',

    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash-detalhes.html', 
        controller: 'DetalhesContatoSelecionado'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-dash-detalhes.html',
          controller: 'DetalhesContatoSelecionado'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-detail', {
    url: '/account/:chatId',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-dash-detalhes.html',
        controller: 'DetalhesContatoSelecionado'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/abertura');

});
