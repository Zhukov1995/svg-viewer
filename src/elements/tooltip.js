import { interpolateColor } from "../utils.js";

export default class TooltipElement {
    constructor(containerNode) {
        this.tooltip = this.createTooltip(containerNode);
    }

    createTooltip(containerNode) {
        const tooltip = document.createElement('div');
        tooltip.style = 'display:none;position:absolute;padding:5px;zIndex:1000;'
        containerNode.appendChild(tooltip);
        return tooltip;
    }

    setOptions(data) {
        let options = {
            show: true,
            offset: 25,
            positionAuto: false,
            fontSize: 14,
            background: false,
            color: false,
            border: false,
            padding: 0
        };
        if (data.tooltip.hasOwnProperty('position')) {
            if (data.tooltip.position === 'bottom') {
                options.offset = 25;
            } else if (data.tooltip.position === 'top') {
                options.offset = -this.tooltip.clientHeight;
            }
        }
        if (data.tooltip.hasOwnProperty('positionAuto') && data.tooltip.positionAuto) {
            options.positionAuto = true;
        }
        if (data.tooltip.hasOwnProperty('fontSize')) {
            if (typeof data.tooltip.fontSize === 'number') {
                options.fontSize = data.tooltip.fontSize;
            }
        }
        if (data.tooltip.hasOwnProperty('padding')) {
            if (typeof data.tooltip.padding === 'number') {
                options.padding = data.tooltip.padding;
            }
        }
        if (data.tooltip.hasOwnProperty('background')) {
            options.background = true;
        }
        if (data.tooltip.hasOwnProperty('color')) {
            options.color = true;
        }
        if (data.tooltip.hasOwnProperty('borderColor')) {
            options.border = true;
        }
        if (data.tooltip.hasOwnProperty('position')) {
            if (data.tooltip.position === 'bottom') {
                options.offset = 25;
            } else if (data.tooltip.position === 'top') {
                options.offset = -this.tooltip.clientHeight - 5;
            }
        }
        if (data.tooltip.hasOwnProperty('className')) {
            this.tooltip.classList.add(data.tooltip.className);
        }
        if(data.tooltip.hasOwnProperty('show')) {
            if (data.tooltip.show === true) {
                this.tooltip.style.visibility = 'visible';
            } else if (data.tooltip.show === false) {
                this.tooltip.style.visibility = 'hidden';
            }
        }
        return options;
    }

    setEventByName(svgNode,data) {
        const elements = svgNode.querySelectorAll('[name]');

        function formatter(input, callback) {
            if (typeof callback === 'function') {
                const result = callback(input);
                if (typeof result === 'string') {
                    return result;
                }
            }
            return input
        }

        const setAutoPosition = (e) => {
            const tooltipWidth = this.tooltip.clientWidth;
            const tooltipHeight = this.tooltip.clientHeight;

            // Определяем положение мыши относительно центра
            const isLeft = e.offsetX < svgNode.clientWidth / 2;
            const isTop = e.offsetY < svgNode.clientHeight / 2;

            // Устанавливаем горизонтальное позиционирование
            if (isLeft) {
                this.tooltip.style.left = e.offsetX + 15 + 'px'; // Отступ вправо
            } else {
                this.tooltip.style.left = e.offsetX - tooltipWidth - 10 + 'px'; // Отступ влево
            }

            // Устанавливаем вертикальное позиционирование
            if (isTop) {
                this.tooltip.style.top = e.offsetY + 25 + 'px'; // Отступ вниз
            } else {
                this.tooltip.style.top = e.offsetY - tooltipHeight - 10 + 'px'; // Отступ вверх
            }
        };

        elements.forEach((node, index) => {
            let series = [];
            if(data.hasOwnProperty('data')) {
                series = data.data;
            }
            const obj = series.find(el => el.name === node.getAttribute('name'));
            node.addEventListener('mousemove', (e) => {
                if(obj) {
                    this.tooltip.style.display = "block";
                    node.style.opacity = 0.5;
                    node.style.cursor = 'pointer';
                } else {
                    this.tooltip.style.display = "none";
                }
                const options = this.setOptions(data);
                if(options.positionAuto) {
                    setAutoPosition(e);
                } else {
                    this.tooltip.style.left = e.offsetX + 15 + 'px';
                    this.tooltip.style.top = e.offsetY + options.offset + 'px';
                }
                if (data.tooltip.hasOwnProperty('formatter')) {
                    this.tooltip.innerHTML = formatter(node.getAttribute('name'),data.tooltip.formatter);
                } else {
                    this.tooltip.innerHTML = node.getAttribute('name');
                }
                this.tooltip.style.fontSize = options.fontSize + 'px';
                this.tooltip.style.padding = options.padding + 'px';
                this.tooltip.style.background = options.background ? data.tooltip.background : window.getComputedStyle(node).fill;
                this.tooltip.style.border = options.border ? `1px solid ${data.tooltip.borderColor}` : `1px solid ${window.getComputedStyle(node).fill}`;
                this.tooltip.style.color = options.color ? data.tooltip.color : window.getComputedStyle(node).fill;

            });
            node.addEventListener('mouseleave', () => {
                node.style.opacity = 1;
                this.tooltip.style.display = "none";
            });
        })
    }
}