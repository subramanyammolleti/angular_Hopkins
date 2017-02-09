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
        	 transclude: true,
        	 restrict: 'E',
    		 scope: {
    		 	found: '<',
    		 	title: '@title',
    		 	onRemove: '&'
    		 }
        };

        return ddo;
	}

/*
	function NarrowItDownDirectiveController() {
		var menu = this;

		console.log(menu.found);
		console.log(menu.noItemFlag);

	}*/


	// Controller 
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var menu = this;

		menu.title = "Menu Items"
		menu.searchItem = "";
		menu.found = [];
		menu.noItemFlag = false;

		menu.getMenuList = function(){
			
			console.log('inside getMenuList');
			
			if(menu.searchItem != ""){
					
				 menu.noItemFlag = false;
	
				  var promise = MenuSearchService.getMatchedMenuItems(menu.searchItem);
				  promise.then(function (response) {
				  	console.log("getMenuList: ",response);
				    menu.found = response;

				    console.log("Menu.found: ", menu.found);
				    console.log("Menu.found: ", menu.found.length);

				    if(menu.found.length == 0){
				    	console.log("Inside length");
				    	menu.noItemFlag = true;
				    }

				  })
				  .catch(function (error) {
				    console.log("Something went terribly wrong.");
				  });
		
			}
			else{
				console.log('inside else');
				menu.noItemFlag = true;
				
			}

		};


		menu.removeItem = function(index){
			console.log("inside remove controller");
				MenuSearchService.removeItem(index);
		};



	}


	// Service
	MenuSearchService.$inject = ['$http', 'ApiBasePath'];
	function MenuSearchService($http, ApiBasePath){

		var menuSearch = this;
		var foundItems = [];

		menuSearch.getMatchedMenuItems = function(searchItem){
			return $http({method: 'GET',url: (ApiBasePath + '/menu_items.json')}).then(function (result) {
    			// process result and only keep items that match
    			foundItems = [];
   				 	console.log(searchItem);
				   	console.log(result.data);

				   	angular.forEach(result.data.menu_items, function(value, key){
//debugger;
						var item = value.description.toLowerCase().includes(searchItem.toLowerCase());
				   		if(item){
				   		//	debugger;	
				   			//console.log("value: "+value.description+"  "+"key: "+key);	
				   			foundItems.push(value);
				   		}	


				   	});

					console.log("Final Array: ",foundItems);

			    // return processed items
   				 return foundItems;
			});
		};


		menuSearch.removeItem = function(index){
			console.log('inside remove service');
				foundItems.splice(index, 1);
		};


	}




   
		
})();




