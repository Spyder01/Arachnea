"use strict";
var ActionType;
(function (ActionType) {
    ActionType[ActionType["MAP"] = 0] = "MAP";
    ActionType[ActionType["FILTER"] = 1] = "FILTER";
})(ActionType || (ActionType = {}));
class Stream {
    constructor(list) {
        this.list = list;
        this.actionStack = [];
    }
    map(transformer) {
        this.actionStack.push({
            type: ActionType.MAP,
            transformer: transformer
        });
        return this;
    }
    filter(transformer) {
        this.actionStack.push({
            type: ActionType.FILTER,
            transformer: transformer,
        });
        return this;
    }
    collect() {
        let index = 0;
        let result = [];
        let exclude = false;
        while (index < this.list.length) {
            let ele = this.list[index];
            exclude = false;
            for (const action of this.actionStack) {
                switch (action.type) {
                    case ActionType.MAP:
                        ele = action.transformer(ele);
                        break;
                    case ActionType.FILTER:
                        exclude = !action.transformer(ele);
                        break;
                }
                if (exclude) {
                    break;
                }
            }
            if (!exclude) {
                result.push(ele);
            }
            index++;
        }
        return result;
    }
}
