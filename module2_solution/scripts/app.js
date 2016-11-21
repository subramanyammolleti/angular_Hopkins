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
		var list = [{name:'Milk',quantity:10},{name:'Donuts',quantity:10},{name:'Cookies',quantity:100},{name:'Apples',quantity:12},{name:'Sugary Drinks',quantity:2}];
		list1.itemName = "";
		list1.itemQuantity = "";
		list1.removeBroughtItem = removeBroughtItem;
		list1.addToBuyItems =  addToBuyItems;
		list1.items = ShoppingListCheckOffService.getToBuyItems();
		
		for (var item in list ) {
			ShoppingListCheckOffService.addToBuyItems(list[item].name, list[item].quantity);
		}

		function addToBuyItems(){
			ShoppingListCheckOffService.addToBuyItems(list1.itemName, list1.itemQuantity);
		}

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
		var toBuyItems = [];
		var broughtItems = [];
		service.addToBuyItems = addToBuyItems;
		service.removeBroughtItem = removeBroughtItem;
		service.getToBuyItems = getToBuyItems;
		service.getBroughtItems = getBroughtItems;

		function addToBuyItems(name, quantity){
			var item = {
				name : name,
				quantity : quantity
			};
			toBuyItems.push(item);
		}

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




