/**
 * Created by yixian on 13-12-11.
 */
angular.module('ie7support', []).config(function ($sceProvider) {
    // Completely disable SCE to support IE7.
    $sceProvider.enabled(false);
});
function PhoneListCtrl($scope, $http) {
    $http.post("data/xfdata.json",{}).success(function (data) {
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
    $scope.addItem = function (item) {
        item.amount = parseInt(item.amount);
        $scope.xflist.push(item);
    }

    $scope.deleteItem = function(index,item){
        console.log(item);
        $scope.xflist.splice(index,1);
    }

    $scope.sortBy = function(key){
        $scope.orderColumn = key;
    }
}


