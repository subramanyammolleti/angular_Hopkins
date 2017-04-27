(function () {
'use strict';

angular.module('data')
.service('MenuService', MenuService);


MenuService.$inject = ['$http']
function MenuService($http) {
  var service = this;


  	service.getAllCategories  = getAllCategories;
	service.getItemsForCategory = getItemsForCategory;


	function getAllCategories(){
		var response = $http({
			method: 'GET',
			url: 'https://davids-restaurant.herokuapp.com/categories.json',
			headers: { 'Content-Type': 'application/json' }
		});

		return response;
	}


	function getItemsForCategory(categoryShortName){
		var response = $http({
			method: 'GET',
			url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=,'+ categoryShortName,
			headers: { 'Content-Type': 'application/json' }
		});

		return response;
	} 	

}

})();
