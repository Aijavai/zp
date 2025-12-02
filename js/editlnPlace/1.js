/**
 * @func EditInPlace 原地编辑
 * @param value
 * @param id
 * @param parentElement
 */

const { createElement } = require("react");

function EditInPlace(value, id, parentElement) {
    // 属性
    this.value = value || '这个用户很懒，什么也没留下';
    this.id = id;
    this.parentElement = parentElement;
    
    // 方法
    this.createElement();
    this.attachEvent();
}

EditInPlace.prototype = {
    // 封装DOM 操作
    createElement: function() {
        // 容器
        this.createElement = document.createElement('div');
        
        // 值
        this.staticElement = document.createElement('span');
        this.staticElement.innerHTML = this.value;
        this.containerElement.appendChild(this.staticElement);

        // 输入框
        this.inputElement = document.createElement('input');

        // 开始按钮

        // 消失按钮
    },
    convertToText() {

    },
    attachEvent: function() {
        this.staticElement.addEventListener('click',
            () => {
                this.covertToField();
            }
        );
        this.saveButton.addEventListener('click',
            () => {
                this.save();
            }
        );
        this.cancelButton.addEventListener('click',
            () => {
                this.cancel();
            }
        );
        
    },
    save: function() {

    },
    cancel: function() {

    }

}