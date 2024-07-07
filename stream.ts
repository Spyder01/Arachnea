enum ActionType {
  MAP,
  FILTER,
  REDUCE,
}

export type ArrayTransformer<T, K> = (ele: T) => K;

export type ReduceTransformer<T, K> = (accumilator: K, currentValue: T) => K;

type Action<T, K> = {
  type: ActionType,
  transformer: ArrayTransformer<T, K>,
}

class Stream<T> {
  private list: Array<T>;
  private actionStack: Array<Action<T, unknown | boolean>>;

  constructor(list: Array<T>) {
    this.list = list;
    this.actionStack = [];
  }

  public map<K>(transformer: ArrayTransformer<T, K>) {
    this.actionStack.push({
      type: ActionType.MAP,
      transformer: transformer
    });

    return this as unknown as Stream<K>;
  }

  public filter(transformer: ArrayTransformer<T, boolean>) {
    this.actionStack.push({
      type: ActionType.FILTER,
      transformer: transformer,
    });

    return this;
  }

  private collectOrReduce<R>(transformer: ReduceTransformer<T, R> | null = null, currentValue: R | null = null): Array<R> | R {
    let accumilator = currentValue;

    let index = 0;
    let result: Array<R> = [];
    let exclude = false;

    while (index < this.list.length) {
      let ele: any = this.list[index];
      exclude = false;

      for (const action of this.actionStack) {
        switch (action.type) {
          case ActionType.MAP:
            ele = (action.transformer as ArrayTransformer<T, unknown>)(ele);
            break;

          case ActionType.FILTER:
            exclude = !(action.transformer as ArrayTransformer<T, boolean>)(ele)
            break;
        }

        if (exclude) {
          break;
        }
      }

      if (!exclude) {

        if (!transformer) {
          result.push(ele as R);
        }

        if (transformer) {
          accumilator = transformer(accumilator!, ele)
        }
      }

      index++;
    }

    return transformer ? accumilator! : result;
  }

  public reduce<K>(transformer: ReduceTransformer<T, K>, initialValue: K) {

    if (this.actionStack.length === 0) {
      return this.list.reduce(transformer, initialValue)
    }

    return this.collectOrReduce(transformer, initialValue) as K;
  }

  public collect(): Array<T> {
    return this.collectOrReduce<T>() as Array<T>
  }
}

const stream = <T>(arr: Array<T>) => new Stream(arr);

export default stream;
