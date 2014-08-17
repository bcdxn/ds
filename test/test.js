var assert = require("assert"),
    ds = require('../lib/index');

/* Binary Search Tree Testing
------------------------------------------------------------------------------*/
describe('BinarySearchTree', function() {
  var BinarySearchTree = ds.BinarySearchTree,
      bst;

  beforeEach(function () {
    // New tree for each test
    bst = new BinarySearchTree();
  });

  describe('#BinarySearchTree', function () {
    it('should start out empty', function () {
      assert.ok(bst.root === null);
    });
    it('should start with a size of 0', function () {
      assert.equal(0, bst.size)
    });
  });

  describe('#insert', function(){
    it('should grow by 1 when an element is added', function() {
      bst.insert(5);
      assert.equal(1, bst.size);
      bst.insert(10);
      assert.equal(2, bst.size);
      bst.insert(3);
      assert.equal(3, bst.size);
    });
    it('should not grow when the insert of a duplicate is attempted', function () {
      bst.insert(5);
      bst.insert(5);
      assert.equal(1, bst.size);
    });
    it('should have only one node when only one element is inserted', function () {
      bst.insert(5);
      assert.equal(null, bst.root.left);
      assert.equal(null, bst.root.right);
    });
    it('should insert the value at the root when the tree is empty', function () {
      bst.insert(10);
      assert.equal(10, bst.root.elem);
    });
    it('should insert the element into the left subtree when element < root', function() {
      bst.insert(10);
      bst.insert(5);
      assert.equal(5, bst.root.left.elem);
    });
    it('should insert the element into the right subtree when element > root', function() {
      bst.insert(10);
      bst.insert(15);
      assert.equal(15, bst.root.right.elem);
    });
    it('should insert the element into the left left subtree when root > element < root.left', function() {
      bst.insert(10);
      bst.insert(5);
      bst.insert(3);
      assert.equal(3, bst.root.left.left.elem);
    });
    it('should insert the element into the left right subtree when root > element > root.left ', function() {
      bst.insert(10);
      bst.insert(5);
      bst.insert(8);
      assert.equal(8, bst.root.left.right.elem);
    });
    it('should insert the element into the right left subtree when root < element < root.right', function() {
      bst.insert(10);
      bst.insert(15);
      bst.insert(13);
      assert.equal(13, bst.root.right.left.elem);
    });
    it('should insert the element into the right right subtree when root < element > root.right ', function() {
      bst.insert(10);
      bst.insert(15);
      bst.insert(20);
      assert.equal(20, bst.root.right.right.elem);
    });
  });

  describe('#remove', function () {
    it('should shrink by 1 when an element is removed', function() {
      bst.insert(5);
      bst.remove(5);
      assert.equal(0, bst.size);
    });
    it('should not shrink when the removal of a non-existant element is attempted', function () {
      bst.insert(5);
      bst.remove(10);
      assert.equal(1, bst.size);
    });
    it('should have null root when last element is removed', function () {
      bst.insert(5);
      bst.remove(5)
      assert.equal(null, bst.root);
    });
    it('should remove node with no children', function () {
      bst.insert(10);
      bst.insert(5);
      bst.remove(5);
      assert.equal(null, bst.root.left);
      assert.equal(1, bst.size);
    });
    it('should remove node with 1 child', function() {
      bst.insert(10);
      bst.insert(5);
      bst.insert(3);
      bst.remove(5);
      assert.equal(3, bst.root.left.elem);
      assert.equal(2, bst.size);
    });
    it('should remove node with 2 children', function() {
      bst.insert(10);
      bst.insert(5);
      bst.insert(20);
      bst.insert(15);
      bst.insert(30);
      bst.insert(12);
      bst.insert(18);
      bst.remove(20);
      assert.equal(18, bst.root.right.elem);
      assert.equal(null, bst.root.right.left.right);
      assert.equal(6, bst.size)
    });
  });

  describe('#find', function () {
    it('should not find an element that does not exist in the tree', function () {
      assert.equal(null, bst.find(10));
      bst.insert(10);
      assert.equal(null, bst.find(15));
    });
    it('should find an element at the root', function () {
      bst.insert(10);
      assert.equal(10, bst.find(10).elem);
    });
    it('should find an element in the left subtree', function () {
      bst.insert(10);
      bst.insert(5);
      assert.equal(5, bst.find(5).elem);
    });
    it('should find an element in the right subtree', function () {
      bst.insert(10);
      bst.insert(15);
      assert.equal(15, bst.find(15).elem);
    });
    it('should find an element in the left left subtree', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(3);
      assert.equal(3, bst.find(3).elem);
    });
    it('should find an element the left right subtree', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(7);
      assert.equal(7, bst.find(7).elem);
    });
    it('should find an element in the right left subtree', function () {
      bst.insert(10);
      bst.insert(15);
      bst.insert(12);
      assert.equal(12, bst.find(12).elem);
    });
    it('should find an element the right right subtree', function () {
      bst.insert(10);
      bst.insert(15);
      bst.insert(20);
      assert.equal(20, bst.find(20).elem);
    });
  });

describe('#contains', function () {
    it('should not find an element that does not exist in the tree', function () {
      assert.equal(false, bst.contains(10));
      bst.insert(10);
      assert.equal(false, bst.contains(15));
    });
    it('should find an element at the root', function () {
      bst.insert(10);
      assert.equal(true, bst.contains(10));
    });
    it('should find an element in the left subtree', function () {
      bst.insert(10);
      bst.insert(5);
      assert.equal(true, bst.contains(5));
    });
    it('should find an element in the right subtree', function () {
      bst.insert(10);
      bst.insert(15);
      assert.equal(true, bst.contains(15));
    });
    it('should find an element in the left left subtree', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(3);
      assert.equal(true, bst.contains(3));
    });
    it('should find an element the left right subtree', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(7);
      assert.equal(true, bst.contains(7));
    });
    it('should find an element in the right left subtree', function () {
      bst.insert(10);
      bst.insert(15);
      bst.insert(12);
      assert.equal(true, bst.contains(12));
    });
    it('should find an element the right right subtree', function () {
      bst.insert(10);
      bst.insert(15);
      bst.insert(20);
      assert.equal(true, bst.contains(20));
    });
  });

  describe('#findMin', function () {
    it('should find nothing in an empty tree', function () {
      assert.equal(null, bst.findMin());
    });
    it('should find the root if the tree is of size 1', function () {
      bst.insert(10);
      assert.equal(10, bst.findMin().elem);
    });
    it('should min in multi level tree', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(20);
      assert.equal(5, bst.findMin().elem);
      bst.insert(-10);
      assert.equal(-10, bst.findMin().elem);
      bst.insert(7);
      assert.equal(-10, bst.findMin().elem);
      bst.insert(-5);
      assert.equal(-10, bst.findMin().elem);
    });
  });

  describe('#findMax', function () {
    it('should find nothing in an empty tree', function () {
      assert.equal(null, bst.findMax());
    });
    it('should find the root if the tree is of size 1', function () {
      bst.insert(10);
      assert.equal(10, bst.findMax().elem);
    });
    it('should max in multi level tree', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(20);
      assert.equal(20, bst.findMax().elem);
      bst.insert(17);
      assert.equal(20, bst.findMax().elem);
      bst.insert(30);
      assert.equal(30, bst.findMax().elem);
    });
  });

  describe('#empty', function () {
    it('should make size 0', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(20);
      bst.insert(17);
      bst.insert(30);
      bst.empty();
      assert.equal(0, bst.size);
    });
    it('should make root null', function () {
      bst.insert(10);
      bst.insert(5);
      bst.insert(15);
      bst.insert(20);
      bst.insert(17);
      bst.insert(30);
      bst.empty();
      assert.equal(null, bst.root);
    });
  });
})

/* Heap
------------------------------------------------------------------------------*/
describe('Heap', function() {
  var Heap = ds.Heap,
      heap;

  beforeEach(function () {
    // New heap for each test
    heap = new Heap(Heap.MIN);
  });

  describe('#insert', function () {
    it('should insert value at root when heap is empty', function () {
      heap.insert(10);
      assert.equal(10, heap.contents[0]);
    });
    it('should remain complete when inserting elements', function () {
      heap.insert(10);
      heap.insert(20);
      assert.equal(20, heap.contents[1]);
      heap.insert(30);
      assert.equal(30, heap.contents[2]);
      heap.insert(25);
      assert.equal(25, heap.contents[3]);
    });
    it('should sift the inserted item to the root to satisfy the heap property', function () {
      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(5);
      assert.equal(5, heap.contents[0]);
    });
  });

  describe('#remove', function () {
    it('should return null if the heap is empty', function () {
      var removed = heap.remove();
      assert.equal(null, removed);
    });
    it('should return the top value on the heap', function () {
      var top,
          removed;

      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);
      top = heap.contents[0];
      removed = heap.remove();
      assert.equal(top, removed);
    });
    it('should replace removed top of heap and then heapdown to maintain heap property', function () {
      var removed;

      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);
      removed = heap.remove();
      assert.equal(20, heap.contents[0]);
      assert.equal(33, heap.contents[3]);
    });
    it('should shrink the contents of the heap by 1', function () {
      var removed;

      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);
      removed = heap.remove();
      assert.equal(4, heap.contents.length);
    });
  });

  describe('#peek', function () {
    it('should return the top of the heap', function () {
      var top,
          peeked;

      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);
      top = heap.contents[0];
      peeked = heap.peek();
      assert.equal(top, peeked);
    });
    it('should not affect the heap structure', function () {
      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);
      heap.peek();
      assert.equal(10, heap.contents[0]);
      assert.equal(5, heap.contents.length);
    });
  });

  describe('#clear', function () {
    it('should make the top of the heap undefined', function () {
      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);
      heap.clear();
      assert.equal(undefined, heap.contents[0]);
    });
    it('should make the size of the contents of the array 0', function () {
      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);
      heap.clear();
      assert.equal(0, heap.contents.length);
    });
  });

  describe('#size', function () {
    it('should return 0 for a new, empty heap', function () {
      assert.equal(0, heap.size());
    });
    it('should increment by 1 when an element is added to the heap', function () {
      assert.equal(0, heap.size());
      heap.insert(10);
      assert.equal(1, heap.size());
      heap.insert(20);
      assert.equal(2, heap.size());
      heap.insert(30);
      assert.equal(3, heap.size());
      heap.insert(25);
      assert.equal(4, heap.size());
      heap.insert(33);
      assert.equal(5, heap.size());
    });
    it('should decrement by 1 when an element is removed from the heap', function () {
      heap.insert(10);
      heap.insert(20);
      heap.insert(30);
      heap.insert(25);
      heap.insert(33);

      assert.equal(5, heap.size());
      heap.remove();
      assert.equal(4, heap.size());
      heap.remove();
      assert.equal(3, heap.size());
      heap.remove();
      assert.equal(2, heap.size());
      heap.remove();
      assert.equal(1, heap.size());
      heap.remove();
      assert.equal(0, heap.size());
    });
  });
});

/* Linked List
------------------------------------------------------------------------------*/
describe('LinkedList', function() {
  var LinkedList = ds.LinkedList,
      ll;

  beforeEach(function () {
    // New LinkedList for each test
    ll = new LinkedList();
  });

  describe('#LinkedList', function () {
    it('should have a size of 0', function () {
      assert.equal(0, ll.size);
    });
    it('should have a null head', function() {
      assert.equal(null, ll.head);
    })
    it('should have a null tail', function () {
      assert.equal(null, ll.tail);
    });
  });
  describe('#add', function () {
    it('tail and head should be the same node when adding into empty list', function () {
      ll.add(10);
      assert.equal(ll.head.elem, ll.tail.elem);
      assert.equal(ll.head, ll.tail);
    });
    it('The size should increment when an item is added', function () {
      ll.add(10);
      assert.equal(1, ll.size);
      ll.add(20);
      assert.equal(2, ll.size);
      ll.add(30);
      assert.equal(3, ll.size);
      ll.add(25);
      assert.equal(4, ll.size);
    });
    it('should add newly added items to the end of the list', function () {
      ll.add(10);
      assert.equal(10, ll.tail.elem);
      ll.add(20);
      assert.equal(20, ll.tail.elem);
      ll.add(30);
      assert.equal(30, ll.tail.elem);
      ll.add(25);
      assert.equal(25, ll.tail.elem);
      ll.add(5);
      assert.equal(5, ll.tail.elem);
    });
    it('should maintain the internal pointers needed to navigate from head to tail', function () {
        ll.add(10);
        assert.equal(null, ll.head.next);
        ll.add(15);
        assert.equal(15, ll.head.next.elem);
        assert.equal(15, ll.tail.elem);
        assert.equal(null, ll.tail.next);
        ll.add(2);
        assert.equal(15, ll.head.next.elem);
        assert.equal(2, ll.head.next.next.elem);
        assert.equal(2, ll.tail.elem);
        assert.equal(null, ll.tail.next);
        ll.add(7);
        assert.equal(15, ll.head.next.elem);
        assert.equal(2, ll.head.next.next.elem);
        assert.equal(7, ll.head.next.next.next.elem);
        assert.equal(7, ll.tail.elem);
        assert.equal(null, ll.tail.next);
    });
  });

  describe('#insertAfter', function () {
    it('The size should increment when an item is added', function () {
      var node;

      ll.add(10);
      ll.add(20);
      ll.add(30);
      ll.add(25);
      assert.equal(4, ll.size);
      node = ll.get(20);
      ll.insertAfter(node, 100);
      assert.equal(5, ll.size);
    });
    it('should add newly add items to specified point in list', function () {
      var node;

      ll.add(10);
      ll.add(20);
      ll.add(30);
      ll.add(25);

      node = ll.get(20);
      ll.insertAfter(node, 100);
      assert.equal(100, ll.head.next.next.elem);
    });
    it('should maintain the internal pointers needed to navigate from head to tail', function () {
      var node;

      ll.add(10);
      ll.add(20);
      ll.add(30);
      ll.add(25);

      node = ll.get(20);
      ll.insertAfter(node, 100);
      assert.equal(100, ll.head.next.next.elem);
      assert.equal(25, ll.head.next.next.next.next.elem);
    });
    it('should add as tail if added after tail', function () {
      var node;

      ll.add(10);
      ll.add(20);
      ll.add(30);
      ll.add(25);

      node = ll.get(25);
      ll.insertAfter(node, 100);
      assert.equal(100, ll.head.next.next.next.next.elem);
      assert.equal(100, ll.tail.elem);
    });
  });

  describe('#remove', function () {
    it('should return null if the list is empty', function () {
      assert.equal(null, ll.remove());
    });
    it('should retrieve the head node', function () {
      ll.add(10);
      ll.add(15);
      ll.add(2);
      ll.add(7);
      assert.equal(10, ll.remove().elem);
      assert.equal(15, ll.remove().elem);
      assert.equal(2, ll.remove().elem);
      assert.equal(7, ll.remove().elem);
    });
    it('should decrement the size when an element is removed', function () {
      ll.add(10);
      ll.add(15);
      ll.add(2);
      ll.add(7);
      ll.remove();
      assert.equal(3, ll.size);
      ll.remove();
      assert.equal(2, ll.size);
      ll.remove();
      assert.equal(1, ll.size);
      ll.remove();
      assert.equal(0, ll.size);
    });
    it('should re-assign the head when an element is removed', function () {
      ll.add(10);
      ll.add(15);
      ll.add(2);
      ll.add(7);
      assert.equal(10, ll.head.elem);
      ll.remove();
      assert.equal(15, ll.head.elem);
      ll.remove();
      assert.equal(2, ll.head.elem);
    });
    it('should assign the head to null if the last node in the list is removed', function () {
      ll.add(10);
      ll.add(15);
      ll.add(2);
      ll.add(7);
      ll.remove();
      ll.remove();
      ll.remove();
      ll.remove();
      assert.equal(null, ll.head);
    });
    it('should assign the tail to null if the last node in the list is removed', function () {
      ll.add(10);
      ll.add(15);
      ll.add(2);
      ll.add(7);
      ll.remove();
      ll.remove();
      ll.remove();
      ll.remove();
      assert.equal(null, ll.tail);
    });
  });

  describe('#get', function () {
      it('should return null if the list is empty', function () {
        assert.equal(null, ll.get(10));
      });
      it('should return null if the element is not in the list', function () {
        ll.add(10);
        ll.add(15);
        ll.add(2);
        ll.add(7);
        assert.equal(null, ll.get(20));
      });
      it('should return the node containing the element when found in list', function () {
        ll.add(10);
        ll.add(15);
        ll.add(2);
        ll.add(7);
        assert.equal(2, ll.get(2).elem);
      });
    });

  describe('#contains', function () {
    it('should return false if the list is empty', function () {
        assert.equal(false, ll.contains(10));
      });
      it('should return false if the element is not in the list', function () {
        ll.add(10);
        ll.add(15);
        ll.add(2);
        ll.add(7);
        assert.equal(false, ll.contains(20));
      });
      it('should return true if the element is in the list', function () {
        ll.add(10);
        ll.add(15);
        ll.add(2);
        ll.add(7);
        assert.equal(true, ll.contains(2));
      });
  });    
});

/* Heap
------------------------------------------------------------------------------*/
describe('AvlTree', function() {
  var AvlTree = ds.AvlTree,
      avl;

  beforeEach(function () {
    // New AvlTree for each test
    avl = new AvlTree();
  });

  describe('#insert', function () {
    it('should insert element as root when the tree is empty', function () {
      avl.insert(5);
      assert.equal(5, avl.root.elem);
    });
    it('should insert element as left child when less than root', function () {
      avl.insert(10);
      avl.insert(5);
      assert.equal(5, avl.root.left.elem);
    });
    it('should insert element as right child when greater than root', function() {
      avl.insert(10);
      avl.insert(15);
      assert.equal(15, avl.root.right.elem);
    });
    it('should insert element as left left child when less than root.left', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(3);
      assert.equal(3, avl.root.left.left.elem);
    });
    it('should insert element as left right child when less than root and greater than root.left', function() {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(7);
      assert.equal(7, avl.root.left.right.elem);
    });
    it('should insert element as right left child when greater than root and less than root.right', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(20);
      assert.equal(20, avl.root.right.right.elem);
    });
    it('should insert element as right right child when greater than root and root.right', function() {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(12);
      assert.equal(12, avl.root.right.left.elem);
    });
    it('should maintain height property of nodes', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(3);

      assert.equal(3, avl.root.height);
      assert.equal(2, avl.root.left.height);
      assert.equal(1, avl.root.right.height);
      assert.equal(1, avl.root.left.left.height);
    })
    it('should increment the size of the tree by one when inserting', function() {
      assert.equal(0, avl.size);
      avl.insert(10);
      assert.equal(1, avl.size);
      avl.insert(5);
      assert.equal(2, avl.size);
      avl.insert(15);
      assert.equal(3, avl.size);
      avl.insert(12);
      assert.equal(4, avl.size);
    });
    it('should maintain AVL balance requirement when creating case 1 left-left high', function () {
      avl.insert(5);
      avl.insert(4);
      avl.insert(3);

      assert.equal(4, avl.root.elem);
      assert.equal(3, avl.root.left.elem);
      assert.equal(5, avl.root.right.elem);
    });
    it('should maintain AVL balance requirement when creating case 2 left-right high', function () {
      avl.insert(5);
      avl.insert(3);
      avl.insert(4);

      assert.equal(4, avl.root.elem);
      assert.equal(3, avl.root.left.elem);
      assert.equal(5, avl.root.right.elem);
    });
    it('should maintain AVL balance requirement when creating case 3 right-right high', function () {
      avl.insert(3);
      avl.insert(4);
      avl.insert(5);

      assert.equal(4, avl.root.elem);
      assert.equal(3, avl.root.left.elem);
      assert.equal(5, avl.root.right.elem);
    });
    it('should maintain AVL balance requirement when creating case 4 right-left high', function () {
      avl.insert(3);
      avl.insert(5);
      avl.insert(4);

      assert.equal(4, avl.root.elem);
      assert.equal(3, avl.root.left.elem);
      assert.equal(5, avl.root.right.elem);
    });
  });

  describe('#remove', function () {
    it('should not change the size if the tree is empty', function () {
      avl.remove(5)
      assert.equal(0, avl.size);
    });
    it('should remove the root node if the tree has size 1', function () {
      avl.insert(5);
      avl.remove(5);
      avl.remove(null, avl.root);
    });
    it('should decrement the size by 1 when a node is removed', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(4);
      avl.insert(12);
      assert.equal(5, avl.size);
      avl.remove(4);
      assert.equal(4, avl.size);
      avl.remove(12)
      assert.equal(3, avl.size);
      avl.remove(15);
      assert.equal(2, avl.size);
      avl.remove(5);
      assert.equal(1, avl.size);
      avl.remove(10)
      assert.equal(0, avl.size);
    });
    it('should remove the given leaf node', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(4);
      avl.insert(12);

      avl.remove(4);
      assert.equal(null, avl.root.left.left);
    });
    it('should remove an internal node with only left child', function() {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(4);
      avl.insert(12);

      avl.remove(5);
      assert.equal(4, avl.root.left.elem);
      assert.equal(null, avl.root.left.left);
    });
    it('should remove an internal node with only right child', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(4);
      avl.insert(16);

      avl.remove(15);
      assert.equal(16, avl.root.right.elem);
      assert.equal(null, avl.root.right.right);
    });
    it('should remove an internal node with both left and right children', function() {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(4);
      avl.insert(16);

      avl.remove(15);
      assert.equal(16, avl.root.right.elem);
      assert.equal(null, avl.root.right.right);
    });
    it('should maintain AVL balance requirement when creating case 1 left-left high', function () {
      avl.insert(10);
      avl.insert(15);
      avl.insert(5);
      avl.insert(4);

      avl.remove(15);
      assert.equal(5, avl.root.elem);
      assert.equal(4, avl.root.left.elem);
      assert.equal(10, avl.root.right.elem);
    });
    it('should maintain AVL balance requirement when creating case 2 left-right high', function () {
      avl.insert(10);
      avl.insert(15);
      avl.insert(4);
      avl.insert(5);

      avl.remove(15);
      assert.equal(5, avl.root.elem);
      assert.equal(4, avl.root.left.elem);
      assert.equal(10, avl.root.right.elem);
    });
    it('should maintain AVL balance requirement when creating case 3 right-right high', function () {
      avl.insert(10);
      avl.insert(15);
      avl.insert(5);
      avl.insert(16);

      avl.remove(5);
      assert.equal(15, avl.root.elem);
      assert.equal(10, avl.root.left.elem);
      assert.equal(16, avl.root.right.elem);
    });
    it('should maintain AVL balance requirement when creating case 4 right-left high', function () {
      avl.insert(10);
      avl.insert(16);
      avl.insert(5);
      avl.insert(15);

      avl.remove(5);
      assert.equal(15, avl.root.elem);
      assert.equal(10, avl.root.left.elem);
      assert.equal(16, avl.root.right.elem);
    });
  });

describe('#find', function () {
    it('should not find an element that does not exist in the tree', function () {
      assert.equal(null, avl.find(10));
      avl.insert(10);
      assert.equal(null, avl.find(15));
    });
    it('should find an element at the root', function () {
      avl.insert(10);
      assert.equal(10, avl.find(10).elem);
    });
    it('should find an element in the left subtree', function () {
      avl.insert(10);
      avl.insert(5);
      assert.equal(5, avl.find(5).elem);
    });
    it('should find an element in the right subtree', function () {
      avl.insert(10);
      avl.insert(15);
      assert.equal(15, avl.find(15).elem);
    });
    it('should find an element in the left left subtree', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(3);
      assert.equal(3, avl.find(3).elem);
    });
    it('should find an element the left right subtree', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(7);
      assert.equal(7, avl.find(7).elem);
    });
    it('should find an element in the right left subtree', function () {
      avl.insert(10);
      avl.insert(15);
      avl.insert(12);
      assert.equal(12, avl.find(12).elem);
    });
    it('should find an element the right right subtree', function () {
      avl.insert(10);
      avl.insert(15);
      avl.insert(20);
      assert.equal(20, avl.find(20).elem);
    });
  });

describe('#contains', function () {
    it('should not find an element that does not exist in the tree', function () {
      assert.equal(false, avl.contains(10));
      avl.insert(10);
      assert.equal(false, avl.contains(15));
    });
    it('should find an element at the root', function () {
      avl.insert(10);
      assert.equal(true, avl.contains(10));
    });
    it('should find an element in the left subtree', function () {
      avl.insert(10);
      avl.insert(5);
      assert.equal(true, avl.contains(5));
    });
    it('should find an element in the right subtree', function () {
      avl.insert(10);
      avl.insert(15);
      assert.equal(true, avl.contains(15));
    });
    it('should find an element in the left left subtree', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(3);
      assert.equal(true, avl.contains(3));
    });
    it('should find an element the left right subtree', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(7);
      assert.equal(true, avl.contains(7));
    });
    it('should find an element in the right left subtree', function () {
      avl.insert(10);
      avl.insert(15);
      avl.insert(12);
      assert.equal(true, avl.contains(12));
    });
    it('should find an element the right right subtree', function () {
      avl.insert(10);
      avl.insert(15);
      avl.insert(20);
      assert.equal(true, avl.contains(20));
    });
  });

  describe('#findMin', function () {
    it('should find nothing in an empty tree', function () {
      assert.equal(null, avl.findMin());
    });
    it('should find the root if the tree is of size 1', function () {
      avl.insert(10);
      assert.equal(10, avl.findMin().elem);
    });
    it('should min in multi level tree', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(20);
      assert.equal(5, avl.findMin().elem);
      avl.insert(-10);
      assert.equal(-10, avl.findMin().elem);
      avl.insert(7);
      assert.equal(-10, avl.findMin().elem);
      avl.insert(-5);
      assert.equal(-10, avl.findMin().elem);
    });
  });

  describe('#findMax', function () {
    it('should find nothing in an empty tree', function () {
      assert.equal(null, avl.findMax());
    });
    it('should find the root if the tree is of size 1', function () {
      avl.insert(10);
      assert.equal(10, avl.findMax().elem);
    });
    it('should max in multi level tree', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(20);
      assert.equal(20, avl.findMax().elem);
      avl.insert(17);
      assert.equal(20, avl.findMax().elem);
      avl.insert(30);
      assert.equal(30, avl.findMax().elem);
    });
  });

  describe('#empty', function () {
    it('should make size 0', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(20);
      avl.insert(17);
      avl.insert(30);
      avl.empty();
      assert.equal(0, avl.size);
    });
    it('should make root null', function () {
      avl.insert(10);
      avl.insert(5);
      avl.insert(15);
      avl.insert(20);
      avl.insert(17);
      avl.insert(30);
      avl.empty();
      assert.equal(null, avl.root);
    });
  });
});