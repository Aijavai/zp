// console.log('手搓react 源码')
function createElement(type, props, ...children) {
    // console.log(type, props, children)
    return  {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === 'object'
                 ? child
                 : createTextElement(child) // 退出条件 文本节点
            )
        }
    }
}

function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function render(element, container) {
    // console.log(element, container);
    const dom = 
        element.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);
    // 过滤 children 属性
    const isProperty = key => key !== "children";
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name];
        });
    element.props.children.forEach(child =>
        render(child, dom)
    );
    container.appendChild(dom);
    
}
window.Didact = {
    createElement,   // 创建虚拟DOM
    render  //  渲染虚拟DOM
}

/** @jsxRuntime classic*/
/** @jsx Didact.createElement */
const element = (
    <div>
        <h1>Hello, World!</h1>
        <h2>from Didact</h2>
    </div>
)

const container = document.getElementById('root');
Didact.render(element, container);
