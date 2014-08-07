'use strict';

var utils = require('../utils');

var BinarySearchTree = function(compare) {
  this.cmp  = compare || utils.compare;
  this.root = null;
  this.size = 0;
}

/* Public API
------------------------------------------------------------------------------*/
BinarySearchTree.prototype.insert = function(elem) {
  this.root = _insert.call(this, elem, this.root);
};

BinarySearchTree.prototype.find = function(elem) {
  return _find.call(this, elem, this.root);
};

BinarySearchTree.prototype.contains = function(elem) {
  return _find.call(this, elem, this.root) !== null;
};

BinarySearchTree.prototype.remove = function(elem) {
  this.root = _remove.call(this, elem, this.root);
};

BinarySearchTree.prototype.findMin = function() {
  return _findMin.call(this, this.root);
};

BinarySearchTree.prototype.findMax = function() {
  return _findMax.call(this, this.root);
};

BinarySearchTree.prototype.empty = function() {
  this.root = null;
  this.size = 0;
};

/* Private helper methods
------------------------------------------------------------------------------*/
function _insert(elem, node) {
  if (node === null) {
    this.size++;
    return {
      'elem': elem,
      'left': null,
      'right': null
    }
  }

  if (this.cmp(elem, node.elem) < 0) {
    node.left = _insert.call(this, elem, node.left);
  } else if (this.cmp(elem, node.elem) > 0) {
    node.right = _insert.call(this, elem, node.right);
  }

  return node;
}

function _find(elem, node) {
  if (node === null) {
    return node;
  }

  if (this.cmp(elem, node.elem) < 0) {
    return _find.call(this, elem, node.left);
  } else if (this.cmp(elem, node.elem) > 0) {
    return _find.call(this, elem, node.right);
  } else {
    return node;
  }
}

function _remove(elem, node) {
  if (node === null) {
    return node;
  }

  if (this.cmp(elem, node.elem) < 0) {
    node.left = _remove.call(this, elem, node.left);
  } else if (this.cmp(elem, node.elem) > 0) {
    node.right = _remove.call(this, elem, node.right);
  } else {
    if (node.left !== null && node.right !== null) {
      node.elem = _findMax.call(this, node.left).elem;
      node.left = _remove.call(this, node.elem, node.left);
    } else if (node.left !== null) {
      this.size--;
      node = node.left;
    } else if (node.right !== null) {
      this.size--;
      node = node.right;
    } else {
      this.size--;
      node = null;
    }
  }

  return node;
}

function _findMin(node) {
  if (node === null || node.left === null) {
    return node;
  } else {
    return _findMin.call(this, node.left);
  }
}

function _findMax(node) {
  if (node === null || node.right === null) {
    return node;
  } else {
    return _findMax.call(this, node.right);
  }
}

module.exports = BinarySearchTree;