bar(); // TypeError
var bar = function() {
  console.log("World");
};

func(); // ReferenceError
let func = () => {
    console.log("Hello");
};