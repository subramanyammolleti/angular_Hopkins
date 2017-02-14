(function() {
	
	'use strict'; 

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', foundItems)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");;


	// Directive
	function foundItems(){
        var ddo = {
        	 templateUrl: 'foundItems.html',
        	 restrict: 'E',
    		 scope: {
    		 	found: '<',
    		 	title: '@title',
    		 	onRemove: '&'
    		 }
        };

        return ddo;
	}


	// Controller 
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var menu = this;

		menu.title = ""
		menu.searchItem = "";
		menu.found = [];
		menu.spin = false;

		menu.getMenuList = function(){
			
			if(menu.searchItem != ""){
				
				 menu.spin = true;
	
				  var promise = MenuSearchService.getMatchedMenuItems(menu.searchItem);
				  promise.then(function (response) {
				  	
				    menu.found = response;
				    menu.spin = false;

				    if(menu.found.length == 0){
				    	menu.title = "NOTHING FOUND";
				    	return;
				    }

				    menu.title = "List Of Menu Items Available With "+menu.searchItem;

				  })
				  .catch(function (error) {
				    alert("Something went wrong, Check your log.");
				    console.log("Error: ",error);
				    menu.spin = false;
				  });
		
			}
			else{
				console.log('inside else');
				menu.title = "NOTHING FOUND";
				menu.spin = false;
				menu.found = [];
				
			}

		};


		menu.removeItem = function(index){
				MenuSearchService.removeItem(index);
		};



	}


	// Service
	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){

		var menuSearch = this;
		var foundItems;

		menuSearch.getMatchedMenuItems = function(searchItem){
			return $http({method: 'GET',url: (ApiBasePath + '/menu_items.json')}).then(function (result) {
    			// process result and only keep items that match
    			foundItems = [];
   			
				   	angular.forEach(result.data.menu_items, function(value, key){

						var item = value.description.toLowerCase().includes(searchItem.toLowerCase());
				   		if(item){
				   			
				   			foundItems.push(value);
				   		}	


				   	});

					console.log("Final Array: ",foundItems);

			    // return processed items
   				 return foundItems;
			});
		};


		// Methid to remove an element from List
		menuSearch.removeItem = function(index){
			
				foundItems.splice(index, 1);
		};


	}




   
		
})();




