var devices = [
        {id:0, name: "iphone", assetTag:"a23456", owner:"dev", desc:"iOS4.2"},
        {id:1, name: "loaner-laptop-1", assetTag:"a13936", owner:"dev", desc:""},
        {id:2, name: "loaner-laptop-3", assetTag:"a43056", owner:"qa", desc:""},
        {id:3, name: "android", assetTag:"a33756", owner:"dev", desc:"android2.4"},
        {id:4, name: "galaxy tab", assetTag:"a53356", owner:"dev", desc:"android"},
        {id:5, name: "loaner-laptop-2", assetTag:"a63556", owner:"qa", desc:""},
        {id:6, name: "iphone", assetTag:"a73856", owner:"dev", desc:"iOS5"}
        ];

exports.findAll = function(req, res){
    res.send(devices)
};

exports.findById = function(req, res){
    res.send(devices[req.params.id]);
};

exports.add = function(req,res){
    var dev = req.body;
    console.log(JSON.stringify(dev));
    devices.push(dev);
    console.log(devices);
    res.send([{status: '1'}]);
};