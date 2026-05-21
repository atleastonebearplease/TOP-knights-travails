export class LinkedList {
    headNode = null;
    tailNode = null;
    length = 0;

    #nodeAt(index) {
        if(index < 0 || index > this.size() - 1) return undefined;

        let node = this.headNode;

        for(let i = 0; i < index; i++) {
            node = node.next;
        }

        return node;
    }

    append(value) {
        let node = new Node(value, null);

        if(this.size() === 0) {
            this.headNode = node;
            this.tailNode = node;
            this.length += 1;
            return;
        }

        this.tailNode.next = node;
        this.tailNode = node;

        this.length += 1;
    }

    prepend(value) {
        let node = new Node(value, null);

        if(this.size() === 0) {
            this.headNode = node;
            this.tailNode = node;
            this.length += 1;
            return;
        }

        node.next = this.headNode;
        this.headNode = node;

        this.length += 1;
    }

    size() {
        return this.length;
    }

    head() {
        return this.headNode.value;
    }

    tail() {
        return this.tailNode.value;
    }

    at(index) {
        let node = this.#nodeAt(index);

        if(node === undefined) return undefined;

        return node.value;
    }

    pop() {
        if(this.size() === 0) {
            return undefined;
        } 
        
        const headValue = this.head();
        this.headNode = this.headNode.next; //If its null, that's okay
        this.length -= 1;

        if(this.length === 0) {
            this.tailNode = null;
        }

        return headValue;
    }

    contains(value) {
        if(this.size() === 0) return false;

        let curNode = this.headNode;

        while(curNode != null) {
            if(curNode.value === value) {
                return true;
            } else {
                curNode = curNode.next;
            }
        }

        return false;
    }

    findIndex(value) {
        let index = 0;
        let curNode = this.headNode;

        while(curNode !== null) {
            if(curNode.value === value) {
                return index;
            }

            curNode = curNode.next;
            index++;
        }

        return -1;
    }

    toString() {
        if(this.headNode === null) return "null";
        
        let curNode = this.headNode;
        let listString = "";

        while(curNode !== null) {
            listString += `( ${curNode.value} ) -> `;
            curNode = curNode.next;
        }

        listString += 'null';

        return listString;
    }

    insertAt(index, ...values) {
        if(index < 0 || index >= this.size()) throw new RangeError("This index is out of range");

        let indexNode = this.headNode;
        let nodeBeforeIndex = null;

        //Find the index node
        for(let i = 0; i < index; i++) {
            nodeBeforeIndex = indexNode;
            indexNode = indexNode.next;
        }

        let firstNewNode = new Node(values[0], null);

        //If we are at the beginning, then this first new node is the new head node
        if(index === 0) {
            firstNewNode.next = this.headNode;
            this.headNode = firstNewNode;
        }

        let currentNode = firstNewNode;
        this.length += 1;

        for(let i = 1; i < values.length; i++) {
            let newNode = new Node(values[i], indexNode);
            currentNode.next = newNode;
            currentNode = newNode; //Move our node 'pointer' to the front of the new list

            this.length += 1;
        }

        //If we are inserting at the beginning, nodeBeforeIndex is null
        if(nodeBeforeIndex !== null) nodeBeforeIndex.next = firstNewNode; 
        currentNode.next = indexNode; //Set the next of the end of our new sublist to be the node at the original index point
    }

    removeAt(index) {
        if(index < 0 || index >= this.size()) throw new RangeError("This index is out of range");

        if(index === 0) {
            this.headNode = this.headNode.next;
            this.length -= 1;
            return;
        }

        let indexNode = this.headNode;
        let nodeBeforeIndex = null;

        //Find the index node
        for(let i = 0; i < index; i++) {
            nodeBeforeIndex = indexNode;
            indexNode = indexNode.next;
        }

        nodeBeforeIndex.next = indexNode.next;
        this.length -= 1;
    }
}

export class Node {
    constructor(value, next) {
        this.next = next;
        this.value = value;
    }

    value = null;
    next = null;
}


/* 
============THINKING==================

*/