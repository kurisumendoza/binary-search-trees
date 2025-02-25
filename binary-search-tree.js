class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(values) {
    this.values = values;
    this.root = this.#buildTree(this.#sort(this.values));
    this.prettyPrint(this.root);
  }

  #sort(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  #buildTree(array) {
    if (array.length <= 1) return new Node(array[0]);

    const mid = Math.floor(array.length / 2);

    const data = array[mid];
    const left = array.slice(0, mid);
    const right = array.slice(mid + 1);

    const node = new Node(data, this.#buildTree(left), this.#buildTree(right));
    return node;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) return;
    if (node.right !== null)
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null)
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

export default Tree;
