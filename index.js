class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.hashmap = new Array(capacity).fill(null);
  }

  growSize() {
    const oldHashmap = this.hashmap; // Store the current hash map
    this.capacity *= 2; // Double the capacity
    this.hashmap = new Array(this.capacity).fill(null); // Create a new larger hash map

    for (const bucket of oldHashmap) {
      if (Array.isArray(bucket)) {
        for (const { key, value } of bucket) {
          this.set(key, value);
        }
      }
    }
  }

  allowedSize() {
    let size = Math.round(this.capacity * this.loadFactor);
    return size;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return Math.abs(hashCode % this.hashmap.length);
  }

  set(key, value) {
    if (this.length() >= this.allowedSize()) {
      this.growSize();
    }
  
    const hash = this.hash(key);
  
    // Initialize bucket lazily if null
    if (this.hashmap[hash] === null) {
      this.hashmap[hash] = []; // Replace null with a new array
    }
  
    const bucket = this.hashmap[hash];
  
    // Check if the key already exists in the bucket
    for (let obj of bucket) {
      if (obj.key === key) {
        obj.value = value; // Overwrite the value for the existing key
        return;
      }
    }
  
    // If key does not exist, add a new key-value pair
    bucket.push({ key, value });
  }
  

  get(key) {
    const hash = this.hash(key);
    const bucket = this.hashmap[hash];

    // check if bucket aka array is initialized, if not, it can't have the key
    if (!Array.isArray(this.hashmap[hash])) {
      return null;
    }

    for (let obj of bucket) {
      if (obj.key === key) {
        return obj.value;
      }
    }
    return null;
  }

  has(key) {
    const hash = this.hash(key);
    const bucket = this.hashmap[hash];

    // check if bucket aka array is initialized, if not, it can't have the key
    if (!Array.isArray(this.hashmap[hash])) {
      return false;
    }

    // if bucket is initialized, loop through objects in the array and check for key
    for (let obj of bucket) {
      if (obj.key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const hash = this.hash(key);
    const bucket = this.hashmap[hash];

    // check if bucket aka array is initialized, if not, it can't have the key
    if (!Array.isArray(this.hashmap[hash])) {
      return false;
    }

    // Loop through the bucket to find the object with the key
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        // Use splice to remove the element at index i
        bucket.splice(i, 1); // Remove the element at index i
        return true; // Return true once removed
      }
    }

    // If the key was not found, return false
    return false;
  }

  length() {
    let keysCounter = 0;
    for (let i = 0; i < this.hashmap.length; i++) {
      if (Array.isArray(this.hashmap[i])) {
        keysCounter += this.hashmap[i].length;
      }
    }
    return keysCounter;
  }

  clear() {
    this.hashmap.fill(null);
  }

  keys() {
    let result = [];

    for (let i = 0; i < this.hashmap.length; i++) {
      if (Array.isArray(this.hashmap[i])) { // if is bucket
        const bucket = this.hashmap[i];

        for (let obj of bucket) {
          result.push(obj.key)
        }
      }
    }

    return result;
  }

  values() {
    let result = [];

    for (let i = 0; i < this.hashmap.length; i++) {
      if (Array.isArray(this.hashmap[i])) { // if is bucket
        const bucket = this.hashmap[i];

        for (let obj of bucket) {
          result.push(obj.value)
        }
      }
    }

    return result;
  }

  entries() {
    let result = [];

    for (let i = 0; i < this.hashmap.length; i++) {
      if (Array.isArray(this.hashmap[i])) { // if is bucket
        const bucket = this.hashmap[i];

        for (let obj of bucket) {
          const entry = [];
          entry.push(obj.key)
          entry.push(obj.value)
          result.push(entry)
        }
      }
    }

    return result;
  }

  showHashMap() {
    console.table(this.hashmap);
  }
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
test.set('kite', 'red')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')
test.set('kite', 'red')

test.showHashMap();

