(function () {
'use strict';

angular.module('ShoppingList')
.controller('MenuListController', MenuListController);


MenuListController.$inject = ['items'];
function MenuListController(items) {
  var mainList = this;
  mainList.items = items;
}

})();
