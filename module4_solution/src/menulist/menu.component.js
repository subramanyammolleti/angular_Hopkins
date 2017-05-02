(function () {
'use strict';

angular.module('MenuApp')
.component('menuCategoriesList', {
  templateUrl: 'src/menulist/templates/categorieslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
