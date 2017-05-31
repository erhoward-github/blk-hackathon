/*global angular */

var CORPAPPS = {};
CORPAPPS.diffTool = {};
CORPAPPS.diffTool.app = angular.module("diffToolApp", 
    ['ngRoute','ngAnimate', 
    'ui.bootstrap','ui.grid','ui.grid.edit','ui.grid.cellNav','ui.grid.resizeColumns','ui.grid.treeView','ui.grid.selection','ui.grid.grouping',
    'angularFileUpload']);
CORPAPPS.diffTool.app.value("urls",{
    "dataFile":"/datatool/DataAnalysis/ajax/getSourceColumns",
    "uploadUrl":"/datatool/DataAnalysis/ajax/uploadFiles",
    "submitUrl":"/datatool/DataAnalysis/ajax/getDataAnalysisResult",
    "infoUrl":"https://webster.bfm.com/Wiki/display/apps/Enterprise+Data+Analysis+Tool+Project+Dashboard",
    "downladFavoriteUrl":"/datatool/DataAnalysis/ajax/downloadFavorite",
    "loadFavoriteUrl":"/datatool/DataAnalysis/ajax/loadFavorites",
    "templateBaseUrl":"../resources/scripts/js/ng/template/"
});

CORPAPPS.diffTool.app.config(["$routeProvider",function($routeProvider){
    $routeProvider.when("/", {
            templateUrl: "ngDataAnalysisMain.html"
        })
        .when("/:debug", {
            templateUrl:"ngDataAnalysisMain.html"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);

CORPAPPS.diffTool.app.controller("diffToolCtrl", 
        ["$scope","$log","$window","$http","$timeout","$uibModal",
        "urls",
        "getDiffToolDataService","guidService","getValueFromUrlService","FileUploader","uiGridConstants","uiGridGroupingConstants",
        function($scope, $log, $window, $http, $timeout, $uibModal,
            urls,
            getDiffToolDataService, guidService,getValueFromUrlService,FileUploader,uiGridConstants)
{
    $log.log("diffTool app. . .");
    /*
    $scope.status = {
        isFirstOpen: false,
        isFirstDisabled: false,
        isOpen: true
    };
    */
    $scope.analysisResultBaseModel = 
    {
            
            "toolUser": null,
            "toolRules": [
                        {
                            "ruleId": 1,
                            "ruleName": "Match Data",
                            "ruleDecision": "Y",
                            "ruleAction": "DataAnalysis",
                            "ruleType": "Matching",
                            "ruleExpression": "A.cusip = B.cusip && A.cusip = C.cusip && A.asofdate = B.asofdate && A.asofdate = C.asofdate  && A.price = B.price && A.price = C.price"
                        },
                        {
                            "ruleId": 2,
                            "ruleName": "Mismatch Data",
                            "ruleDecision": "Y",
                            "ruleAction": "DataAnalysis",
                            "ruleType": "Matching",
                            "ruleExpression": "A.cusip = B.cusip && A.cusip = C.cusip && A.asofdate = B.asofdate && A.asofdate = B.asofdate && ( A.price != B.price || A.price != C.price"
                        }
                    ],        
                        "resultRowList": [{
                            "matchNo": 1,
                            "ruleName": "Matched Data",
                            "matchType": "Y",
                            "dataRows": [{
                                "firstValue": "A",
                                "secondValue": ["2/23/2016 0:00", "00846U101", "ALADDIN", "332.17089", "37.17", "USD\tMatched"]
                            }, {
                                "firstValue": "B",
                                "secondValue": ["2/23/2016 0:00", "00846U101", "REUT", "332.17089", "37.17", "USD\tMatched"]
                            }, {
                                "firstValue": "C",
                                "secondValue": ["2/23/2016 0:00", "00846U101", "FACTSET", "332.17089", "37.17", "USD\tMatched"]
                            }],
                            "otherDetails": "Expected result Matching"
                        }, {
                            "matchNo": 2,
                            "ruleName": "Matched Data",
                            "matchType": "Y",
                            "dataRows": [{
                                "firstValue": "A",
                                "secondValue": ["2/23/2016 0:00", "01609W102", "ALADDIN", "2512.427504", "66.97", "USD"]
                            }, {
                                "firstValue": "B",
                                "secondValue": ["2/23/2016 0:00", "01609W102", "ALADDIN", "2512.427504", "66.97", "USD"]
                            }, {
                                "firstValue": "C",
                                "secondValue": ["2/23/2016 0:00", "01609W102", "ALADDIN", "2512.427504", "66.97", "USD"]
                            }],
                            "otherDetails": "Expected result Matching"
                        }, {
                            "matchNo": 3,
                            "ruleName": "Mismatch Data",
                            "matchType": "Y",
                            "dataRows": [{
                                "firstValue": "A",
                                "secondValue": ["2/23/2016 0:00", "03662Q105", "ALADDIN", "89.992", "102.76", "USD"]
                            }, {
                                "firstValue": "B",
                                "secondValue": ["2/23/2016 0:00", "03662Q105", "REUT", "88.992", "102.76", "USD"]
                            }, {
                                "firstValue": "C",
                                "secondValue": ["2/23/2016 0:00", "03662Q105", "FACTSET", "88.992", "102.76", "USD"]
                            }],
                            "otherDetails": "Expected result Matching"
                        }, {
                            "matchNo": 3,
                            "ruleName": "Unmatched Data",
                            "matchType": "N",
                            "dataRows": [{
                                "firstValue": "A",
                                "secondValue": ["2/23/2016 0:00", "34543YUIT", "ALADDIN", "89.992", "102.76", "USD"]
                            }, {
                                "firstValue": "B",
                                "secondValue": ["2/23/2016 0:00", "34543YUIT", "REUT", "88.992", "102.76", "USD"]
                            }],
                            "otherDetails": "Expected result Matching"
                        }],
                        "dataHeaderCols": [{
                            "firstValue": "A",
                            "secondValue": {
                                "actualFileName": "AladdinPrice.csv",
                                "internalFilePath": "C://Temp/datatool_qwerqwr123_AladdinPrice.csv",
                                "sourceAlias": "A",
                                "headerCols": ["AsOfDate", "Cusip", "Source", "SharesOutstanding", "Price", "Currency"],
                                "internalToOrgColMap": {
                                    "AsOfDate": "As Of Date",
                                    "Price": "Price",
                                    "Currency": "Currency",
                                    "Source": "Source",
                                    "Cusip": "Cusip",
                                    "SharesOutstanding": "Shares Outstanding"
                                },
                                "orgToInternalColMap": {
                                    "Price": "Price",
                                    "Shares Outstanding": "SharesOutstanding",
                                    "Currency": "Currency",
                                    "As Of Date": "AsOfDate",
                                    "Source": "Source",
                                    "Cusip": "Cusip"
                                }
                            }
                        }, {
                            "firstValue": "B",
                            "secondValue": {
                                "actualFileName": "RUETERPrice.csv",
                                "internalFilePath": "C://Temp/datatool_qwsdgf123_RUETERPrice.csv",
                                "sourceAlias": "B",
                                "headerCols": ["AsOfDate", "Cusip", "Source", "SharesOutstanding", "Price", "Currency"],
                                "internalToOrgColMap": {
                                    "AsOfDate": "As Of Date",
                                    "Price": "Price",
                                    "Currency": "Currency",
                                    "Source": "Source",
                                    "Cusip": "Cusip",
                                    "SharesOutstanding": "Shares Outstanding"
                                },
                                "orgToInternalColMap": {
                                    "Price": "Price",
                                    "Shares Outstanding": "SharesOutstanding",
                                    "Currency": "Currency",
                                    "As Of Date": "AsOfDate",
                                    "Source": "Source",
                                    "Cusip": "Cusip"
                                }
                            }
                        }, {
                            "firstValue": "C",
                            "secondValue": {
                                "actualFileName": "FACTSETPrice.csv",
                                "internalFilePath": "C://Temp/datatool_qwsdgf123_RUETERPrice.csv",
                                "sourceAlias": "C",
                                "headerCols": ["AsOfDate", "Cusip", "Source", "SharesOutstanding", "Price", "Currency"],
                                "internalToOrgColMap": {
                                    "AsOfDate": "As Of Date",
                                    "Price": "Price",
                                    "Currency": "Currency",
                                    "Source": "Source",
                                    "Cusip": "Cusip",
                                    "SharesOutstanding": "Shares Outstanding"
                                },
                                "orgToInternalColMap": {
                                    "Price": "Price",
                                    "Shares Outstanding": "SharesOutstanding",
                                    "Currency": "Currency",
                                    "As Of Date": "AsOfDate",
                                    "Source": "Source",
                                    "Cusip": "Cusip"
                                }
                            }
                        }],
                        "totalMatched": 5,
                        "totalMismatched": 10,
                        "totalUnmatched": 10,
                        "summaryText": "Hackathaon Demo for Enterprise Data Analysis Tool",
                        "columnMapping":"A.cusip = B.cusip\nA.cusip = C.cusip\nA.asofdate = B.asofdate\nA.asofdate = C.asofdate"
            
            
            
    };
    $scope.analysisResultEmptyModel = 
    {
        "toolUser": null,
        "toolRules": [
        ],        
        "resultRowList": [
        ],
        "dataHeaderCols": [
        ],
        "totalMatched": 0,
        "totalMismatched": 0,
        "totalUnmatched": 0,
        "summaryText": "Hackathaon Demo for Enterprise Data Analysis Tool",
        "columnMapping":""
    };
    
    $scope.analysisResultModel = angular.copy($scope.analysisResultBaseModel);

    $scope.uploadResultBaseModel = 
    [
        {
            "actualFileName": "",
            "internalFilePath": "",
            "sourceAlias": "",
            "headerCols": [
            ],
            "internalToOrgColMap": {
            },
            "orgToInternalColMap": {
            }
        }
    ];
    $scope.uploadResultModel = angular.copy($scope.uploadResultBaseModel);
    
    
    $scope.urls = urls;
    $scope.fileUploadOpen = true;
    $scope.reportingOptionsOpen = true;
    $scope.mappingOptionsOpen = false;
    $scope.dataRulesOpen = false;
    
    $scope.resizeGrid = function(){
        
        if($scope.gridApiRules)
        {
            //$scope.gridApiRules.core.handleWindowResize();
            
            $timeout(function(){
                $log.log("onRegisterApi. . .timeout");
                $scope.gridApiRules.core.handleWindowResize();
            }, 750);
            
        }
        /*
        if($scope.gridApiSourceModel)
        {
            $scope.gridApiSourceModel.core.handleWindowResize();
        }
        if($scope.gridApiOperators)
        {
            $scope.gridApiOperators.core.handleWindowResize();
        }
        */
        if($scope.gridApiResult)
        {
            //$scope.gridApiResult.core.handleWindowResize();
            
            $timeout(function(){
                $log.log("onRegisterApi. . .timeout");
                $scope.gridApiResult.core.handleWindowResize();
            }, 750);
            
        }        
        $log.log("resize grid. . .");
    };
    
    $scope.submitOK = true;
    $scope.favoritesOK = true;
    $scope.helpOK = true;
    $scope.exportOK = false;
    
    $scope.toggleOpen = function(){
        
        $log.log("toggleOpen");
    };
    
    $scope.selectDataAnalysisRequest = function(){
        $scope.submitOK = true;
        $scope.favoritesOK = true;
        $scope.helpOK = true;
        $scope.exportOK = false;
        
        $scope.resizeGrid();
        
    };
    
    $scope.selectAnalysisResult = function(){
        $scope.submitOK = false;
        $scope.favoritesOK = false;
        $scope.helpOK = true;
        $scope.exportOK = true;
        
        // only this
        $scope.resizeGrid();
    };
    
    $scope.error = false;
    $scope.message = "";
    $scope.debugMode = getValueFromUrlService.getValueFromUrl("debug") === "1" ? true : false;
    
    $scope.showUploadPane = true;
    $scope.showAnalysisPanes = false;
    $scope.proceed = function(){
        $log.log("proceed. . .");
        $scope.showAnalysisPanes = true;
        $scope.showUploadPane = false;
    };
    $scope.reset = function(){
        $scope.showUploadPane = true;
        $scope.showAnalysisPanes = false;
        $scope.uploadOK = false;
        $scope.error = false;
        $scope.message = "";
    };

    //$scope.uploadResultModel = [];

    $scope.uploadOK = false;
    //var url = "/datatool/DataAnalysis/ajax/uploadFiles";
    //var url = urls.uploadUrl;
    
    var options = {
        url:urls.uploadUrl,
        removeAfterUpload:true
    };
    $scope.uploader = new FileUploader(options);
    
    $scope.uploader.onBeforeUploadItem = function(item) {
        $log.log("onBeforeUploadItem");
        $scope.uploadOK = false;
    };    
    
    $scope.uploader.onSuccessItem = function(item, response, status, headers){
        $log.log("onSuccessItem. . ." + status);
        $scope.error = false;
        $scope.message = "";
        $scope.uploadResultModel.push(angular.copy(response.uploadResultModel[0]));
        
    };
    $scope.uploader.onErrorItem = function(item, response, status, headers){
        $log.log("onErrorItem. . ." + status);
        $scope.uploadResultModel = [];
        $scope.error = true;
        $scope.message = "onErrorItem. . ." + status;
        
    };
    $scope.uploader.onCancelItem = function(item, response, status, headers){
        $log.log("onCancelItem");
        
        
    };
    $scope.uploader.onCompleteItem = function(item, response, status, headers){
        $log.log("onCompleteItem");
        
    };
    $scope.uploader.onCompleteAll = function(){
        $log.log("onCompleteAll");
        $scope.uploadOK = true;
    };
    
    /*
    $scope.edit = function(){
        $log.log("edit. . .");
        $scope.status.open != $scope.status.open;
    };
    $scope.reset = function(){
        $log.log("reset. . .");
    };
    */
    /*
    $scope.baseModel = {
        rules: [
        ],
        data: [
        ],
        columnMapping:"",
        columnDataMapping:""
    };
    */
    
    /*
    $scope.baseModel = 
    {
        "toolRules": [
        ],
        "resultRowList": [
        ],
        "dataHeaderCols": [
        ],
        "totalMatched": 0,
        "totalMismatched": 0,
        "totalUnmatched": 0,
        "summaryText": "Hackathaon Demo for Enterprise Data Analysis Tool"
    };
    $scope.analysisResultModel = angular.copy($scope.baseModel);
    */
    
    $scope.init = function(){
        $scope.analysisResultModel = angular.copy($scope.analysisResultBaseModel);
        //$scope.resizeGrid();
    };

    // rhoward new
    $scope.analysisResultModel = angular.copy($scope.analysisResultBaseModel);
    $scope.submit = function(){
        $log.log("submit. . .");
        var promise = getDiffToolDataService.getAnalysisResultModel();
        promise.then(
            function(response){
                $log.log("success. . ." + response.status + "||" + response.statusText);
                $scope.analysisResultModel = angular.copy(response.data.analysisResultModel);
                $scope.error = false;
                $scope.message = "";
                
                //$scope.resizeGrid();
            },
            function(response){
                $log.log("error. . ." + response.status + "||" + response.statusText);
                $scope.analysisResultModel = angular.copy($scope.analysisResultBaseModel);
                $scope.analysisResultModel.resultRowList = [];
                $scope.error = true;
                $scope.message = "error. . ." + response.status + "||" + response.statusText;
            }
        );
    };
    
    /*
    $scope.editThisRule = function(row){
        $log.log("editThisRule. . .");
        //debugger;
        $scope.openMatchRulesModal("lg", row);        
        //$scope.resizeGrid();
    };
    
    $scope.addRule = function(){
        $log.log("addRule. . .");
        var id = guidService.getGuid();
        $scope.model.rules.push({
            "id":id,"ruleName":"",
            "matchCriteria":"",
            "matched":"no",
            "ruleType":"filter"
        });
        //$scope.resizeGrid();
    };
    $scope.deleteThisRule = function(row){
        $log.log("deleteThisRule. . ." + row.entity.id);
        var id = row.entity.id;
        var found = false;
        var foundIndex = -1;
        for(var i = 0; i < $scope.model.rules.length; i++)
        {
            if($scope.model.rules[i].id === id)
            {
                found = true;
                foundIndex = i;
                break;
            }
        }
        if(found)
        {
            $scope.model.rules.splice(foundIndex, 1);
        }
        if($scope.model.rules.length === 0)
        {
            $scope.addRule();
        }
        //$scope.resizeGrid();
    };
    $scope.deleteAllRules = function(){
        $log.log("deleteAllRules. . .");
        $scope.init();
        $scope.addRule();
        //$scope.resizeGrid();
    };
    
    */
    
    $scope.editThisRule = function(row){
        $log.log("editThisRule. . .");
        //debugger;
        $scope.openMatchRulesModal("lg", row);
        
        $scope.resizeGrid();
    };
    
    $scope.addRule = function(){
        $log.log("addRule. . .");
        var id = guidService.getGuid();
        $scope.analysisResultModel.toolRules.push({
            "ruleId":id,
            "ruleName":"",
            "ruleDecision":"Y",
            "ruleType":"Matching",
            "ruleExpression":""
        });
        
        $scope.resizeGrid();
    };

    $scope.deleteThisRule = function(row){
        $log.log("deleteThisRule. . ." + row.entity.ruleId);
        var id = row.entity.ruleId;
        var found = false;
        var foundIndex = -1;
        for(var i = 0; i < $scope.analysisResultModel.toolRules.length; i++)
        {
            if($scope.analysisResultModel.toolRules[i].ruleId === id)
            {
                found = true;
                foundIndex = i;
                break;
            }
        }
        if(found)
        {
            $scope.analysisResultModel.toolRules.splice(foundIndex, 1);
        }
        if($scope.analysisResultModel.toolRules.length === 0)
        {
            $scope.addRule();
        }
        $scope.resizeGrid();
    };
    
    $scope.deleteAllRules = function(){
        $log.log("deleteAllRules. . .");
        //$scope.init();
        
        $scope.analysisResultModel = angular.copy($scope.analysisResultEmptyModel);
        
        $scope.addRule();
        
        $scope.resizeGrid();
    };
    
    /*
    $scope.rulesGridOptions = {
        data: "model.rules",
        enableCellSelection: true,
        enableRowSelection: true,
        enableColumnResize: true,
        enableRowReordering: true,
        onRegisterApi: function( gridApi ) {
            $scope.gridApiRules = gridApi;
            $scope.gridApiRules.core.handleWindowResize();
            $log.log("onRegisterApi. . .: gridApiRules");
            
            
            //$timeout(function(){
            //    $log.log("onRegisterApi. . .timeout");
            //    $scope.gridApiRules.core.handleWindowResize();
            //});
            //
        },
        rowHeight: 40,
        columnDefs: [
            {
                field: "action",
                displayName: "Action",
                cellTemplate:
                    
                    "<button class='btn btn-primary btn-xs' style='width:50%;' data-ng-click='grid.appScope.editThisRule(row)' style='cursor:pointer;' title='Edit this rule'>" + 
                    "<span class='glyphicon glyphicon-edit'></span>" + 
                    "</button>" +
                    "<button class='btn btn-primary btn-xs' style='width:50%;' data-ng-click='grid.appScope.deleteThisRule(row)' style='cursor:pointer;' title='Delete this rule'>" + 
                    "<span class='glyphicon glyphicon-remove'></span>" + 
                    "</button>",
                    
                enableCellEdit: false,
                visible: true,
                width:'10%'
            },
            { name: 'id', displayName: 'ID', enableCellEdit: false, width: '10%', visible: false },
            { name: 'ruleName', displayName: 'Rule Name', enableCellEdit: true, width: '10%', visible: true },
            { 
                name: 'matchCriteria', 
                displayName: 'Match Criteria', 
                enableCellEdit: true, 
                width: '*', 
                visible: true,
                editableCellTemplate: "ui-grid/cellEditor"
            },
            { 
                name: 'matched', 
                displayName: 'Matched', 
                width: '10%', 
                visible: true, 
                editableCellTemplate: "ui-grid/dropdownEditor",
                editDropdownValueLabel:"matched",
                editDropdownOptionsArray:[{"id":"no","matched":"No"},{"id":"yes","matched":"Yes"}]
            },
            { 
                name: 'ruleType', 
                displayName: 'Rule Type', 
                width: '10%', 
                visible: true, 
                editableCellTemplate: "ui-grid/dropdownEditor", 
                editDropdownValueLabel:"value",
                editDropdownOptionsArray:[{"id":"filter","value":"Filter"},{"id":"diff","value":"Diff"}]
            }
        ]
    }; // end this.rulesGridOptions = {
    */
    
    // rhoward new
    $scope.rulesGridOptions = {
            data: "analysisResultModel.toolRules",
            enableCellSelection: true,
            enableRowSelection: true,
            enableColumnResize: true,
            enableRowReordering: true,
            onRegisterApi: function( gridApi ) {
                $scope.gridApiRules = gridApi;
                $scope.gridApiRules.core.handleWindowResize();
                $log.log("onRegisterApi. . .: gridApiRules");
                
                
                //$timeout(function(){
                //    $log.log("onRegisterApi. . .timeout");
                //    $scope.gridApiRules.core.handleWindowResize();
                //});
                //
            },
            rowHeight: 40,
            columnDefs: [
                {
                    field: "action",
                    displayName: "Action",
                    enableSorting: false,
                    cellTemplate:
                        
                        "<button class='btn btn-primary btn-xs' style='width:50%;' data-ng-click='grid.appScope.editThisRule(row)' style='cursor:pointer;' title='Edit this rule'>" + 
                        "<span class='glyphicon glyphicon-edit'></span>" + 
                        "</button>" +
                        "<button class='btn btn-primary btn-xs' style='width:50%;' data-ng-click='grid.appScope.deleteThisRule(row)' style='cursor:pointer;' title='Delete this rule'>" + 
                        "<span class='glyphicon glyphicon-remove'></span>" + 
                        "</button>",
                        
                    enableCellEdit: false,
                    visible: true,
                    width:'10%'
                },
                { name: 'ruleId', displayName: 'ID', enableCellEdit: false, width: '10%', visible: false },
                { name: 'ruleName', displayName: 'Rule Name', enableCellEdit: true, width: '10%', visible: true },
                { 
                    name: 'ruleExpression', 
                    displayName: 'Match Criteria', 
                    enableCellEdit: true, 
                    width: '*', 
                    visible: true,
                    editableCellTemplate: "ui-grid/cellEditor"
                },
                { 
                    name: 'ruleDecision', 
                    displayName: 'Matched', 
                    width: '10%', 
                    visible: true, 
                    editableCellTemplate: "ui-grid/dropdownEditor",
                    editDropdownValueLabel:"value",
                    editDropdownOptionsArray:[{"id":"N","value":"No"},{"id":"Y","value":"Yes"}]
                },
                { 
                    name: 'ruleType', 
                    displayName: 'Rule Type', 
                    width: '10%', 
                    visible: true, 
                    editableCellTemplate: "ui-grid/dropdownEditor", 
                    editDropdownValueLabel:"value",
                    editDropdownOptionsArray:[{"id":"Matching","value":"Matching"},{"id":"Not Matching","value":"Not Matching"}]
                }
            ]
        }; // end this.rulesGridOptions = {
    

        // rhoward new
        $scope.resultGridOptions = {
            data: "analysisResultModel.resultRowList",
            enableCellSelection: true,
            enableRowSelection: true,
            enableColumnResize: true,
            enableRowReordering: true,
            onRegisterApi: function( gridApi ) {
                $scope.gridApiResult = gridApi;
                $scope.gridApiResult.core.handleWindowResize();
                $log.log("onRegisterApi. . .: gridApiResult");
                //$timeout(function(){
                //    $log.log("onRegisterApi. . .timeout");
                //    $scope.gridApiRules.core.handleWindowResize();
                //});
                //
            },
            columnDefs: [
                { 
                    name: 'matchNo', 
                    displayName: 'Match Number', 
                    enableCellEdit: false 
                },
                { 
                    name: 'ruleName', 
                    displayName: 'Rule Name', 
                    enableCellEdit: false 
                },
                { 
                    name: 'matchType', 
                    displayName: 'Match Type', 
                    enableCellEdit: false
                },
                { 
                    name: 'otherDetails', 
                    displayName: 'Other Details', 
                    enableCellEdit: false
                }
            ]
        }; // end this.rulesGridOptions = {
    
    
    
    /*
    $scope.status = {open: false};
    $scope.$watch("status.open",function(newValue, oldValue)
    {
        $log.log("watch match rules. . .");
        if(newValue !== oldValue)
        {
            $scope.resizeGrid();
        }
    });
    */
    /*
    $scope.$watch(
        function(scope){
            return scope.dataRulesOpen;
        },
        function(newValue, oldValue){
            $scope.resizeGrid();
        }
    );
    */
        
    // get data
    /*
    $scope.promise = getDiffToolDataService.getData();
    $scope.promise.then(function(response){
        $log.log("success. . ." + response.status + ": " + response.statusText);
        $scope.model = angular.copy(response.data);
        $scope.error = false;
        $scope.message = "success. . ." + response.status + ": " + response.statusText;
        //debugger;
    },function(response){
        $log.log("error. . ." + response.status + ": " + response.statusText);
        $scope.init();
        $scope.addRule();
        $scope.error = true;
        $scope.message = "error. . ." + response.status + ": " + response.statusText;
        //debugger;
    });
    $scope.applyOperator = function()
    {
        $log.log("applyOperator");
    };
    */
    
    // ********************************************************************************************
    // modal windows
    // ********************************************************************************************
    // column mapping modal
    $scope.openColumnMappingModal = function(size) 
    {
        //debugger;
        var modalInstance = $uibModal.open({
            animation: true,
            //templateUrl: 'columnMappingModal.html',
            //templateUrl: '../resources/scripts/js/ng/template/columnMappingModal.html',
            templateUrl: urls.templateBaseUrl + 'columnMappingModal.html',
            controller: function($scope, $uibModalInstance, model){
                
                $scope.columnMapping = model.columnMapping;
                $scope.ok = function () {
                    model.columnMapping = $scope.columnMapping;
                    $uibModalInstance.close();
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };                
            },
            size: size,
            resolve: {
                model:function(){
                    return $scope.analysisResultModel;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $log.info('columnMappingModal OK at: ' + new Date());
        }, 
        function () {
            $log.info('columnMappingModal Cancel at: ' + new Date());
        });
    }; // end $scope.openColumnMappingModal = function(size)
    
    // match rules modal
    $scope.openMatchRulesModal = function(size, row) 
    {
        var modalInstance = $uibModal.open({
            animation: true,
            //templateUrl: 'matchRulesModal.html',
            templateUrl: '../resources/scripts/js/ng/template/matchRulesModal.html',
            templateUrl: urls.templateBaseUrl + 'matchRulesModal.html',
            //require:"",
            controller: function($scope, $uibModalInstance, model, row){
                $log.log("id: " + row.entity.id);
                $log.log("ruleName: " + row.entity.ruleName);
                
                $scope.dataHeaderCols = model.dataHeaderCols;
                
                $scope.ruleName = row.entity.ruleName;
                $scope.ruleDecision = row.entity.ruleDecision;
                $scope.ruleType = row.entity.ruleType;
                $scope.ruleExpression = row.entity.ruleExpression;
                
                //$scope.matchCriteria = "";
                
                $scope.operator = "";
                $scope.applyOperator = function(event)
                {
                    //debugger;
                    $log.log("applyOperator. . ." + $scope.operator);
                    $scope.ruleExpression += " " + $scope.operator;
                };
                $scope.column = "";
                $scope.applyColumn = function(event)
                {
                    //debugger;
                    $log.log("applyColumn. . ." + $scope.column);
                    $scope.ruleExpression += " " + $scope.column;
                };
                

                // source model
                /*
                $scope.sourceModel = [
                    {"fileAlias":"A","fileName":"file1.csv","headerCols":[
                        {"internal1":"actual1"},
                        {"internal2":"actual2"}
                    ]},
                    {"fileAlias":"B","fileName":"file1.csv","headerCols":[
                        {"internal1":"actual1"},
                        {"internal2":"actual2"},
                        {"internal3":"actual3"}
                    ]},
                    {"fileAlias":"C","fileName":"file1.csv","headerCols":[
                        {"internal1":"actual1"}
                    ]}
                ]; // end $scope.sourceModel = [
                */
                /*
                 $scope.sourceModelGridOptions = {
                     data: "model.sourceModel",
                     enableCellSelection: false,
                     enableRowSelection: true,
                     enableSelectAll: true,
                     enableColumnResize: true,
                     enableRowReordering: false,
                     onRegisterApi: function(gridApi){
                         $scope.gridApiSourceModel = gridApi;
                        $scope.gridApiSourceModel.core.handleWindowResize();
                         
                         $scope.gridApiSourceModel.selection.on.rowSelectionChanged($scope, function(row){
                             $log.log("row selected. . .: gridApiSourceModel");
                         })
                     },
                     columnDefs: [
                         {name:"operator",displayName:"Operator",visible:true},
                         {name:"description",displayName:"Description",visible:true}
                     ]
                 }; // end $scope.operatorsGridOptions = {
                
                 // operators
                $scope.operators = [
                     {"operator":"=","description":"equal to (-)"},
                     {"operator":"!=","description":"not equal to (!-)"},
                     {"operator":"<","description":"less than (<)"},
                     {"operator":"<=","description":"less than or equal to (<=)"},
                     {"operator":">","description":"greater than (<)"},
                     {"operator":">=","description":"greater than or equal to (<=)"},
                     {"operator":"~","description":"does match - case sensitive (~)"},
                     {"operator":"~~","description":"does match (~~)"},
                     {"operator":"!~","description":"does not match - case sensitive (!~)"},
                     {"operator":"!~~","description":"does not match (!~~)"},
                     {"operator":"?","description":"includes (?)"},
                     {"operator":"!?","description":"excludes (!?)"},
                     {"operator":"!","description":"not (!)"},
                     {"operator":"&","description":"and (&)"},
                     {"operator":"|","description":"or (|)"}
                 ]; // end var operators = {
                 $scope.operatorsGridOptions = {
                     data: "operators",
                     enableCellSelection: true,
                     enableRowSelection: true,
                     enableSelectAll: true,
                     enableColumnResize: true,
                     enableRowReordering: false,
                     onRegisterApi: function(gridApi){
                         $scope.gridApiOperators = gridApi;
                        $scope.gridApiOperators.core.handleWindowResize();
                         
                         //$scope.gridApiOperators.selection.on.rowSelectionChanged($scope, function(row){
                         //    $log.log("row selected. . .: gridApiOperators");
                         //})
                     },
                     columnDefs: [
                         {name:"operator",displayName:"Operator",visible:true},
                         {name:"description",displayName:"Description",visible:true}
                     ]
                 }; // end $scope.operatorsGridOptions = {
                */
                $scope.clear = function(){
                    $log.log("clear. . .");
                };
                $scope.ok = function () {

                    row.entity.ruleName = $scope.ruleName;
                    row.entity.ruleDecision = $scope.ruleDecision;
                    row.entity.ruleType = $scope.ruleType;
                    row.entity.ruleExpression = $scope.ruleExpression;
                    
                    $uibModalInstance.close();
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };                
            },
            size: size,
            resolve: {
                model:function(){
                    //return $scope.model;
                    return $scope.analysisResultModel
                },
                row:function(){
                    return row;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $log.info('matchRulesModal OK at: ' + new Date());
        }, 
        function () {
            $log.info('matchRulesModal Cancel at: ' + new Date());
        });
    }; // end $scope.openMatchRulesModal = function(size)
    
    // favorites modal
    $scope.openFavoritesModal = function(size, type, title) 
    {
        var modalInstance = $uibModal.open({
            animation: true,
            //templateUrl: 'favoritesModal.html',
            //templateUrl: '../resources/scripts/js/ng/template/favoritesModal.html',
            templateUrl: urls.templateBaseUrl + 'favoritesModal.html',
            controller: function($scope, $uibModalInstance, model, type, title){
                //debugger;
                $scope.type = type;
                $scope.title = title;
                $scope.ok = function () {
                    
                    var promise = getDiffToolDataService.getFavoriteModel();
                    promise.then(
                        function(response){
                            // success
                            $log.log("success. . ." + response.status + "||" + response.statusText);
                            model = angular.copy(response.data.dataAnalysisResultModel);
                            $scope.error = false;
                            $scope.message = "";
                            
                        },
                        function(response){
                            // error
                            $log.log("error. . ." + response.status + "||" + response.statusText);
                            model = angular.copy($scope.analysisResultBaseModel);
                            //$scope.analysisResultModel.resultRowList = [];
                            $scope.error = true;
                            $scope.message = "error. . ." + response.status + "||" + response.statusText;
                            
                        });
                    
                    $uibModalInstance.close();
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };                
            },
            size: size,
            resolve: {
                model:function(){
                    return $scope.analysisResultModel;
                },
                type: function(){
                    return type;
                },
                title: function(){
                    return title;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $log.info('favoritesModal OK at: ' + new Date());
        }, 
        function () {
            $log.info('favoritesModal Cancel at: ' + new Date());
        });
    }; // end $scope.openFavoritesModal = function(size)

}]); // end CORPAPPS.diffTool.app.controller("diffToolCtrl", 
