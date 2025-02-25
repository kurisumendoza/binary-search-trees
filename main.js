import Tree from './binary-search-tree.js';

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(data);

tree.insert(29);
tree.insert(99);
tree.insert(993);
tree.insert(-50);
tree.insert(7);

tree.prettyPrint(tree.root);
