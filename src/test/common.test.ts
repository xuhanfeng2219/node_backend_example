/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-22 09:34:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 09:41:20
 */
test('test', () => {
    const object = [""];
    console.log(`object.keys`, Object.keys(object));
    expect(Object.keys(object)).toMatch("0");
})