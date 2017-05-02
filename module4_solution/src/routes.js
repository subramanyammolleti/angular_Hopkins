(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menulist/templates/categories.template.html',
    controller: 'MenuListController as menuList',
    resolve: {
      items: ['MenuService', function (MenuService) {
        return MenuService.getAllCategories();
      }]
    }
  })


  .state('items', {
    url: '/items/{itemname}',
    templateUrl: 'src/menulist/templates/items.template.html',
     controller: 'MenuItemsController as menuItems',
    resolve: {
      itemsList: ['MenuService', '$stateParams', function (MenuService, $stateParams) {
        return MenuService.getItemsForCategory($stateParams.itemname);
      }]
    }
  });
}

})();
