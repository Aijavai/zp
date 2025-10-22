document.addEventListener('DOMContentLoaded', function() {
    function playSound(event) {
        console.log(event.keyCode,'////////////');
        let keyCode = event.keyCode;
        let element = document.querySelector('.key[data-key="'+keyCode+'"]');
        console.log(element);
        // 动态DOM编程
        element.classList.add('playing');
    }
    window.addEventListener('keydown', playSound)
})


// 事件对象，在事件发生的时候会给回调函数
// keyCode 按下的键的编码

