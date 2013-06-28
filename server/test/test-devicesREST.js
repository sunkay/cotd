var chai = require('chai'),
    express = require('express'),
    request = require('supertest');

var app = require('../server');

var expect = chai.expect;        

describe('GET /devices', function(){
    it('should return 200 and JSON with valid keys', function(done){
        request(app)
        .get('/devices')
        .end(function(err, res){
            //validate the keys in the response JSON matches, we dont care about the values
            expect(res.status).to.equal(200);
            expect(res.body[0]).to.have.keys(['id', 'name', 'assetTag', 'owner', 'desc']);
            done();
        });
    });    
});

describe('GET /devices/0', function(){
    it('should return 200 and JSON with valid keys', function(done){
        request(app)
        .get('/devices/0')
        .end(function(err, res){
            //validate the keys in the response JSON matches, we dont care about the values
            expect(res.status).to.equal(200);
            expect(res.body).to.have.keys(['id', 'name', 'assetTag', 'owner', 'desc']);
            done();
        });
    });    
});

describe('POST /devices', function(){
    it('should return 200 and status JSON have valid status', function(done){
        request(app)
        .post('/devices')
        .send({id:7, name: "iphone", assetTag:"a73856", owner:"dev", desc:"iOS5"})
        .end(function(err, res){
            //validate the keys in the response JSON matches, we dont care about the values
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({status: '1'});
            done();
        });
    });    
});

describe('PUT /devices/0', function(){
    it('should return 200 and status JSON have valid status', function(done){
        request(app)
        .put('/devices/0')
        .send({id:0, name: "iphone", assetTag:"a73856", owner:"dev", desc:"iOS5"})
        .end(function(err, res){
            //validate the keys in the response JSON matches, we dont care about the values
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({status: '1'});
            done();
        });
    });    
});

describe('Delete /devices/0', function(){
    it('should return 200 and status JSON have valid status', function(done){
        request(app)
        .del('/devices/0')
        .end(function(err, res){
            //validate the keys in the response JSON matches, we dont care about the values
            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal({status: '1'});
            done();
        });
    });    
});
