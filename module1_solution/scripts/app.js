(function() {
	
	'use strict'; 

	angular.module('LunchCheck', [])


	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope){
		
		$scope.items = "";
		$scope.message = "";	
		$scope.itemsCheck = function(){
			
				if ($scope.items=="") {
					$scope.message = "Please enter data first.";
					return;
				}
				var menu = $scope.items;
				var itemsCount = menu.split(',').length;
				itemsCount<=3 ?	$scope.message = "Enjoy!" : $scope.message = "Too much!";
	
		};
		

	}

})();




