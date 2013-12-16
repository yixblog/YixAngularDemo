/**
 * Created by yixian on 13-12-11.
 */
var app = angular.module('ie7support', []).config(function ($sceProvider) {
    // Completely disable SCE to support IE7.
    $sceProvider.enabled(false);
});

app.controller('XFListCtrl', function ($scope, $http,$log) {
    $http.post("data/xfdata.json", {}).success(function (data) {
        $log.debug(data);
        $scope.xflist = data.xflist;
    });

    $scope.totalAmount = function () {
        var total = 0;
        angular.forEach($scope.xflist, function (item) {
            total += parseInt(item.amount);
        });
        return total;
    };
    $scope.addOrEditItem = function (item) {
        $log.info('add item');
        $log.info(item);
        item.amount = parseInt(item.amount);
        if (item.id!=null && item.id != "") {
            angular.forEach($scope.xflist, function (xfitem) {
                if (xfitem.id == item.id) {
                    xfitem.type = item.type;
                    xfitem.amount = item.amount;
                    xfitem.date = item.date;
                }
            })
        } else {
            item.id=generateId();
            $scope.xflist.push(item);
        }
    };

    function generateId(){
        var maxId= 0;
        $($scope.xflist).each(function(){
            maxId = Math.max(this.id,maxId);
        });
        return maxId+1;
    }

    $scope.deleteItem = function (index, item) {
        $log.debug(item);
        $scope.xflist.splice(index, 1);
    };

    $scope.sortSymbol = function (key) {
        if ($scope.orderColumn == key) {
            return $scope.orderReverce ? '↑' : '↓'
        }
        return ''
    };

    $scope.sortBy = function (key) {
        $log.debug(key);
        $log.debug($scope.orderColumn);
        if ($scope.orderColumn == key) {
            $scope.orderReverce = !$scope.orderReverce;
        } else {
            $scope.orderReverce = false;
        }
        $scope.orderColumn = key;
    };

    $scope.editItem = function (index, item) {
        $scope.formVal = {id: item.id, type: item.type, date: item.date, amount: item.amount};
    };


});

app.directive('ngHighcharts', function ($log) {
    function buildHighcharts(element, xfdata) {
        var highchartsParam = {
            chart: {
                type: 'column'
            },
            title: {
                text: '信访分布'
            },
            yAxis: {
                min: 0,
                title: {
                    text: "人数"
                }
            }
        };
        var categories = [];
        var values = [];
        for (var type in xfdata) {
            categories.push(type);
            values.push(xfdata[type]);
        }
        highchartsParam.xAxis = {
            categories: categories
        };
        highchartsParam.series = [
            {
                name: '信访',
                data: values
            }
        ];
        element.highcharts(highchartsParam);
    }

    function sumXFList(xflist) {
        var newList = {};
        $(xflist).each(function () {
            var type = this.type;
            var amount = parseInt(this.amount);
            if (newList[type] != null) {
                newList[type] += amount;
            } else {
                newList[type] = amount;
            }
        });
        return newList;
    }

    function link(scope, element, attrs) {
        $log.debug("xflist");
        $log.debug(scope.xflist);
        $log.debug(attrs);
        scope.$watch('xflist', function (list) {
            $log.info('recognize xflist change:');
            $log.info(list);
            var sumedList = sumXFList(list);
            $log.debug('sum elements');
            $log.debug(sumedList);
            buildHighcharts(element, sumedList);
        },true)
    }

    return {
        link: link
    }
});
