import stream from "../stream";
import performanceNow from "performance-now";

describe('Testing stream', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("should remove even numbers and return square of the remaining array elements as string", () => {
    const result = stream(arr)
      .filter(ele => ele % 2 !== 0)
      .map(ele => ele * ele)
      .map(ele => ele.toString());

    expect(result.collect()).toEqual(arr
      .filter(ele => ele % 2 !== 0)
      .map(ele => ele * ele)
      .map(ele => ele.toString())
    );
  });

  it("should remove even numbers and return sum of the squares of the remaining elements", () => {
    const result = stream(arr)
      .filter(ele => ele % 2 !== 0)
      .map(ele => ele * ele)
      .reduce((acc, ele) => acc + ele, 0);

    expect(result).toEqual(arr
      .filter(ele => ele % 2 !== 0)
      .map(ele => ele * ele)
      .reduce((acc, ele) => acc + ele, 0)
    );
  });

  it("should remove numbers greater than 5 and return double of the remaining array elements", () => {
    const result = stream(arr)
      .filter(ele => ele <= 5)
      .map(ele => ele * 2);

    expect(result.collect()).toEqual(arr
      .filter(ele => ele <= 5)
      .map(ele => ele * 2)
    );
  });

  it("should remove numbers less than 5 and return the product of the remaining elements", () => {
    const result = stream(arr)
      .filter(ele => ele >= 5)
      .reduce((acc, ele) => acc * ele, 1);

    expect(result).toEqual(arr
      .filter(ele => ele >= 5)
      .reduce((acc, ele) => acc * ele, 1)
    );
  });

  it("should convert array elements to strings and concatenate them", () => {
    const result = stream(arr)
      .map(ele => ele.toString())
      .reduce((acc, ele) => acc + ele, "");

    expect(result).toEqual(arr
      .map(ele => ele.toString())
      .reduce((acc, ele) => acc + ele, "")
    );
  });

  it("should filter out odd numbers and return the maximum of the remaining elements", () => {
    const result = stream(arr)
      .filter(ele => ele % 2 === 0)
      .reduce((max, ele) => ele > max ? ele : max, Number.MIN_VALUE);

    expect(result).toEqual(arr
      .filter(ele => ele % 2 === 0)
      .reduce((max, ele) => ele > max ? ele : max, Number.MIN_VALUE)
    );
  });

  it("should return the sum of squares of numbers greater than 3", () => {
    const result = stream(arr)
      .filter(ele => ele > 3)
      .map(ele => ele * ele)
      .reduce((acc, ele) => acc + ele, 0);

    expect(result).toEqual(arr
      .filter(ele => ele > 3)
      .map(ele => ele * ele)
      .reduce((acc, ele) => acc + ele, 0)
    );
  });

  it("should sum up the numbers.", () => {
    let sum = 0;
    stream(arr)
      .forEach(ele => { sum += ele; })
      .collect();

    expect(sum).toEqual(55);
  });

  it("should filter out numbers less than 6 and return an array of the remaining elements as strings", () => {
    const result = stream(arr)
      .filter(ele => ele >= 6)
      .map(ele => ele.toString());

    expect(result.collect()).toEqual(arr
      .filter(ele => ele >= 6)
      .map(ele => ele.toString())
    );
  });

  it("find the element in an array which is greater than 80 after we remove the even numbers and square the remaining elements of the array", () => {
    const result = stream(arr)
      .filter(ele => ele % 2 !== 0)
      .map(ele => ele * ele)
      .find(ele => ele > 80)

    expect(result).toEqual(81)
  });

  // Additional tests for find
  it("should find the first element greater than 5", () => {
    const result = stream(arr)
      .find(ele => ele > 5);

    expect(result).toEqual(6);
  });

  it("should find the first even number", () => {
    const result = stream(arr)
      .find(ele => ele % 2 === 0);

    expect(result).toEqual(2);
  });

  it("should find the first element that matches a direct comparison", () => {
    const result = stream(arr)
      .find(7);

    expect(result).toEqual(7);
  });

  // Remove operation tests
  it("should remove the first occurrence of 2 from the array.", () => {
    const result = stream(arr).remove(2).collect();

    expect(result).toEqual([1, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should remove the first occurrence of 1 from the array using a predicate function.", () => {
    const result = stream(arr).remove(ele => ele === 1).collect();

    expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should remove the first odd number from the array.", () => {
    const result = stream(arr).remove(ele => ele % 2 !== 0).collect();

    expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should remove the first even number from the array.", () => {
    const result = stream(arr).remove(ele => ele % 2 === 0).collect();

    expect(result).toEqual([1, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("should remove the first number greater than 5 from the array.", () => {
    const result = stream(arr).remove(ele => ele > 5).collect();

    expect(result).toEqual([1, 2, 3, 4, 5, 7, 8, 9, 10]);
  });

  it("should remove the first element, then filter out numbers less than 5.", () => {
    const result = stream(arr)
      .remove(ele => true) // Removes the first element
      .filter(ele => ele >= 5)
      .collect();

    expect(result).toEqual([5, 6, 7, 8, 9, 10]);
  });

  it("should remove the first occurrence of a number, then double the remaining elements and sum them up.", () => {
    const result = stream(arr)
      .remove(ele => ele === 4)
      .map(ele => ele * 2)
      .reduce((acc, ele) => acc + ele, 0);

    expect(result).toEqual([1, 2, 3, 5, 6, 7, 8, 9, 10]
      .map(ele => ele * 2)
      .reduce((acc, ele) => acc + ele, 0)
    );
  });

  it("should remove the first element that matches a predicate and then return the remaining elements as strings.", () => {
    const result = stream(arr)
      .remove(ele => ele > 8)
      .map(ele => ele.toString())
      .collect();

    expect(result).toEqual(arr
      .filter(ele => ele !== 9)
      .map(ele => ele.toString())
    );
  });
});

describe('Testing map method specifically', () => {
  const arr = [1, 2, 3, 4, 5];

  it("should transform numbers to their squares", () => {
    const result = stream(arr)
      .map(x => x * x)
      .collect();

    expect(result).toEqual([1, 4, 9, 16, 25]);
  });

  it("should transform numbers to strings", () => {
    const result = stream(arr)
      .map(x => x.toString())
      .collect();

    expect(result).toEqual(['1', '2', '3', '4', '5']);
  });

  it("should transform numbers to objects", () => {
    const result = stream(arr)
      .map(x => ({ value: x, doubled: x * 2 }))
      .collect();

    expect(result).toEqual([
      { value: 1, doubled: 2 },
      { value: 2, doubled: 4 },
      { value: 3, doubled: 6 },
      { value: 4, doubled: 8 },
      { value: 5, doubled: 10 }
    ]);
  });

  it("should handle empty arrays", () => {
    const result = stream([])
      .map(x => x * 2)
      .collect();

    expect(result).toEqual([]);
  });

  it("should handle null and undefined values", () => {
    const arrWithNulls = [1, null, 3, undefined, 5];
    const result = stream(arrWithNulls)
      .map(x => x === null ? 'null' : x === undefined ? 'undefined' : x)
      .collect();

    expect(result).toEqual([1, 'null', 3, 'undefined', 5]);
  });

  it("should chain multiple map operations", () => {
    const result = stream(arr)
      .map(x => x * 2)
      .map(x => x + 1)
      .map(x => x.toString())
      .collect();

    expect(result).toEqual(['3', '5', '7', '9', '11']);
  });

  it("should work with complex transformations", () => {
    const words = ['hello', 'world', 'test'];
    const result = stream(words)
      .map(word => word.toUpperCase())
      .map(word => word.split('').reverse().join(''))
      .collect();

    expect(result).toEqual(['OLLEH', 'DLROW', 'TSET']);
  });

  it("should work with conditional transformations", () => {
    const result = stream(arr)
      .map(x => x > 3 ? x * 10 : x)
      .collect();

    expect(result).toEqual([1, 2, 3, 40, 50]);
  });

  it("should handle arrays with different data types", () => {
    const mixedArray = [1, 'hello', true, { key: 'value' }, [1, 2, 3]];
    const result = stream(mixedArray)
      .map(x => typeof x)
      .collect();

    expect(result).toEqual(['number', 'string', 'boolean', 'object', 'object']);
  });

  it("should work with mathematical operations", () => {
    const result = stream(arr)
      .map(x => Math.pow(x, 3))
      .collect();

    expect(result).toEqual([1, 8, 27, 64, 125]);
  });

  it("should handle edge cases with zero and negative numbers", () => {
    const edgeCases = [-2, -1, 0, 1, 2];
    const result = stream(edgeCases)
      .map(x => x * x)
      .collect();

    expect(result).toEqual([4, 1, 0, 1, 4]);
  });

  it("should work with boolean transformations", () => {
    const result = stream(arr)
      .map(x => x % 2 === 0)
      .collect();

    expect(result).toEqual([false, true, false, true, false]);
  });

  it("should handle function composition in map", () => {
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    
    const result = stream(arr)
      .map(x => multiplyByTwo(addOne(x)))
      .collect();

    expect(result).toEqual([4, 6, 8, 10, 12]);
  });

  it("should work with array methods inside map", () => {
    const arrayOfArrays = [[1, 2], [3, 4], [5, 6]];
    const result = stream(arrayOfArrays)
      .map(subArray => subArray.reduce((sum, num) => sum + num, 0))
      .collect();

    expect(result).toEqual([3, 7, 11]);
  });

  it("should handle large arrays efficiently", () => {
    const largeArray = Array.from({ length: 1000 }, (_, i) => i + 1);
    const result = stream(largeArray)
      .map(x => x * 2)
      .collect();

    const expected = largeArray.map(x => x * 2);
    expect(result).toEqual(expected);
  });

  it("should propagate errors thrown in map function", () => {
    expect(() => {
      stream([1, 2, 3])
        .map(x => {
          if (x === 2) throw new Error('Test error');
          return x * 2;
        })
        .collect();
    }).toThrow('Test error');
  });

  it("should handle errors in chained map operations", () => {
    expect(() => {
      stream([1, 2, 3])
        .map(x => x * 2)
        .map(x => {
          if (x === 4) throw new Error('Chain error');
          return x + 1;
        })
        .collect();
    }).toThrow('Chain error');
  });

  it("should handle map function that returns undefined", () => {
    const result = stream([1, 2, 3])
      .map(x => x === 2 ? undefined : x)
      .collect();

    expect(result).toEqual([1, undefined, 3]);
  });

  it("should handle map function with complex error scenarios", () => {
    expect(() => {
      stream(['a', 'b', 'c'])
        .map(x => {
          if (x === 'b') throw new TypeError('Invalid type');
          return x.toUpperCase();
        })
        .collect();
    }).toThrow('Invalid type');
  });
});

describe('Benchmarking stream API vs. Array HOFs', () => {
  const arr = Array.from({ length: 1000000 }, (_, index) => index + 1); // Example large array

  it("should benchmark chaining operations in stream API vs Array HOFs - map, filter, reduce", () => {
    const startStream = performance.now();
    const streamResult = stream(arr)
      .filter(num => num % 2 === 0)
      .map(num => num * 2)
      .reduce((acc, num) => acc + num, 0);
    const endStream = performance.now();

    const startArray = performance.now();
    const arrayResult = arr
      .filter(num => num % 2 === 0)
      .map(num => num * 2)
      .reduce((acc, num) => acc + num, 0);
    const endArray = performance.now();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (map, filter, reduce) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (map, filter, reduce) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
    expect(streamResult).toEqual(arrayResult); // Ensure results are identical
  });

  it("should benchmark chaining operations in stream API vs Array HOFs - map, filter", () => {
    const startStream = performance.now();
    const streamResult = stream(arr)
      .filter(num => num % 3 === 0)
      .map(num => num * 3);
    const endStream = performance.now();

    const startArray = performance.now();
    const arrayResult = arr
      .filter(num => num % 3 === 0)
      .map(num => num * 3);
    const endArray = performance.now();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (map, filter) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (map, filter) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
  });

  it("should benchmark chaining operations in stream API vs Array HOFs - filter, map", () => {
    const startStream = performance.now();
    const streamResult = stream(arr)
      .filter(num => num > 500000)
      .map(num => num / 2);
    const endStream = performance.now();

    const startArray = performance.now();
    const arrayResult = arr
      .filter(num => num > 500000)
      .map(num => num / 2);
    const endArray = performance.now();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (filter, map) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (filter, map) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
  });

  // Benchmarking tests for find chaining
  it("should benchmark chaining operations in stream API vs Array HOFs - map, find", () => {
    const startStream = performance.now();
    const streamResult = stream(arr)
      .map(num => num * 2)
      .find(num => num > 1000000);
    const endStream = performance.now();

    const startArray = performance.now();
    const arrayResult = arr
      .map(num => num * 2)
      .find(num => num > 1000000);
    const endArray = performance.now();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (map, find) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (map, find) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
    expect(streamResult).toEqual(arrayResult); // Ensure results are identical
  });

  it("should benchmark chaining operations in stream API vs Array HOFs - filter, find", () => {
    const startStream = performance.now();
    const streamResult = stream(arr)
      .filter(num => num % 2 === 0)
      .find(num => num > 500000);
    const endStream = performance.now();

    const startArray = performance.now();
    const arrayResult = arr
      .filter(num => num % 2 === 0)
      .find(num => num > 500000);
    const endArray = performance.now();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (filter, find) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (filter, find) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
    expect(streamResult).toEqual(arrayResult); // Ensure results are identical
  });

  it("should benchmark chaining operations in stream API vs Array HOFs - map, filter, find", () => {
    const startStream = performance.now();
    const streamResult = stream(arr)
      .map(num => num * 2)
      .filter(num => num % 3 === 0)
      .find(num => num > 1000000);
    const endStream = performance.now();

    const startArray = performance.now();
    const arrayResult = arr
      .map(num => num * 2)
      .filter(num => num % 3 === 0)
      .find(num => num > 1000000);
    const endArray = performance.now();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (map, filter, find) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (map, filter, find) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
    expect(streamResult).toEqual(arrayResult); // Ensure results are identical
  });

  // Benchmarking forEach operation
  it("should benchmark forEach operation in stream API vs Array forEach", () => {
    // For stream API
    const startStream = performance.now();
    let sumStream = 0;
    stream(arr).forEach(num => {
      sumStream += num * 2;
    }).collect();
    const endStream = performance.now();

    // For Array forEach
    const startArray = performance.now();
    let sumArray = 0;
    arr.forEach(num => {
      sumArray += num * 2;
    });
    const endArray = performance.now();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`forEach operation in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`forEach operation in Array forEach took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationArray).toBeLessThan(durationStream);
    expect(sumStream).toEqual(sumArray); // Ensure results are identical
  });

});
