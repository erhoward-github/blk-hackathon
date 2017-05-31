<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Data Analysis Tool</title>
<!-- 
http://localhost:8080/datatool/DataAnalysis/index
http://localhost:8081/datatool/DataAnalysis/index?debug=1
http://localhost:8082/datatool/DataAnalysis/index?debug=1
-->
<link rel="stylesheet" href="../scripts/css/lib/bootstrap.css">
<link rel="stylesheet" href="../scripts/css/lib/ui-grid.css">
<link rel="stylesheet" href="../scripts/css/ngDataAnalysis.css">

<script src="../scripts/js/lib/jquery-1.11.3.js"></script>
<script src="../scripts/js/lib/angular.js"></script>
<script src="../scripts/js/lib/angular-animate.js"></script>
<script src="../scripts/js/lib/angular-route.js"></script>
<script src="../scripts/js/lib/ui-bootstrap-tpls-1.1.2.js"></script>
<script src="../scripts/js/lib/ui-grid.js"></script>
<script src="../scripts/js/lib/bootstrap.js"></script>
<script src="../scripts/js/lib/angular-file-upload.js"></script>
<!--[if lt IE 9]>
<script src="../scripts/js/lib/html5shiv.min.js"></script>
<script src="../scripts/js/lib/respond.min.js"></script>
<![endif]-->


<script src="../scripts/js/ng/controller/ngDataAnalysisController.js"></script>
<script src="../scripts/js/ng/directive/ngDataAnalysisDirective.js"></script>
<script src="../scripts/js/ng/service/ngDataAnalysisService.js"></script>

<style>
.btn-primary
{
background-color:#008ccf !important;
}
</style>

</head>
<body data-ng-app="diffToolApp">
<div class="ai-header">
    <div class="ai-header-title">Data Analysis Tool</div>
    <div class="ai-header-controls">
        <div class="ai-header-logo">
            <div class="ai-header-options">
               </div>
        </div>
    </div>
</div>

<div class="container" data-ng-controller="diffToolCtrl">

<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
 
                <li>
                    <a href="#nogo" data-ng-click="reset();" ng-disabled="uploader.queue.length || !uploadOK">
                        <span class='glyphicon glyphicon-refresh' title="Reset All"></span>
                    </a>
                </li>

                <li data-ng-show="submitOK">
                    <a href="#nogo" data-ng-click="submit();">
                        <span class='glyphicon glyphicon-saved' title="Submit"></span>
                    </a>
                </li>
                <li class="dropdown" data-ng-show="favoritesOK">
                    <a href="#nogo" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" 
                            aria-expanded="false">
                        <span class='glyphicon glyphicon-star-empty' title="Favorites"></span>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="#" data-ng-click="openFavoritesModal('lg','myFavorites','My Favorites');">My Favorites</a></li>
                        <li><a href="#" data-ng-click="openFavoritesModal('lg','sharedFavorites','Shared Favorites');">Shared Favorites</a></li>
                        <li><a href="#" data-ng-click="openFavoritesModal('lg','find','Find');">Find</a></li>
                        <li><a href="#" data-ng-click="openFavoritesModal('lg','addFavorite','Add Favorite');">Add Favorite</a></li>
                    </ul>
                </li>
                <li data-ng-show="helpOK">
                    <!-- 
                    <a href="https://webster.bfm.com/Wiki/display/apps/Enterprise+Data+Analysis+Tool+Project+Dashboard">
                    -->
                    <a href="{{urls.infoUrl}}" target="_blank">
                        <span class='glyphicon glyphicon-info-sign' title="Information"></span>
                    </a>
                </li>
                <li data-ng-show="exportOK">
                    <a href="#nogo">
                        <span class='glyphicon glyphicon-export' title="Export"></span>
                    </a>
                </li>
                
            </ul>
        </div>
    </div>
</nav>
<!--
<div class="alert alert-success" role="alert">...</div>
<div class="alert alert-info" role="alert">...</div>
<div class="alert alert-warning" role="alert">...</div>
-->
<div data-ng-class="error ? 'alert alert-danger' : 'alert alert-success'" role="alert" data-ng-show="error">{{message}}</div>
<uib-tabset>
    <uib-tab  select="selectDataAnalysisRequest()">
        <uib-tab-heading>Data Analysis Request</uib-tab-heading>

        
        
        <div class="panel panel-default" ng-show="showUploadPane" >
            <div class="panel-heading"><b>File Upload</b></div>
            <div class="panel-body">
            
                <div>
                    <input type="file" nv-file-select="" uploader="uploader" multiple /><br/>
                    <ul>
                        <li ng-repeat="item in uploader.queue">
                                Name: <span ng-bind="item.file.name"></span><br/>
                            <button ng-click="item.upload()">upload</button>
                        </li>
                    </ul>
                
                    <table class="table">
                        <thead>
                            <tr>
                                <th width="50%">Name</th>
                                <th ng-show="uploader.isHTML5">Size</th>
                                <th ng-show="uploader.isHTML5">Progress</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in uploader.queue">
                                <td><strong>{{ item.file.name }}</strong></td>
                                <td ng-show="uploader.isHTML5" nowrap>{{ item.file.size/1024/1024|number:2 }} MB</td>
                                <td ng-show="uploader.isHTML5">
                                    <div class="progress" style="margin-bottom: 0;">
                                        <div class="progress-bar" role="progressbar" ng-style="{ 'width': item.progress + '%' }"></div>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <span ng-show="item.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>
                                    <span ng-show="item.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>
                                    <span ng-show="item.isError"><i class="glyphicon glyphicon-remove"></i></span>
                                </td>
                                <td nowrap>
                                    <!-- 
                                    <button type="button" class="btn btn-success btn-xs" ng-click="item.upload()" ng-disabled="item.isReady || item.isUploading || item.isSuccess">
                                        <span class="glyphicon glyphicon-upload"></span> Upload
                                    </button>
                                    -->
                                    <button type="button" class="btn btn-primary btn-xs" ng-click="item.cancel()" ng-disabled="!item.isUploading">
                                        <span class="glyphicon glyphicon-ban-circle"></span> Cancel
                                    </button>
                                    <button type="button" class="btn btn-primary btn-xs" ng-click="item.remove()">
                                        <span class="glyphicon glyphicon-trash"></span> Remove
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>    
                
                    <div>
                        <div>
                            <span>Queue progress:</span>
                            <div class="progress" style="">
                                <div class="progress-bar" role="progressbar" ng-style="{ 'width': uploader.progress + '%' }"></div>
                            </div>
                        </div>
 
                        <button type="button" title="Upload All (Alt+U)" accesskey="U" class="btn btn-primary btn-xs" ng-click="uploadComplete=false;uploader.uploadAll()" ng-disabled="!uploader.getNotUploadedItems().length">
                            <span class="glyphicon glyphicon-upload"></span>
                            <span>Upload all</span>
                        </button>

                        <button type="button" title="Cancel All (Alt+C)" accesskey="C" class="btn btn-primary btn-xs" ng-click="uploader.cancelAll()" ng-disabled="!uploader.isUploading">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                            <span>Cancel all</span>
                        </button>
                        
                        <button type="button" title="Remove All (Alt+M)" accesskey="M" class="btn btn-primary btn-xs" ng-click="uploader.clearQueue()" ng-disabled="!uploader.queue.length">
                            <span class="glyphicon glyphicon-trash"></span>
                            <span>Remove all</span>
                        </button>
                        
                        <button type="button" title="Proceed (Alt+P)" accesskey="P" class="btn btn-primary btn-xs" ng-click="proceed();" ng-disabled="uploader.queue.length || !uploadOK">
                            <span class="glyphicon glyphicon-download"></span>
                            <span>Proceed</span>
                        </button>
                        
                        <button type="button" title="Reset All (Alt+S)" accesskey="S" class="btn btn-primary btn-xs" ng-click="reset();" ng-disabled="uploader.queue.length || !uploadOK">
                            <span class="glyphicon glyphicon-refresh"></span>
                            <span>Reset All</span>
                        </button>
                        
                    </div>    
                </div>


            </div>
        </div>  
        <!--  end panel -->      
        
        <uib-accordion close-others="true">

            <uib-accordion-group ng-click="reportingOptionsOpen = !reportingOptionsOpen" ng-show="showAnalysisPanes" is-open="true">
                <uib-accordion-heading>
                    <b>Reporting Options</b>
                    <span ng-show="!reportingOptionsOpen" class="glyphicon glyphicon-expand"></span>
                    <span ng-show="reportingOptionsOpen" class="glyphicon glyphicon-collapse-down"></span>
                </uib-accordion-heading>
                <!-- 
                <div class="btn-bar">
                    <button type="button" class="btn btn-primary btn-xs" ng-click="reset();">
                        <span class="glyphicon glyphicon-refresh"></span>
                        <span>Reset All</span>
                    </button>
                </div>
                <hr/>
                -->
                <div class="row">
                    <div class="col-md-12">
                        <div>
                            <input type="checkbox" id="gpReport" name="gpReport">
                            <label for="gpReport">GP Report</label>
                            &nbsp;&nbsp;
                            <input type="checkbox" id="screen" name="screen">
                            <label for="screen">Screen</label>
                        </div>
                        <div>
                            <input type="checkbox" id="email" name="email">
                            <label for="email">Email</label>
                        </div>
                        <div>
                            <textarea id="emailList" name="emailList" rows="2" cols="64" placeholder="Enter comma-separated list of email addresses"></textarea>
                        </div>
                    </div>
                </div>
            </uib-accordion-group>

            <uib-accordion-group 
                    ng-click="mappingOptionsOpen = !mappingOptionsOpen" 
                    ng-show="showAnalysisPanes" 
                    is-open="false">
                <uib-accordion-heading>
                    <b>Mapping Options</b>
                    <span ng-show="!mappingOptionsOpen" class="glyphicon glyphicon-expand"></span>
                    <span ng-show="mappingOptionsOpen" class="glyphicon glyphicon-collapse-down"></span>
                </uib-accordion-heading>
                <form>
                    <div class="form-group">
                        <!--
                        <label for="columnMapping">Column Mapping</label>
                        -->
                        <div class="btn-bar">
                            <button class="btn btn-primary btn-xs" data-ng-click="openColumnMappingModal('lg');">
                                <span class="glyphicon glyphicon-modal-window"></span>
                                <span>Column Mapping</span>
                            </button>
                            <!-- 
                            <button type="button"  title="Reset All (Alt+S)" accesskey="S" class="btn btn-primary btn-xs" ng-click="reset();">
                                <span class="glyphicon glyphicon-refresh"></span>
                                <span>Reset All</span>
                            </button>
                            -->
                        </div>
                        <hr/>
                        <textarea class="form-control" 
                            id="columnMapping" 
                            placeholder="Enter Column Mapping" 
                            data-ng-model="analysisResultModel.columnMapping"
                            rows="8"
                            cols="96">
                        </textarea>
                    </div>
                </form>  
            </uib-accordion-group>
            <uib-accordion-group
                    ng-click="dataRulesOpen = !dataRulesOpen" 
                    ng-mousedown="resizeGrid();"
                    ng-show="showAnalysisPanes" 
                    is-open="false">
                <uib-accordion-heading>
                    <b>Data Rules</b>
                    <span ng-show="!dataRulesOpen" class="glyphicon glyphicon-expand"></span>
                    <span ng-show="dataRulesOpen" class="glyphicon glyphicon-collapse-down"></span>
                </uib-accordion-heading>
                <div class="btn-bar">
                    <button title="Add Rule (Alt+A)" accesskey="A" class="btn btn-primary btn-xs" data-ng-click="addRule();">
                        <span class='glyphicon glyphicon-plus'></span>
                        <span>Add Rule</span>
                    </button>
                    <button title="Delete All Rules (Alt+L)" accesskey="L" class="btn btn-primary btn-xs" data-ng-click="deleteAllRules();">
                        <span class='glyphicon glyphicon-remove'></span>
                        <span>Delete All Rules</span>
                    </button>
                    <!-- 
                    <button type="button" title="Reset All (Alt+S)" accesskey="S" class="btn btn-primary btn-xs" ng-click="reset();">
                        <span class="glyphicon glyphicon-refresh"></span>
                        <span>Reset All</span>
                    </button>
                    -->
                </div>
                <hr>
                <div ui-grid="rulesGridOptions" ui-grid-cellNav ui-grid-edit ui-grid-resize-columns ui-grid-selection class="grid"></div>
                <!-- 
                <div ui-grid="rulesGridOptions" ui-grid-cellNav ui-grid-edit ui-grid-resize-columns class="grid"></div>
                -->
            </uib-accordion-group>
        </uib-accordion>
    </uib-tab>
    <uib-tab select="selectAnalysisResult()">
        <uib-tab-heading>Analysis Result</uib-tab-heading>
        
        <!--  rhoward new -->
        <!-- 
        <div ui-grid="resultGridOptions" ui-grid-resize-columns class="grid"></div>
        -->
        
        <!--  table here -->
        <div data-ng-include="analysisResultTable.html"></div>
        
        
    </uib-tab>
</uib-tabset>


<div data-ng-show="debugMode">
<pre>analysisResultModel = {{analysisResultModel | json}}</pre>
<pre>uploadResultModel = {{uploadResultModel | json}}</pre>
<!-- 
<pre>{{model | json}}</pre>
-->
</div>

</div>
    
</body>
</html>
