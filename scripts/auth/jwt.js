const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync(path.resolve(__dirname, './private.key'), 'utf8');
var publicKEY = fs.readFileSync(path.resolve(__dirname, './public.key'), 'utf8');



module.exports = {
	sign: (payload, options = {}, cb) => {
		/*
		 sOptions = {
		  issuer: "Authorizaxtion/Resource/This server",
		  subject: "iam@user.me", 
		  audience: "Client_Identity" // this should be provided by client
		 }
		*/
		// Token signing options
		console.log(privateKey);
		return jwt.sign(payload, privateKEY, options, cb);
	},
	verify: (token, options, cb) => {
		/*
		 vOption = {
		  issuer: "Authorization/Resource/This server",
		  subject: "iam@user.me", 
		  audience: "Client_Identity" // this should be provided by client
		 }  
		*/
		var verifyOptions = {
			expiresIn: "30d",
			algorithm: ["RS256"]
		};
		try {
			return jwt.verify(token, publicKEY, verifyOptions, cb);
		} catch (err) {
			return false;
		}
	},
	decode: (token) => {
		return jwt.decode(token, { complete: true });
		//returns null if token is invalid
	}
}
