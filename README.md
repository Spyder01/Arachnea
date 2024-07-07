# arachnea

arachnea is a JavaScript library that allows you to perform efficient array operations using a fluent API approach inspired by the agility and efficiency of spiders.

## Features

- **Map**: Transform each element of an array using a provided function.
- **Filter**: Filter elements of an array based on a provided condition.
- **Reduce**: Reduce an array to a single value based on a provided accumulator and transformation function.

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

const result = arachnea(numbers)
  .map((num) => num * 2)
  .filter((num) => num % 3 === 0)
  .collect();

console.log(result); // Output: [6]
```

### API Examples

#### Mapping and Reducing

```js
const sumOfSquares = stream(numbers)
  .map((num) => num * num)
  .reduce((acc, num) => acc + num, 0);

console.log(sumOfSquares); // Output: 55
```

#### Filtering and collecting

```js
const oddNumbers = stream(numbers)
  .filter((num) => num % 2 !== 0)
  .collect();

console.log(oddNumbers); // Output: [1, 3, 5]
```

#### Chaining Operations

```js
const result = stream(numbers)
  .filter((num) => num > 2)
  .map((num) => num * 3)
  .reduce((acc, num) => acc + num, 0);

console.log(result); // Output: 39
```

## API

### `map(transformer: ArrayTransformer<T, K>): Stream<K>`

Transforms each element of the array using the provided transformer function.

### `filter(transformer: ArrayTransformer<T, boolean>): Stream<T>`

Filters elements of the array based on the provided boolean transformer function.

### `reduce(transformer: ReduceTransformer<T, K>, initialValue: K): K`

Reduces the array to a single value using the provided reducer function and initial value.

### `collect(): Array<T>`

Collects the elements after applying all transformations and filters, returning them as an array.

## Examples

For more examples and advanced usage, refer to the examples directory.

## Todo

- Combine successive filter operations into a single operation.
- Improve the performance of atomic operations.
- Add sorting functionality
- Enhance performance optimizations.
- Implement error handling for edge cases.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.
