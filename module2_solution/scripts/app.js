(function() {
	
	'use strict'; 

	angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


    // Controller for Buying List
	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){

		var list1 = this;
		list1.removeBroughtItem = removeBroughtItem;
		list1.items = ShoppingListCheckOffService.getToBuyItems();
		
		function removeBroughtItem(itemIndex){
			ShoppingListCheckOffService.removeBroughtItem(itemIndex);
			
		}	


	}

    // Controller for already Brought List
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){

		var list2 = this;			
		list2.items = ShoppingListCheckOffService.getBroughtItems();

	}

    // Shopping List Service 
	function ShoppingListCheckOffService(){
	
		var service = this;
		var toBuyItems = [{name:"Eggs",quantity:10},{name:"Bread",quantity:1},{name:"Chips",quantity:4},{name:"Milk",quantity:4},{name:"Sugary Drinks",quantity:2}]
		var broughtItems = [];
		service.removeBroughtItem = removeBroughtItem;
		service.getToBuyItems = getToBuyItems;
		service.getBroughtItems = getBroughtItems;

		function removeBroughtItem(itemIndex){
			broughtItems.push(toBuyItems[itemIndex]);
			toBuyItems.splice(itemIndex,1);
		}

		function getToBuyItems(){
			return toBuyItems;
		}

		function getBroughtItems(){
			return broughtItems;
		}

	}

		
})();




