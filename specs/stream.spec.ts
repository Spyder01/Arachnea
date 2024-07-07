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

  it("should filter out numbers less than 6 and return an array of the remaining elements as strings", () => {
    const result = stream(arr)
      .filter(ele => ele >= 6)
      .map(ele => ele.toString());

    expect(result.collect()).toEqual(arr
      .filter(ele => ele >= 6)
      .map(ele => ele.toString())
    );
  });
});

describe('Benchmarking stream API vs. Array HOFs', () => {
  const arr = Array.from({ length: 1000000 }, (_, index) => index + 1); // Example large array

  it("should benchmark chaining operations in stream API vs Array HOFs - map, filter, reduce", () => {
    const startStream = performanceNow();
    const streamResult = stream(arr)
      .filter(num => num % 2 === 0)
      .map(num => num * 2)
      .reduce((acc, num) => acc + num, 0);
    const endStream = performanceNow();

    const startArray = performanceNow();
    const arrayResult = arr
      .filter(num => num % 2 === 0)
      .map(num => num * 2)
      .reduce((acc, num) => acc + num, 0);
    const endArray = performanceNow();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (map, filter, reduce) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (map, filter, reduce) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
    expect(streamResult).toEqual(arrayResult); // Ensure results are identical
  });

  it("should benchmark chaining operations in stream API vs Array HOFs - map, filter", () => {
    const startStream = performanceNow();
    const streamResult = stream(arr)
      .filter(num => num % 3 === 0)
      .map(num => num * 3);
    const endStream = performanceNow();

    const startArray = performanceNow();
    const arrayResult = arr
      .filter(num => num % 3 === 0)
      .map(num => num * 3);
    const endArray = performanceNow();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (map, filter) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (map, filter) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    // Note: No direct comparison as the results are arrays, not reduced to a single value
    expect(durationStream).toBeLessThan(durationArray);
  });

  it("should benchmark chaining operations in stream API vs Array HOFs - filter, map", () => {
    const startStream = performanceNow();
    const streamResult = stream(arr)
      .filter(num => num > 500000)
      .map(num => num / 2);
    const endStream = performanceNow();

    const startArray = performanceNow();
    const arrayResult = arr
      .filter(num => num > 500000)
      .map(num => num / 2);
    const endArray = performanceNow();

    const durationStream = endStream - startStream;
    const durationArray = endArray - startArray;

    console.log(`Chaining operations (filter, map) in stream API took ${durationStream.toFixed(3)} milliseconds`);
    console.log(`Chaining operations (filter, map) in Array HOFs took ${durationArray.toFixed(3)} milliseconds`);

    expect(durationStream).toBeLessThan(durationArray);
  });

});