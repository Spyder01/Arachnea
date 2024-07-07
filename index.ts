enum ActionType {
  MAP,
  FILTER
}

type ArrayTransformer<T, K> = (ele: T) => K;

type Action<T, K> = {
  type: ActionType,
  transformer: ArrayTransformer<T, K>
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

  public collect() {
    let index = 0;
    let result: Array<T> = [];
    let exclude = false;

    while (index < this.list.length) {
      let ele: any = this.list[index];
      exclude = false;

      for (const action of this.actionStack) {
        switch (action.type) {
          case ActionType.MAP:
            ele = action.transformer(ele);
            break;

          case ActionType.FILTER:
            exclude = !action.transformer(ele)
            break;
        }

        if (exclude) {
          break;
        }
      }

      if (!exclude) {
        result.push(ele as T);
      }

      index++;
    }

    return result;
  }
}
