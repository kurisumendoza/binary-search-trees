import Tree from './binary-search-tree.js';

const addRandomNodes = () => {
  for (let i = 0; i < 99; i++) {
    const newNode = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;
    tree.insert(newNode);
  }
};

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(data);

addRandomNodes();

tree.prettyPrint(tree.root);
console.log('FIND 23:', tree.find(23));
console.log('FIND 50:', tree.find(50));
console.log('TREE HEIGHT:', tree.height(tree.root));
console.log('DEPTH OF 1:', tree.depth(tree.find(1)));
console.log('isBALANCED:', tree.isBalanced());

tree.rebalance();
tree.prettyPrint(tree.root);
