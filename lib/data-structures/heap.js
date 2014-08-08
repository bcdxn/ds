'use strict';

var Heap = function (options) {
  options       = options || {};
  this.cmp      = options.compare || require('../utils').compare;
  this.contents = [];
  this.minOrMax = options.minOrMax || Heap.MIN;
};

Heap.MIN = 'MIN';
Heap.MAX = 'MAX';

/* Public API
------------------------------------------------------------------------------*/
Heap.prototype.insert = function (elem) {
  this.contents.push(elem);
  _upheap.call(this, this.contents.length - 1);
};

Heap.prototype.remove = function (elem) {
  var top = this.contents[0];
  
  if (this.contents.length > 1) {
    this.contents[0] = this.contents.pop();
    _downheap.call(this, 0);
  } else {
    this.contents.pop();
  }
  
  return top;
};

Heap.prototype.peek = function () {
  if (this.contents.length > 0) {
    return this.contents[0];
  } else {
    return null;
  }
};

Heap.prototype.clear = function () {
  this.contents = [];
};

Heap.prototype.size = function () {
  return this.contents.length;
};

/* Private helper methods
------------------------------------------------------------------------------*/
function _leftChildIndex(i) {
  return (i * 2) + 1;
}

function _rightChildIndex(i) {
  return (i * 2) + 2;
}

function _parentIndex(i) {
  return Math.floor((i - 1) / 2);
}

function _upheap(i) {
  var parentIndex = _parentIndex(i),
      tmp;
    
  if (i > 0) {
    if (!_satisfiesHeapProperty.call(this, parentIndex, i)) {
      tmp = this.contents[i];
      this.contents[i] = this.contents[parentIndex];
      this.contents[parentIndex] = tmp;
      _upheap.call(this, parentIndex)
    }
  }
}

function _downheap(i) {
  var li = _leftChildIndex(i),
      ri = _rightChildIndex(i),
      tmpIndex = i,
      tmpVal;
  
    if (this.contents[li] !== undefined && !_satisfiesHeapProperty.call(this, i, li)) {
      tmpIndex = li;
    }
    
    if (this.contents[ri] !== undefined && !_satisfiesHeapProperty.call(this, tmpIndex, ri)) {
       tmpIndex = ri;
    }
    
    if (tmpIndex !== i) {
      tmpVal = this.contents[i];
      this.contents[i] = this.contents[tmpIndex];
      this.contents[tmpIndex] = tmpVal;
      
      _downheap.call(this, tmpIndex);
    }
}

function _satisfiesHeapProperty(parentIndex, childIndex) {
  if (this.minOrMax === Heap.Max) {
    if (this.cmp(this.contents[parentIndex], this.contents[childIndex]) >= 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (this.cmp(this.contents[parentIndex], this.contents[childIndex]) <= 0) {
       return true;
    } else {
      return false;
    }
  }
}

module.exports = Heap;