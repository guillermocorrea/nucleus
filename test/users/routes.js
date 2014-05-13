/**
 * Created by guillermo on 12/05/2014.
 */
'use strict';

// import the moongoose helper utilities
var utils = require('../utils');
var request = require('supertest');
var should = require('should');
var app = require('../../app');
var User = require('../../models/user');

describe('Users: routes', function () {
    describe('POST /signup', function () {
        it('should redirect to "/account" if the form is valid', function (done) {
            var post = {
                givenName: 'Barrack',
                familyName: 'Obama',
                email: 'berry@example.com',
                password: 'secret'
            };
            request(app)
                .post('/signup')
                .send(post)
                .expect(302)
                .end(function (err, res) {
                    should.not.exist(err);
                    // confirm the redirect
                    res.header.location.should.include('/account');
                    done();
                });
        });
    });
    it('should redirect to "/signup" if the form is invalid', function (done) {
        var post = {
            givenName: 'Barrack',
            familyName: '',
            email: 'fakeemail',
            password: 'se'
        };
        request(app)
            .post('/signup')
            .send(post)
            .expect(302)
            .end(function (err, res) {
                should.not.exist(err);
                // confirm the redirect
                res.header.location.should.include('/signup');
                done();
            });
    });

    it('should create a new User if the form is valid', function (done) {
        var post = {
            givenName: 'Barrack',
            familyName: 'Obama',
            email: 'berry@example.com',
            password: 'secret'
        };
        request(app)
            .post('/signup')
            .send(post)
            .expect(302)
            .end(function (err, res) {
                should.not.exist(err);
                User.find(function (err, users) {
                    users.length.should.equal(1);
                    var u = users[0];
                    // Make sure the user values match up.
                    u.name.givenName.should.equal(post.givenName);
                    u.name.familyName.should.equal(post.familyName);
                    u.emails[0].value.should.equal(post.email);
                    u.passwordHash.should.be.ok;
                    done();
                });
            });
    });
});