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

