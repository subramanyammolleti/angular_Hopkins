(function () {
'use strict';

angular.module('MenuApp')
.component('menuItemsList', {
  templateUrl: 'src/menulist/templates/itemslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
