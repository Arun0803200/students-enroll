test('addition', ()=>{
    const b = 2+2;
    expect(b).toBe(4);
});

test('null', ()=>{
    const i = null
    expect(i).toBeNull();
});


// function getData(){
//     throw new Error('Not Found')
// }

// test('getData', () => {
//     expect(() => getData()).toThrow("Not Found");
// })
