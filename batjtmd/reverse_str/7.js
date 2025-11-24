// reduce
const str = 'hello';
function reverseStr(str) {
    let reversed = '';
    return [...str].reduce((reversed, char) => char + reversed)
}

console.log(reverseStr(str));