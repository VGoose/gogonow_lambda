const helper = require('../src/utils/helpers');
const assert = require('chai').assert;

describe('helper', function(){

  it('getEuclideanDist should return number', function(){
    assert.typeOf(helper.getEuclideanDist(3, 4), 'number');
  });

  it('getEuclideanDist for inputs 3, 4 should return 5', function(){
    assert.equal(helper.getEuclideanDist(3, 4), '5');
  });

  it('getEuclideanDist should be able to throw errors', function() {
    assert.throw(helper.getEuclideanDist, 'Both arguments must be numbers')
  });
  
});