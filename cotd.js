// controllers

function deviceListController($scope)
{
    $scope.devices = [
        {name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"},
        {name: "loaner-laptop-1", assetTag:"a13936", owner:"dev", desc:""},
        {name: "loaner-laptop-3", assetTag:"a43056", owner:"qa", desc:""},
        {name: "android", assetTag:"a33756", owner:"dev", desc:"android2.4"},
        {name: "galaxy tab", assetTag:"a53356", owner:"dev", desc:"android"},
        {name: "loaner-laptop-2", assetTag:"a63556", owner:"qa", desc:""},
        {name: "iphone", assetTag:"a73856", owner:"dev", desc:"iOS5"}
    ];
}