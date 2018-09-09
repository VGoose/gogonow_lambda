const { getEuclideanDist, findClosestIndex } = require('../src/utils/helpers');
const assert = require('chai').assert;

describe('helper', function(){

  it('getEuclideanDist should return number', function(){
    assert.typeOf(getEuclideanDist(3, 4), 'number');
  });

  it('getEuclideanDist for inputs 3, 4 should return 5', function(){
    assert.equal(getEuclideanDist(3, 4), '5');
  });

  it('getEuclideanDist should be able to throw errors', function() {
    assert.throw(getEuclideanDist, 'Both arguments must be numbers');
  });
  //failing - read chai assert 
  it('findClosestIndex should throw error for [] second argument', function() {
    assert.throw(findClosestIndex, 'Second argument must be a non-empty array.');
  }); 

  it('findClosestIndex should return a number', function() {
    assert.typeOf(findClosestIndex(1, [1, 2, 3, 4, 5]), 'number');
  })

  it('findClosestIndex should return closet index', function() {
    assert.equal(findClosestIndex(7, [1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 10, 10]), 9)
  })

  it('findClosestIndex should return closet index\
  with no exact match', function() {
    assert.equal(findClosestIndex(7, [1, 1, 1, 1, 1, 1, 1, 1, 6, 7.9, 10, 10]), 9)
  })


});