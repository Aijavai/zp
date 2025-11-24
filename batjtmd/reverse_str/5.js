const arr = [1, 2, 3, 4, 5];


const total = arr.reduce((acc, cur) => {
        console.log(acc, cur);
        return cur + acc;
    } );  // initialValue


console.log(total);