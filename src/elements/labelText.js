export default class LabelText {
    constructor(svg) {
        this.svg = svg;
    }

    setOptions(data,textNode) {
        let options = {
            show: true,
            fontSize: 14,
            color: 'black'
        };
        if (data.label.hasOwnProperty('fontSize')) {
            if (typeof data.label.fontSize === 'number') {
                options.fontSize = data.label.fontSize;
            }
        }
        if (data.label.hasOwnProperty('color')) {
            if (typeof data.label.color === 'string') {
                options.color = data.label.color;
            }
        }
        if (data.label.hasOwnProperty('className')) {
            textNode.classList.add(data.label.className);
        }
        if (data.label.hasOwnProperty('show')) {
            if (data.label.show === true) {
                textNode.style.visibility = 'visible';
            } else if (data.label.show === false) {
                textNode.style.visibility = 'hidden';
            }
        }
        return options;
    }

    addLabelText(data) {

        function formatter(input, callback) {
            if (typeof callback === 'function') {
                const result = callback(input);
                if (typeof result === 'string') {
                    return result;
                }
            }
            return input
        }

        const originalTextNodes = this.svg.querySelectorAll('text');
        if (originalTextNodes.length) {
            originalTextNodes.forEach(textNode => {
                textNode.remove();
            })
        }
        const elements = this.svg.querySelectorAll('[name]');
        elements.forEach(node => {            
            let val = 0;
            if(data.hasOwnProperty('data')) {
                const obj = data.data.find(el => el.name === node.getAttribute('name'));
                if(obj) {
                    val = obj.value;
                }
            }
            let bbox = node.getBBox();
            let x = bbox.x + bbox.width / 2;
            let y = bbox.y + bbox.height / 2;
            let textElem = document.createElementNS(node.namespaceURI, 'text');
            const options = this.setOptions(data, textElem);
            textElem.setAttribute('x', x);
            textElem.setAttribute('y', y);
            textElem.setAttribute('text-anchor', "middle");
            textElem.setAttribute('dominant-baseline', "middle");
            textElem.setAttribute('font-size', `${options.fontSize}px`);
            textElem.style.fill = options.color;
            
            if (data.label.hasOwnProperty('formatter')) {
                textElem.textContent = formatter(val, data.label.formatter);
            } else {
                textElem.textContent = val;
            }
            node.after(textElem);
        })
    }
}