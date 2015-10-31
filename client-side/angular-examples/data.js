angular.module("myApp", []).controller("TreeController", ['$scope', function($scope) {
	$scope.tree =treedata;
	$scope.head = [{title:'Գնման ենթակա  ապրանքներ, աշխատանքներ և ծառայություններ',sClass:""}, {title: 'Գնման առարկան',sClass:""}, {title: 'Չափման միավորը',sClass: 'text-center'}, {title: 'Ամբողջ քանակը (ծավալը)',sClass: 'text-right'}, {title: 'Ընդհանուր գումարը (հազ. դրամով)',sClass: 'text-right'}, {title: 'Գնման ձևը (ընթացակարգը)',sClass: 'text-right'}];
	$scope.table =dataSet;
}]);
