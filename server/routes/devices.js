var devices = [
        {id:0, name: "iphone-UT-record-dont-delete", assetTag:"a23456-UT-record", owner:"dev-UT-record", desc:"iOS4.2-UT-record"},
        {id:1, name: "loaner-laptop-1", assetTag:"a13936", owner:"dev", desc:""},
        {id:2, name: "loaner-laptop-3", assetTag:"a43056", owner:"qa", desc:""},
        {id:3, name: "android", assetTag:"a33756", owner:"dev", desc:"android2.4"},
        {id:4, name: "galaxy tab", assetTag:"a53356", owner:"dev", desc:"android"},
        {id:5, name: "loaner-laptop-2", assetTag:"a63556", owner:"qa", desc:""},
        {id:6, name: "iphone", assetTag:"a73856", owner:"dev", desc:"iOS5"}
        ];

exports.findAll = function(req, res){
    console.log("Info: findAll: GET Devices request recieved");
    res.send(devices)
};

exports.findById = function(req, res){
    console.log("Info: findById: GET: Id:", req.params.id);

    // find the device with id
    rid = req.params.id;
    var device;
    devices.forEach(function(item, i){
        if(item.id == rid){
            device = devices[i];
        }
    });

    console.log("Info: findById: GET: device: ", device);
    res.send(device);
};

exports.add = function(req,res){
    var dev = req.body;
    console.log("Info: add: Post: device: ", dev);
    devices.push(dev);
    res.send({status: '1'});
};

exports.update = function(req, res){
    // get the device
    var id = req.params.id;
    var dev = req.body;
    console.log("Info: update: PUT: device: ", dev, " Id:", id);
    if(id != dev.id){
        console.error("ERROR: update: id's do not match for update");
        res.send({status: '0'});
    }

    // find the selected device & update
    devices.forEach(function(item, i){
        if(item.id == id){
            // update         
            devices[i] = dev; 
            console.log("Info: update: PUT: updating: ", item.id);
            res.send({status: '1'});
            return;
        }
    });
    res.send({status: '0'});
};

exports.delete = function(req, res){
    var id = req.params.id;
    devices = devices.filter(function(item){
        return item.id != id;
    });
    console.log("Info: Deleted: id: ", id);
    res.send({status: '1'});

};
