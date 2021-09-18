test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

//toBe uses Object.is to test exact equality. If you want to check the value of an object, use toEqual instead:
//toEqual recursively checks every field of an object or array.
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one:1, two:2});
});

//You can also test for the opposite of a matcher:

test('adding positive numbers is not zero', () => {
    for(let i = 1; i < 10; i++) {
        for(let b = 1; b < 10; b++) {
            expect(i + b).not.toBe(0);
        }
    }
});

//Truthiness

//In tests, you sometimes need to distinguish between undefined, null, and false, but you sometimes do not want to treat these differently. 
//Jest contains helpers that let you be explicit about what you want.

//toBeNull matches only null
//toBeUndefined matches only undefined
//toBeDefined is the opposite of toBeUndefined
//toBeTruthy matches anything that an if statement treats as true
//toBeFalsy matches anything that an if statement treats as false

//Numbers
//Most ways of comparing numbers have matcher equivalents.

test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
});


//Strings
//You can check strings against regular expressions with toMatch
test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});

//Arrays and iterables
//You can check if an array or iterable contains a particular item using toContain

const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
];

test('the shopping lish has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
});

//Exceptions
//If you want to test whether a particular function throws an error when it's called, use toThrow.

function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);

    // You can also use the exact error message or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
});

//非同期コードのテスト
// https://qiita.com/tapioca24/items/917ce59af30b45791876

//コールバック
//非同期にデータを取得して、返ってくるデータが'peanut butter'という文字列であることを確認するテスト
//引数にdoneを指定するとテスト終了前にdoneコールバックが呼ばれるまで待つ。
// test('the data is peanut butter', done => {
//     function callback(data) {
//         try {
//             expect(data).toBe('peanut butter');
//             done();
//         } catch(error) {
//             done(error);
//         }
//     }
//     fetchData(callback)
// })

//Promises

// test('the data is peanut butter', () => {
//     return fetchData(data).then(data => {
//         expect(data).toBe('peanut butter');
//     });
// });

//promiseがrejectされることを期待するケースでは、.catchメソッドを使用する

// test('the fetch fails with an error', () => {
//     expect.assertions(1);
//     return fetchData().catch(e => expect(e.toMatch('error')));
// });

// expect宣言で .resolves マッチャを使うこともでき、Jestはそのpromiseが解決されるまで待機します。 promiseがrejectされた場合は、テストは自動的に失敗します。
// もしこの return 文を省略した場合、あなたのテストは、fetchDataがresolveされpromiseが返ってくる前に実行され、then() 内のコールバックが実行される前に完了してしまいます。

// test('the data is peanut butter', () => {
//     return expect(fetchData()).resolves.toBe('peanut butter');
// });

// promiseがrejectされることを期待するケースでは.rejects マッチャを使用してください。 .resolvesマッチャと似た動作をします。 promiseが成功した場合は、テストは自動的に失敗します。
// test('the fetch fails with an error', () => {
//     return expect(fetchData()).rejexts.toMatch('error');
// });

// Async/Await

//また、async と awaitをテストで使用できます。 非同期テストを書くには、 testに渡す関数の前にasync キーワードを記述するだけです。
//例えば、同じfetchData シナリオは次のようにテストできます:

// test('the data is peanut butter', async () => {
//     const data = await fetchData();
//     expect(data).toBe('peanut butter');
// });

// test('the fetch fails with an error', async () => {
//     expect.assertions(1);
//     try {
//         await fetchData();
//     } catch (e) {
//         expect(e).toMatch('error');
//     }
// });

// async と await を .resolves または .reject と組み合わせることができます。
// test('the data is peanut butter', async() => {
//     await expect(fetchData()).resolves.toBe('peanut butter');
// });

// test('the fetch fails with an error', async() => {
//     await expect(fetchData()).rejects.toMatch('error');
// });

//テストごとにセットアップ作業を繰り返し実行する
// 多くのテストで繰り返し行う必要がある場合は、beforeEach と afterEach を使用します。

//ワンタイムセットアップ
// セットアップがファイルの先頭で一回だけ実行されることが必要なケースがあります。
//このセットアップが非同期で行われる場合は特に面倒になるので、インラインでは実施できません。
// Jest はこの状況に対応するために beforeAll と afterAll を提供しています。

//スコープ
//デフォルトでは before と after ブロックはファイルの中の各テストに適用されます。
//一方であなたは describe ブロックを使って複数のテストをグループ化することができます。
// それらのブロックが describe ブロックの中にあるときは、 before と after ブロックは describe ブロックの中のテストにだけに適用されます。

// describe('', () => {});

//一般的なアドバイス
//もしテストが失敗して、まず最初に調べるべきことの一つはそのテストが単体で実行された場合にも失敗するかどうかということです。
// Jest で一度だけテストを実行するには、 test コマンドを test.only に一時的に変更します。

test.only('this will be the only test that runs', () => {
    expect(true).toBe(false);
});
