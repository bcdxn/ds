'use strict';

var LinkedList = function(options) {
  options   = options || {}
  this.cmp  = options.compare || require('../utils').compare;
  this.head = null;
  this.tail = null
  this.size = 0;
}

/* Public API
------------------------------------------------------------------------------*/

LinkedList.prototype.add = function(elem) {
  if (this.head === null) {
    this.head = { 'elem': elem, 'next': null };
    this.tail = this.head;
  } else {
    this.tail.next = { 'elem': elem, 'next': null };
    this.tail = this.tail.next;
  }
  this.size++;
};

LinkedList.prototype.insertAfter = function(node, elem) {
  if (node.next !== null) {
    node.next = { 'elem': elem, 'next': node.next };
  } else {
    node.next = { 'elem': elem, 'next': node.next };
    this.tail = node.next;
  }
  
  this.size++;
};

LinkedList.prototype.remove = function () {
  var retNode = this.head;

  if (this.size === 1) {
    this.head = null;
    this.tail = this.head;
    this.size--;
  } else if (this.size > 1) {
    this.head = this.head.next;
    this.size--;
  }

  return retNode;
};

LinkedList.prototype.get = function (elem) {
  var node = this.head;

  while (node !== null) {
    if (this.cmp(elem, node.elem) === 0) {
      return node;
    }
    node = node.next;
  }

  return null;
};

LinkedList.prototype.contains = function (elem) {
  return this.get(elem) !== null;
};

LinkedList.prototype.toString = function (delimiter) {
  var node = this.head,
      str = [];

  delimiter = delimiter || ','

  while (node !== null) {
    str.push(node.elem);
    node = node.next;
  }

  return str.join(delimiter);
};

/* Private helper methods
------------------------------------------------------------------------------*/

module.exports = LinkedList;