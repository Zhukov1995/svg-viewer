import { Controls } from "./controls.js";
import { generateRandomHash, interpolateColor } from "./utils.js";
import TooltipElement from "./elements/tooltip.js";
import LabelText from "./elements/labelText.js";
import Events from "./event.js";

export default class SVGCore {
    constructor(containerNode,strSVG) {
        this.containerNode = containerNode;
        this.svg = this.createSVG(strSVG);
        this.tooltip = new TooltipElement(containerNode,this.svg);
        this.labelText = new LabelText(this.svg);
        this.events = new Events();

        this.resizeSVG();

        // variables
        this.scale = 0.75;

        // events
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);

        // modules
        this.controls = new Controls(this.containerNode,this.svg);
    }

    createSVG(strSVG) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(strSVG.trim(), 'image/svg+xml');
        const svg = svgDoc.documentElement;
        this.containerNode.style.fontFamily = 'Arial';
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        const randomHash = generateRandomHash(8);
        svg.classList.add(`chart_${randomHash}`);
        this.containerNode.style.position ='relative';
        this.containerNode.style.overflow ='hidden';
        this.containerNode.style.userSelect = 'none';
        this.containerNode.appendChild(svg);
        const scaleX = this.containerNode.clientWidth / svg.width.baseVal.value;
        const scaleY = this.containerNode.clientHeight / svg.height.baseVal.value;
        const scale = Math.min(scaleX,scaleY);
        svg.style.transform = `scale(${scale})`
        svg.style.transformOrigin='0 0'
        return svg;
    }

    resizeSVG() {
        // if (this.svg.getAttribute('width') || this.svg.getAttribute('height')) {
        //     this.svg.removeAttribute('width');
        //     this.svg.removeAttribute('height');
        // }
        // const width = this.containerNode.clientWidth;
        // const height = this.containerNode.clientHeight;
        // console.log(this.scale)
        // const scale = width / this.svg.width.baseVal.value;
        // this.svg.setAttribute('width', width / scale);
        // this.svg.setAttribute('height', 'auto');
    }

    setViewBox () {
        // const width = this.containerNode.clientWidth;
        // const height = this.containerNode.clientHeight;
        // this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }

    handleResize() {
        // this.resizeSVG();
        // this.setViewBox();
    }

    getClassSVG() {
        return this.svg.getAttribute('class')
    }

    useColorRange(svgNode,data) {
        const elements = svgNode.querySelectorAll('[name]');
        elements.forEach((node) => {
            let val = 0;
            if (data.hasOwnProperty('data')) {
                const obj = data.data.find(el => el.name === node.getAttribute('name'));
                if (obj) {
                    console.log(obj)
                    val = obj.value;
                }
            }
            node.style.fill = interpolateColor(data.colorRange || '#8431c5', val);
        })
    }

    useColorStatus(svgNode,data) {
        const elements = svgNode.querySelectorAll('[name]');
        elements.forEach((node) => {
            if (data.hasOwnProperty('data') && data.hasOwnProperty('colorStatus')) {
                const objData = data.data.find(el => el.name === node.getAttribute('name'));
                if(objData) {
                    const objColor = data.colorStatus.find(el => el.value === objData.value);
                    if (objData && objColor) {
                        node.style.fill = objColor.color;
                    }
                }
            }
        })
    }

    setOption(data) {
        if(data.hasOwnProperty('tooltip')) {
            this.tooltip.setEventByName(this.svg, data);
        }
        if(data.hasOwnProperty('label')) {
            this.labelText.addLabelText(data);
        }
        if(data.type === 'range') {
            this.useColorRange(this.svg, data);
        }
        if(data.type === 'status') {
            this.useColorStatus(this.svg, data);
        }
        if(data.hasOwnProperty('events')) {
            this.events.registerEvents(this.svg, data);
        }
    }
}