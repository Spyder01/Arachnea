# 🕷️ Arachnea

**Arachnea** is a JavaScript library for fluent and efficient array operations — inspired by the agility and precision of spiders 🕸️.  
It provides a chainable, expressive API for transforming, filtering, and processing arrays with clarity and speed.

---

## 🎃 Hacktoberfest 2025

🎉 **Arachnea** is participating in [Hacktoberfest 2025](https://hacktoberfest.com)!  
This is a great project for both **first-time** and **experienced** contributors who love JavaScript and clean, expressive APIs.

We’ve labeled issues with:
- `good first issue` → beginner-friendly
- `help wanted` → community support needed
- `hacktoberfest` → counts toward Hacktoberfest contributions

> 💡 All merged, approved, or `hacktoberfest-accepted` PRs will count for Hacktoberfest!

---

## 🧩 How to Contribute

1. **Star this repo** 🌟  
2. **Fork** and clone it locally  
3. Pick an issue labeled `good first issue` or `help wanted`  
4. Create a feature branch  
5. Implement your change (bug fix, new feature, or doc update)  
6. Open a **Pull Request** — and link it to the related issue if applicable  

Please ensure your code is formatted and tested before submission!

---

## 🪄 Great Starter Ideas

If you’re looking for where to begin:
- 🧪 Add unit tests for `map`, `filter`, or `reduce`
- ⚙️ Add new methods: `sort`, `flatMap`, or `groupBy`
- 🪶 Improve chaining performance
- 📖 Enhance documentation and examples
- 🧠 Add type definitions (TypeScript support)
- 🚦 Improve error handling for invalid input

---

## ✨ Features

- 🧭 **Fluent API** – Chainable, expressive operations  
- ⚡ **Map / Filter / Reduce / Find / Remove** – Core array utilities  
- 🧹 **Efficient Iteration** – Lazy evaluation for composable performance  
- 🧠 **Extendable Design** – Plug in your own terminal operations  

---

## 📦 Installation

```bash
npm install arachnea
# or
yarn add arachnea
````

---

## 🧭 Usage

### Basic Usage

```js
import arachnea from "arachnea";

const numbers = [1, 2, 3, 4, 5];

arachnea(numbers).forEach((num) => {
  console.log(num * 2); // Example of using forEach
});
```

### Mapping and Reducing

```js
const sumOfSquares = arachnea(numbers)
  .map((num) => num * num)
  .reduce((acc, num) => acc + num, 0);

console.log(sumOfSquares); // Output: 55
```

### Filtering and Collecting

```js
const oddNumbers = arachnea(numbers)
  .filter((num) => num % 2 !== 0)
  .collect();

console.log(oddNumbers); // Output: [1, 3, 5]
```

### Removing Elements

```js
const remove4 = arachnea(numbers)
  .map((num) => num * num)
  .remove(4)
  .collect();

console.log(remove4); // Output: [1, 9, 16, 25]
```

### Finding Elements

```js
const greaterThanTwentyFour = arachnea(numbers)
  .map((num) => num * num)
  .find((num) => num > 24);

console.log(greaterThanTwentyFour); // Output: 25
```

### Chaining Operations

```js
const result = arachnea(numbers)
  .filter((num) => num > 2)
  .map((num) => num * 3)
  .reduce((acc, num) => acc + num, 0);

console.log(result); // Output: 39
```

---

## 🧠 API

### `map(transformer: (element: T) => K): Stream<K>`

Transforms each element of the array using the provided transformer function.

### `filter(condition: (element: T) => boolean): Stream<T>`

Filters elements based on the provided condition.

### `reduce(reducer: (acc: K, element: T) => K, initialValue: K): K`

Reduces the array to a single value using the provided reducer and initial value.

### `remove(condition: (element: T) => boolean | T): Stream<T>`

Removes the first element in the array that meets the condition or equals the parameter.

### `find(condition: (element: T) => boolean | T): T`

Finds the first element that matches the condition or equals the given parameter.

### `forEach(action: (element: T) => void): void`

Executes a provided function once per array element.

### `collect(): Array<T>`

Collects and returns the resulting array after all transformations.

---

## 🧾 Todo

* [ ] Combine successive filter operations for efficiency
* [ ] Document `actionsLoop` for custom terminating operation injection
* [ ] Improve atomic operation performance
* [ ] Add sorting and flattening functions
* [ ] Add better error handling for invalid input
* [ ] Introduce TypeScript definitions

---

## 🤝 Contributing

We welcome contributions of all kinds — from docs and examples to performance optimizations and new features.

Please fork the repo, make your changes, and open a pull request.

---

## 📜 License

Licensed under the [MIT License](./LICENSE).

```
