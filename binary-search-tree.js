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
  }

  #sort(array) {
    return [...new Set(array)].sort((a, b) => a - b);
  }

  #buildTree(array) {
    if (!array || array.length === 0) return null;
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

  insert(value, node = this.root) {
    if (!this.root) this.root = new Node(value);

    if (!node) return new Node(value);
    if (node.data === value) return node;

    if (node.data > value) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;

    if (node === this.root && node.data === value) {
      if (!node.left && !node.right) return (this.root = null);

      if (!node.left || !node.right) {
        return (this.root = node.left || node.right);
      } else {
        let current = node.right;
        while (current.left !== null) {
          current = current.left;
        }
        this.deleteItem(current.data);
        this.root.data = current.data;
        return;
      }
    }

    if (node.data > value) {
      if (node.left && node.left.data === value) {
        if (!node.left.left && !node.left.right) return (node.left = null);
        if (!node.left.left || !node.left.right)
          return (node.left = node.left.left || node.left.right);
        else {
          let current = node.left.right;
          while (current.left !== null) {
            current = current.left;
          }
          this.deleteItem(current.data);
          node.left.data = current.data;
          return;
        }
      }
      return this.deleteItem(value, node.left);
    }

    if (node.data < value) {
      if (node.right && node.right.data === value) {
        if (!node.right.left && !node.right.right) return (node.right = null);
        if (!node.right.left || !node.right.right)
          return (node.right = node.right.left || node.right.right);
        else {
          let current = node.right.right;
          while (current.left !== null) {
            current = current.left;
          }
          this.deleteItem(current.data);
          node.right.data = current.data;
          return;
        }
      }
      return this.deleteItem(value, node.right);
    }
  }

  find(value) {
    let current = this.root;

    while (current) {
      if (current.data === value) break;
      if (current.data > value) {
        current = current.left;
      } else current = current.right;
    }

    return current;
  }

  #checkCallbackAndNode(callback, current) {
    if (!callback) throw Error('Function requires callback');
    return !current ? false : true;
  }

  levelOrder(callback, current = this.root) {
    if (!this.#checkCallbackAndNode(callback, current)) return;
    const queue = [];

    while (current) {
      callback(current);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      current = queue.shift();
    }
  }
  // TODO: Implement a recursive levelOrder after implementing height method

  preOrder(callback, current = this.root) {
    if (!this.#checkCallbackAndNode(callback, current)) return;

    callback(current);
    this.preOrder(callback, current.left);
    this.preOrder(callback, current.right);
  }

  inOrder(callback, current = this.root) {
    if (!this.#checkCallbackAndNode(callback, current)) return;

    this.inOrder(callback, current.left);
    callback(current);
    this.inOrder(callback, current.right);
  }

  postOrder(callback, current = this.root) {
    if (!this.#checkCallbackAndNode(callback, current)) return;

    this.postOrder(callback, current.left);
    this.postOrder(callback, current.right);
    callback(current);
  }

  height(node) {
    if (!node) return -1;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  depth(node, current = this.root) {
    if (!node || !current) return null;

    if (current === node) return 0;

    if (node.data < current.data) return this.depth(node, current.left) + 1;
    if (node.data > current.data) return this.depth(node, current.right) + 1;
  }
}

export default Tree;
