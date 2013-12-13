/**
 * Created by yixian on 13-12-11.
 */

angular.module('ie7support', []).config(function ($sceProvider) {
    // Completely disable SCE to support IE7.
    $sceProvider.enabled(false);
});
function PhoneListCtrl($scope, $http) {
    $http.get("data/xfdata.json").success(function (data) {
        console.log(data);
        $scope.xflist = data.xflist;
    });

    $scope.addItem = function () {

    }
}


