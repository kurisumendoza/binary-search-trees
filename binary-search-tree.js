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
    this.root = this.#buildTree(this.values);
  }

  #sort(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  #buildTree(array) {
    // Temporary logic to log #sort method result
    console.log(this.#sort(array));
  }
}

export default Tree;
