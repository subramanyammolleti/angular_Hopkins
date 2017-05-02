(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuItemsController', MenuItemsController);


MenuItemsController.$inject = ['itemsList'];
function MenuItemsController(itemsList) {
  var menuItems = this;
  menuItems.itemsList = itemsList;
  console.log(menuItems.itemsList);
}

})();
