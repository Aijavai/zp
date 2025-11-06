var a = 1;

function fn(a) {
    console.log(a);

    var a = 2;
    console.log(a);
}

fn(3);