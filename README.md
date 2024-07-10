# arachnea

arachnea is a JavaScript library that allows you to perform efficient array operations using a fluent API approach inspired by the agility and efficiency of spiders.

## Features

- **Map**: Transform each element of an array using a provided function.
- **Filter**: Filter elements of an array based on a provided condition.
- **Reduce**: Reduce an array to a single value based on a provided accumulator and transformation function.
- **Find**: Find the first element in the array that meets the given condition.
- **Remove**: Remove the first element in the array that meets the given condition.
- **ForEach**: Execute a provided function once for each array element.

## Installation

You can install arachnea via npm or yarn:

```bash
npm install arachnea

# or yarn

yarn add arachnea
```

## Usage

### Basic Usage

```js
import arachnea from "arachnea";

const numbers = [1, 2, 3, 4, 5];

arachnea(numbers).forEach((num) => {
  console.log(num * 2); // Example of using forEach
});
```

### API Examples

#### Mapping and Reducing

```js
const sumOfSquares = arachnea(numbers)
  .map((num) => num * num)
  .reduce((acc, num) => acc + num, 0);

console.log(sumOfSquares); // Output: 55
```

#### Filtering and Collecting

```js
const oddNumbers = arachnea(numbers)
  .filter((num) => num % 2 !== 0)
  .collect();

console.log(oddNumbers); // Output: [1, 3, 5]
```

#### Removing Elements

```js
const remove4 = arachnea(numbers)
  .map((num) => num * num)
  .remove(4)
  .collect();

console.log(remove4); // Output: [1, 9, 16, 25]
```

#### Finding Elements

```js
const greaterThanTwentyFour = arachnea(numbers)
  .map((num) => num * num)
  .find((num) => num > 24);

console.log(greaterThanTwentyFour); // Output: 25
```

#### Chaining Operations

```js
const result = arachnea(numbers)
  .filter((num) => num > 2)
  .map((num) => num * 3)
  .reduce((acc, num) => acc + num, 0);

console.log(result); // Output: 39
```

## API

### `map(transformer: (element: T) => K): Stream<K>`

Transforms each element of the array using the provided transformer function.

### `filter(condition: (element: T) => boolean): Stream<T>`

Filters elements of the array based on the provided boolean condition function.

### `reduce(reducer: (accumulator: K, element: T) => K, initialValue: K): K`

Reduces the array to a single value using the provided reducer function and initial value.

### `remove(condition: (element: T) => boolean | T): Stream<T>`

Removes the first element in the array that meets the given condition or is equal to the given parameter.

### `find(condition: (element: T) => boolean | T): T`

Finds the first element in the array that meets the given condition or is equal to the given parameter.

### `forEach(action: (element: T) => void): void`

Executes a provided function once for each array element.

### `collect(): Array<T>`

Collects the elements after applying all transformations and filters, returning them as an array.

## Todo

- Combine successive filter operations into a single operation.
- Document `actionsLoop` for custom terminating operation injection.
- Improve the performance of atomic operations.
- Add sorting, flattening functionality.
- Enhance performance optimizations.
- Implement error handling for edge cases.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
