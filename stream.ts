enum ActionType {
  MAP,
  FILTER,
  REDUCE,
  FIND,
  COLLECT,
}

export type ArrayTransformer<T, K> = (ele: T) => K;

export type ReduceTransformer<T, K> = (accumilator: K, currentValue: T) => K;

export type FindCondition<T> = ((ele: T) => boolean) | T;

type StreamInterrupt = {
  interrupted: boolean;
}

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

  public actionLoop<R>(operation: (ele: T) => void, interupt: StreamInterrupt = { interrupted: false }) {
    let index = 0;
    let exclude = false;

    while (index < this.list.length) {
      if (interupt.interrupted) {
        break;
      }

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
        operation(ele);
      }

      index++;
    }
  }

  public reduce<K>(transformer: ReduceTransformer<T, K>, initialValue: K) {
    if (this.actionStack.length === 0) {
      return this.list.reduce(transformer, initialValue)
    }

    let accumulator: K = initialValue;

    this.actionLoop(ele => {
      accumulator = transformer(accumulator, ele);
    });

    return accumulator;
  }

  public find(condition: FindCondition<T>): T | undefined {
    let condition_: (ele: T) => boolean;
    let result: T | undefined;

    let interrupt: StreamInterrupt = {
      interrupted: false,
    }

    if (typeof condition === 'function') {
      condition_ = condition as (ele: T) => boolean;
    }
    else {
      condition_ = (ele: T) => (condition as T) === ele;
    }

    this.actionLoop(ele => {
      if (condition_(ele)) {
        result = ele;
        interrupt.interrupted = true;
      }
    }, interrupt);

    return result;
  }

  public collect(): Array<T> {
    let result: Array<T> = [];

    this.actionLoop(ele => {
      result.push(ele);
    })

    return result;
  }
}

const stream = <T>(arr: Array<T>) => new Stream(arr);

export default stream;
