CORPAPPS.diffTool.app.directive('uniqueId',
    ["$log", "guidService", function ($log, guidService) {
        return {
            restrict: 'A',
            //replace: true,
            //template: "<span id='{{uniqueId}}'></span>",
            link: function (scope, elem, attrs) {
                var guid = guidService.getGuid();
                scope.uniqueId = guid;
                var id = attrs.id;
                if (!id) {
                    id = guid;
                    elem.attr("id", id); //Also here
                }
            }
        };
}]); // end CORPAPPS.diffTool.app.directive('uniqueId',


CORPAPPS.diffTool.app.directive('queryBuilder',
    ["$log", "$http", function ($log, $http) {
        var directiveObj = {
            restrict: 'A',
            scope: true,
            controller: function($scope, $element, $attrs){
            
            },
            link: function (scope, elem, attrs) {
                angular.element(document).ready(function () {
                    $log.log("document ready. . .");
                });            
            }
        };
        return directiveObj;
}]); // end CORPAPPS.diffTool.app.directive('queryBuilder',


CORPAPPS.diffTool.app.directive('fileUploader',
    ["$log", "$http", function ($log, $http) {
        var directiveObj = {
            restrict: 'A',
            scope: true,
            controller: function($scope, $element, $attrs){
            
            },
            link: function (scope, elem, attrs) {
                angular.element(document).ready(function () {
                    $log.log("document ready. . .");
                });            
            }
        };
        return directiveObj;
}]); // end CORPAPPS.diffTool.app.directive('fileUploader',
