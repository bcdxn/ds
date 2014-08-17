'use strict';

var AvlTree = function(options) {
  options   = options || {}
  this.cmp  = options.compare || require('../utils').compare;
  this.root = null;
  this.size = 0;
}

/* Public API
------------------------------------------------------------------------------*/
AvlTree.prototype.insert = function(elem) {
  this.root = _insert.call(this, elem, this.root);
};

AvlTree.prototype.find = function(elem) {
  return _find.call(this, elem, this.root);
};

AvlTree.prototype.contains = function(elem) {
  return _find.call(this, elem, this.root) !== null;
};

AvlTree.prototype.remove = function(elem) {
  this.root = _remove.call(this, elem, this.root);
};

AvlTree.prototype.findMin = function() {
  return _findMin.call(this, this.root);
};

AvlTree.prototype.findMax = function() {
  return _findMax.call(this, this.root);
};

AvlTree.prototype.empty = function() {
  this.root = null;
  this.size = 0;
};

/* Private helper methods
------------------------------------------------------------------------------*/

function _insert(elem, node) {
  var balFactor;

  if (node === null) {
    this.size++;
    return {
      'elem': elem,
      'left': null,
      'right': null,
      'height': 1
    }
  }

  if (this.cmp(elem, node.elem) < 0) {
    node.left = _insert.call(this, elem, node.left);
  } else if (this.cmp(elem, node.elem) > 0) {
    node.right = _insert.call(this, elem, node.right);
  }

  balFactor = _balanceFactor(node);

  if (balFactor === 2) {                      // Left High
    if (_balanceFactor(node.left) === -1) {   // Left-Right Case
      node.left = _rotateLeft(node.left)
    }
    node = _rotateRight(node);                // Left-Left Case
  }
  
  if (balFactor === -2) {                     // Right High
    if (_balanceFactor(node.right) === 1) {   // Right-Left Case
      node.right = _rotateRight(node.right);
    }
    node = _rotateLeft(node);                 // Right-Right Case
  }

  node.height = _height(node);
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
  var balFactor;

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

  balFactor = _balanceFactor(node);

  if (balFactor === 2) {                      // Left High
    if (_balanceFactor(node.left) === -1) {   // Left-Right Case
      node.left = _rotateLeft(node.left)
    }
    node = _rotateRight(node);                // Left-Left Case
  }
  
  if (balFactor === -2) {                     // Right High
    if (_balanceFactor(node.right) === 1) {   // Right-Left Case
      node.right = _rotateRight(node.right);
    }
    node = _rotateLeft(node);                 // Right-Right Case
  }

  if (node !== null) {
    node.height = _height(node);
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

function _balanceFactor(node) {
  var bal = 0;

  if (node !== null) {
    if (node.left !== null) {
      bal = _height(node.left);
    }
    if (node.right !== null) {
      bal -= _height(node.right);
    }
  }

  return bal;
}

function _height(node) {
  var height = 0;

  if (node.left === null && node.right === null) {
    height = 1;
  } else if (node.left === null) {
    height = node.right.height + 1;
  } else if (node.right === null) {
    height = node.left.height + 1;
  } else {
    if (node.left.height > node.right.height) {
      height = node.left.height + 1;
    } else {
      height = node.right.height + 1;
    }
  }

  return height;
}

function _rotateRight(node) {
  var tmp = node.left;

  node.left = tmp.right;
  tmp.right = node;
  node.height--;

  return tmp;
}

function _rotateLeft(node) {
  var tmp = node.right;

  node.right = tmp.left;
  tmp.left = node;
  node.height--;

  return tmp;
}

module.exports = AvlTree;
