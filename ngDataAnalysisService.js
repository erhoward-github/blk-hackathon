CORPAPPS.diffTool.app.service("getDiffToolDataService", 
        ["$log","$window","$http","$q","guidService","urls",function($log,$window,$http,$q,guidService,urls){
            
    var operators = {
        "=":"equal to (-)",
        "!=":"not equal to (!-)",
        
        "<":"less than (<)",
        "<=":"less than or equal to (<=)",
        
        ">":"greater than (<)",
        ">=":"greater than or equal to (>=)",
        
        "~":"does match - case sensitive (~)",
        "~~":"does match (~~)",
        "!~":"does not match - case sensitive (!~)",
        "!~~":"does not match (!~~)",
        
        "?":"includes (?)",
        "!?":"excludes (!?)",
        
        "!":"not (!)",
        "&&":"and (&)",
        "||":"or (|)"
    }; // end var operators = {
    
    /*
    var model = {
      "rules": [
        {
          "id": "uid-ab44a6a2-3050-c488-d17e-79c7856e517c",
          "ruleName": "rule01",
          "matchCriteria": "Vivamus vitae eros sodales enim laoreet ornare at id nulla. Morbi vel porta purus. Nulla velit ipsum, dignissim eu blandit quis, pulvinar sit amet ligula. Nullam id rhoncus eros. Mauris lacinia, tortor vitae ultricies molestie, sapien ante cursus tellus, eget malesuada enim velit vel nisl. Sed efficitur nulla maximus augue consectetur tempus. Fusce ultricies ligula vitae sem accumsan placerat. In hac habitasse platea dictumst. Pellentesque et porta ex. Integer ut lectus posuere, scelerisque ligula at, eleifend leo. Vestibulum sodales tincidunt tortor, eget congue tellus congue in. Donec et metus neque. Aliquam quis semper turpis. Phasellus congue enim id aliquam ornare.",
          "matched": "no",
          "ruleType": "filter"
        },
        {
          "id": "uid-f0c11ba5-7d81-520f-75aa-27bf2d93eba1",
          "ruleName": "rule02",
          "matchCriteria": "Etiam ac feugiat ex, eget placerat purus. Nunc vel sapien condimentum elit accumsan imperdiet nec ut velit. Pellentesque vehicula sodales justo. Sed viverra, nunc viverra accumsan eleifend, tellus risus imperdiet est, nec ullamcorper turpis lorem eu sapien. Quisque erat nisl, placerat at est ut, porta molestie dui. Mauris euismod, magna a lacinia gravida, turpis arcu condimentum risus, et tincidunt sapien nunc sit amet ante. Donec dictum odio in posuere fermentum. Duis blandit ex tristique condimentum mattis. Aliquam id aliquet turpis. Nunc vulputate ultrices erat ut ultrices. Sed at neque eu dolor laoreet volutpat a et quam. Curabitur sagittis arcu dapibus rhoncus vulputate. Praesent congue elementum ligula, vitae iaculis magna dignissim ut. Suspendisse lacus ex, molestie non enim eu, cursus ultrices ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat purus porta quam posuere aliquam.",
          "matched": "no",
          "ruleType": "filter"
        },
        {
          "id": "uid-e7894b74-ff67-b77f-27f4-dda7291c4101",
          "ruleName": "rule03",
          "matchCriteria": "Praesent suscipit scelerisque urna sed pulvinar. Etiam id ante nec nunc pellentesque tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis est quam, laoreet eu nibh vel, interdum efficitur tellus. Nullam porta accumsan ante, id venenatis ex feugiat quis. Integer nec varius massa, sit amet mattis felis. Curabitur sodales odio vitae varius pulvinar. Sed sed arcu justo. Cras eget imperdiet neque. Maecenas sagittis porta enim, vel venenatis nisi. Morbi neque tellus, accumsan quis tristique vitae, sodales in nulla.",
          "matched": "no",
          "ruleType": "filter"
        },
        {
          "id": "uid-5d06b672-a7e3-196d-4f21-24a0345e13f8",
          "ruleName": "rule04",
          "matchCriteria": "Morbi tempor, justo vitae consectetur porttitor, neque tortor scelerisque sem, sed semper orci ligula id magna. Maecenas lectus mauris, consectetur vel mauris id, placerat vestibulum augue. Aliquam cursus ultricies aliquet. Nam ac lorem vitae sem laoreet bibendum et in mi. Vivamus consequat, magna eu egestas vulputate, dui odio pulvinar erat, vel vestibulum diam elit et nunc. In porttitor quam eros, ac maximus nulla faucibus non. Duis tristique elit urna, accumsan tincidunt odio molestie eget. Quisque ut eleifend ipsum. Cras hendrerit sit amet turpis eu sagittis. Curabitur condimentum ipsum vel mauris maximus, a tincidunt urna semper. Duis euismod justo justo, sed mollis felis gravida at",
          "matched": "no",
          "ruleType": "filter"
        },
        {
          "id": "uid-4a29c561-2206-900c-56fb-44430b3600bd",
          "ruleName": "rule05",
          "matchCriteria": "Proin vulputate, ante sit amet elementum varius, turpis elit congue nulla, ac pharetra ante nisi vel lorem. Sed a molestie ante. Integer tristique semper bibendum. Praesent quis tristique enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in mi massa. Nam hendrerit commodo odio, sagittis tempor ex porttitor quis. Maecenas pretium in odio sodales scelerisque. Mauris molestie lectus vel neque sollicitudin dictum. Vivamus eu risus tempus, faucibus lacus sit amet, consequat neque. Donec tristique egestas sagittis. Integer ornare est ut orci lobortis, a congue metus semper. Vivamus sed metus at nisi pretium mattis. Nullam diam ligula, consectetur eget dolor non, facilisis mattis dolor.",
          "matched": "no",
          "ruleType": "filter"
        },
        {
          "id": "uid-ad22c407-b3b1-5749-cbaf-4b8590a1faca",
          "ruleName": "rule06",
          "matchCriteria": "Integer at neque tincidunt, ultricies purus vel, tincidunt nunc. Aliquam lacinia aliquam aliquet. Vestibulum quis lacus vel leo dignissim pharetra. Maecenas porttitor efficitur purus dictum dictum. Aenean dapibus pellentesque lectus at viverra. Nam malesuada nunc sed nibh tincidunt, sed mattis quam congue. Nulla et nunc est.",
          "matched": "no",
          "ruleType": "filter"
        },
        {
          "id": "uid-4ca013d3-c39b-1637-83ae-17be5e94a976",
          "ruleName": "rule07",
          "matchCriteria": "Fusce vestibulum ullamcorper pellentesque. Maecenas dictum venenatis erat ut pellentesque. Nulla bibendum faucibus dolor in convallis. Aenean lorem nunc, scelerisque sed purus ut, vulputate auctor justo. Morbi eu cursus nisi. In ut purus dui. Aenean sollicitudin neque quis accumsan mollis. In convallis volutpat sodales. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent vitae leo tempor orci convallis venenatis. Vestibulum ac sem quis nibh cursus lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas dignissim laoreet neque at cursus",
          "matched": "no",
          "ruleType": "filter"
        }
      ],
      "data": [],
      "columnMapping":"A.cusip = B.cusip\nA.cusip = C.cusip\nA.asofdate = B.asofdate\nA.asofdate = C.asofdate",
      "columnDataMapping":""
    }; // end var model = {
    */
    
    var analysisResultModel = 
    {"analysisResultModel":{
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

    }};
     
    //var toolRulesModel = angular.copy(model);
    //var dataToolRequestModel = {};
    
    var sourceModel = [
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
    
    //model.sourceModel = angular.copy(sourceModel); 
    
    //var response = {data: model, status:"OK", statusText:"data found"};
    //var response = {data: dataToolRequestModel, status:"OK", statusText:"data found"};
    
    this.getData = function(){
        dataToolRequestModel.toolRulesModel = angular.copy(toolRulesModel);
        dataToolRequestModel.sourceModel = angular.copy(sourceModel);
        
        // var promise = $http.get(urls.dataFile);
        // return promise;
        
        var deferred = $q.defer();
        deferred.resolve(response);
        return deferred.promise;
    };
    
    
    this.getAnalysisResultModel = function(){
        // submit
        
        // actual remote data
        
        var data = {"name":"test"};
        var promise = $http.post(urls.submitUrl,data);
        return promise;
        
        
        // test local data
        /*
        var response = {data: analysisResultModel, status:"OK", statusText:"data found"};
        var deferred = $q.defer();
        deferred.resolve(response);
        return deferred.promise;
        */
    };
    /*
    this.getUploadResultModel = function(){
        // upload
        var promise = $http.get(urls.uploadUrl);
        return promise;
    };
    */
    
    this.getFavoriteModel = function(){
        // loadFavoriteUrl
        // actual remote data
        
        var data = {"name":"test"};
        var promise = $http.post(urls.loadFavoriteUrl,data);
        return promise;
        
        
        // test local data
        //var response = {data: analysisResultModel, status:"OK", statusText:"data found"};
        //var deferred = $q.defer();
        //deferred.resolve(response);
        //return deferred.promise;
        
    };
    
    
}]); //end CORPAPPS.diffTool.app.service("getDiffToolDataService"

CORPAPPS.diffTool.app.service("guidService", ["$log", function ($log) {
    this.getGuid = function () {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        var guid = "uid-" + _p8() + _p8(true) + _p8(true) + _p8();
        //$log.log("guid: " + guid);
        return guid;
    }; // end this.getGuid = function(){
    this.randomBetween = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }; // end var randomBetween = function (min, max)
}]); // end CORPAPPS.diffTool.app.service("guidService",

CORPAPPS.diffTool.app.service("getValueFromUrlService",
    ["$log", "$window", "$location",
    function ($log, $window, $location) {

        function readyForRegExp(textIn) {
            var textOut = "";
            var charIn = "";
            var regExpChar = "\\^$*+?.[]-{}()|";

            for (var i = 0; i < textIn.length; ++i) {
                charIn = textIn.charAt(i);
                if (regExpChar.indexOf(charIn) !== -1) {
                    textOut += "\\" + charIn;
                }
                else {
                    textOut += charIn;
                }
            }
            return textOut;
        } // end function readyForRegExp(textIn)

        function trim(stringIn) {
            if (stringIn === "" || stringIn === null) {
                return "";
            }
            else {
                //return stringIn.replace(/^\s*/, "").replace(/\s*$/, "");
                return stringIn.replace(/^\s+/, "").replace(/\s\s*$/, "");
            }
        } // end function trim(stringIn)

        function getValueFromName(urlNameIn) {
            var urlValue = "";
            var urlName = readyForRegExp(urlNameIn);
            var search = trim(location.search);
            if (search === "") {
                return "";
            }
            search = decodeURIComponent(search);
            // [\?&]open=(\w+)&?
            //var pattern = new RegExp("[\\?&]" + urlName + "=(\\w+)&?");
            var pattern = new RegExp("[\\?&]" + urlName + "=([A-Za-z0-9_ ]+)&?");

            urlValue = "";
            if (pattern.test(search)) {
                urlValue = RegExp.$1;
            }
            return urlValue;
        } // end function getValueFromName(urlNameIn)

        /*
        return {getValueFromUrl:function(urlNameIn){
            return getValueFromName(urlNameIn);
        }};
        */

        this.getValueFromUrl = function (urlNameIn) {
            return getValueFromName(urlNameIn);
        }; // end this.getValueFromUrl = function(urlNameIn){

}]); // end CORPAPPS.dist.service("getValueFromUrlService", 
