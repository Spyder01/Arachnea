declare enum ActionType {
    MAP = 0,
    FILTER = 1
}
type ArrayTransformer<T, K> = (ele: T) => K;
type Action<T, K> = {
    type: ActionType;
    transformer: ArrayTransformer<T, K>;
};
declare class Stream<T> {
    private list;
    private actionStack;
    constructor(list: Array<T>);
    map<K>(transformer: ArrayTransformer<T, K>): Stream<K>;
    filter(transformer: ArrayTransformer<T, boolean>): this;
    collect(): T[];
}
//# sourceMappingURL=index.d.ts.map