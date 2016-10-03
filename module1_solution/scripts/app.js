(function() {
	
	'use strict'; 

	angular.module('LunchCheck', [])


	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope){
		$scope.items = "";
		$scope.message = "";
		$scope.itemsCount = 0;
		
		$scope.itemsCheck = function(){
			
				if ($scope.items=="") {
					$scope.message = "Please enter data first.";
					return;
				}
				var menu = $scope.items;
				$scope.itemsCount = menu.split(',').length;
				if($scope.itemsCount<=3){
					$scope.message = "Enjoy!";
				}
				else if($scope.itemsCount>3){
					$scope.message = "Too much!";	
				}		

		};
		

	}

})();




