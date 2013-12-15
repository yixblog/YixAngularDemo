/**
 * Created by yixian on 13-12-11.
 */
angular.module('ie7support', []).config(function ($sceProvider) {
    // Completely disable SCE to support IE7.
    $sceProvider.enabled(false);
});
function PhoneListCtrl($scope, $http) {
    $http.post("data/xfdata.json", {}).success(function (data) {
        console.log(data);
        $scope.xflist = data.xflist;
    });

    $scope.totalAmount = function () {
        var total = 0;
        angular.forEach($scope.xflist, function (item) {
            total += item.amount;
        })
        return total;
    }
    $scope.addOrEditItem = function (item) {
        item.amount = parseInt(item.amount);
        if (item.id != "") {
            angular.forEach($scope.xflist, function (xfitem) {
                if (xfitem.id == item.id) {
                    xfitem.type = item.type;
                    xfitem.amount = item.amount;
                    xfitem.date = item.date;
                }
            })
        } else {
            $scope.xflist.push(item);
        }
    }

    $scope.deleteItem = function (index, item) {
        console.log(item);
        $scope.xflist.splice(index, 1);
    }

    $scope.sortSymbol = function (key) {
        if ($scope.orderColumn == key) {
            return $scope.orderReverce ? '↑' : '↓'
        }
        return ''
    }

    $scope.sortBy = function (key) {
        console.log(key);
        console.log($scope.orderColumn);
        if ($scope.orderColumn == key) {
            $scope.orderReverce = !$scope.orderReverce;
        }else{
            $scope.orderReverce = false;
        }
        $scope.orderColumn = key;
    }

    $scope.editItem = function (index, item) {
        console.log(index);
    }
}


