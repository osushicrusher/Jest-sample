//モック関数

//モック関数によりコード間の繋がりをテストすることができます。

//関数をモックする方法2つ
//1.テストコードの中でモック関数を作成する方法
//2.manual mockを作成してモジュールの依存性を上書きする方法

//.mockプロパティ
// 全てのモック関数には.mockプロパティがある。モック関数呼び出し時のデータと関数の返り値が記録されている。
// 各呼び出し時のthisの値も記録されているため、thisの値もチェック可能です。

// function はちょうど 1 回だけ呼ばれた
expect(someMockFunction.mock.calls.length).toBe(1);

// 関数の 1 回目の呼び出しの 1 番目の引数は 'first arg' だった
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// 関数の 1 回目の呼び出しの 2 番目の引数は 'second arg' だった
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// 関数の 1 回目の呼び出しの返り値は 'return value' だった
expect(someMockFunction.mock.results[0].value).toBe('return value');

// この関数はちょうど 2 回インスタンス化された
expect(someMockFunction.mock.instances.length).toBe(2);

// この関数の 1 回目のインスタンス化で返されたインスタンスは、
// `name` プロパティを持っており、その値は 'test' であった

expect(someMockFunction.mock.instances[0].name).toEqual('test');