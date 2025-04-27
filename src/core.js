import { 
    generateRandomHash, 
    interpolateColor 
} from './utils/utils.js'
import {
    Controls,
    Events,
    TooltipElement,
    LabelText
} from "./modules/index.js";

export default class SVGCore {
    constructor(containerNode, strSVG) {
        this.containerNode = containerNode;
        this.svg = this.createSVG(strSVG);
        this.tooltip = new TooltipElement(containerNode);
        this.labelText = new LabelText(this.svg);
        this.events = new Events();

        // Pan & Zoom variables
        this.scale = 1;
        this.minScale = 0.1;
        this.maxScale = 10;
        this.translateX = 0;
        this.translateY = 0;
        this.isPanning = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.originalViewBox = this.parseOriginalViewBox();

        this.initSize();
        this.setupEventListeners();

        // Initialize controls
        this.controls = new Controls(this.containerNode, this.svg, this);
        this.controls.useScaleControll();
    }

    createSVG(strSVG) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(strSVG.trim(), 'image/svg+xml');
        const svg = svgDoc.documentElement;
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        const randomHash = generateRandomHash(8);
        svg.classList.add(`chart_instance_${randomHash}`);
        
        this.containerNode.style.position = 'relative';
        this.containerNode.style.overflow = 'hidden';
        this.containerNode.style.userSelect = 'none';
        this.containerNode.appendChild(svg);
        return svg;
    }

    parseOriginalViewBox() {
        const viewBox = this.svg.getAttribute('viewBox');
        if (viewBox) {
            return viewBox.split(' ').map(Number);
        }
        
        const width = this.svg.width.baseVal.value;
        const height = this.svg.height.baseVal.value;
        return [0, 0, width, height];
    }

    initSize() {
        const containerWidth = this.containerNode.clientWidth;
        const containerHeight = this.containerNode.clientHeight;
        
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        
        // Calculate initial scale to fit container
        const [,, vbWidth, vbHeight] = this.originalViewBox;
        const scaleX = containerWidth / vbWidth;
        const scaleY = containerHeight / vbHeight;
        this.scale = Math.min(scaleX, scaleY);
        
        this.centerView();
    }

    resetView() {
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateViewBox();
    }

    fitContainer() {
        const containerWidth = this.containerNode.clientWidth;
        const containerHeight = this.containerNode.clientHeight;
        const [,, vbWidth, vbHeight] = this.originalViewBox;
        
        const scaleX = containerWidth / vbWidth;
        const scaleY = containerHeight / vbHeight;
        this.scale = Math.min(scaleX, scaleY);
        
        this.centerView();
    }

    centerView() {
        const containerWidth = this.containerNode.clientWidth;
        const containerHeight = this.containerNode.clientHeight;
        const [,, vbWidth, vbHeight] = this.originalViewBox;
        
        // Calculate translation to center the view
        this.translateX = -(containerWidth / this.scale - vbWidth) / 2;
        this.translateY = -(containerHeight / this.scale - vbHeight) / 2;
        
        this.updateViewBox();
    }

    updateViewBox() {
        const containerWidth = this.containerNode.clientWidth;
        const containerHeight = this.containerNode.clientHeight;
        
        const viewBoxWidth = containerWidth / this.scale;
        const viewBoxHeight = containerHeight / this.scale;
        
        this.svg.setAttribute('viewBox', 
            `${this.translateX} ${this.translateY} ${viewBoxWidth} ${viewBoxHeight}`);
    }

    setupEventListeners() {
        this.handleResize = this.handleResize.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleWheel = this.handleWheel.bind(this);

        window.addEventListener('resize', this.handleResize);
        this.svg.addEventListener('mousedown', this.handleMouseDown);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
        this.svg.addEventListener('mouseleave', this.handleMouseLeave);
        this.svg.addEventListener('wheel', this.handleWheel, { passive: false });
    }

    handleResize() {
        this.updateViewBox();
        this.initSize();
    }

    handleMouseDown(e) {
        if (e.button === 0) {
            this.isPanning = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            this.svg.style.cursor = 'grabbing';
            e.preventDefault();
        }
    }

    handleMouseMove(e) {
        if (this.isPanning) {
            const dx = (e.clientX - this.lastMouseX) / this.scale;
            const dy = (e.clientY - this.lastMouseY) / this.scale;
            
            this.translateX -= dx;
            this.translateY -= dy;
            
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            
            this.updateViewBox();
            e.preventDefault();
        }
    }

    handleMouseUp() {
        this.isPanning = false;
        this.svg.style.cursor = 'grab';
    }

    handleMouseLeave() {
        if (this.isPanning) {
            this.isPanning = false;
            this.svg.style.cursor = 'grab';
        }
    }

    handleWheel(e) {
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale * (1 + delta)));
        
        // Get mouse position relative to SVG
        const rect = this.svg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calculate mouse position in viewBox coordinates
        const viewBoxX = this.translateX + (mouseX / rect.width) * (rect.width / this.scale);
        const viewBoxY = this.translateY + (mouseY / rect.height) * (rect.height / this.scale);
        
        // Update scale
        this.scale = newScale;
        
        // Adjust translation to zoom toward mouse position
        this.translateX = viewBoxX - (mouseX / rect.width) * (rect.width / this.scale);
        this.translateY = viewBoxY - (mouseY / rect.height) * (rect.height / this.scale);
        
        this.updateViewBox();
    }

    setScale(newScale) {
        this.scale = Math.max(this.minScale, Math.min(this.maxScale, newScale));
        this.updateViewBox();
    }

    getClassSVG() {
        return this.svg.getAttribute('class');
    }

    useColorRange(svgNode, data) {
        const elements = svgNode.querySelectorAll('[name]');
        elements.forEach((node) => {
            let val = 0;
            if (data.hasOwnProperty('data')) {
                const obj = data.data.find(el => el.name === node.getAttribute('name'));
                if (obj) {
                    val = obj.value;
                }
            }
            node.style.fill = interpolateColor(data.colorRange || '#8431c5', val);
        });
    }

    useColorStatus(svgNode, data) {
        const elements = svgNode.querySelectorAll('[name]');
        elements.forEach((node) => {
            if (data.hasOwnProperty('data') && data.hasOwnProperty('colorStatus')) {
                const objData = data.data.find(el => el.name === node.getAttribute('name'));
                if (objData) {
                    const objColor = data.colorStatus.find(el => el.status === objData.status);
                    if (objData && objColor) {
                        node.style.fill = objColor.color;
                    }
                }
            }
        });
    }

    setOption(data) {
        if (data.hasOwnProperty('tooltip')) {
            this.tooltip.setEventByName(this.svg, data);
        }
        if (data.hasOwnProperty('label')) {
            this.labelText.addLabelText(data);
        }
        if (data.type === 'range') {
            this.useColorRange(this.svg, data);
        }
        if (data.type === 'status') {
            this.useColorStatus(this.svg, data);
        }
        if (data.hasOwnProperty('events')) {
            this.events.registerEvents(this.svg, data);
        }
    }

    destroy() {
        window.removeEventListener('resize', this.handleResize);
        this.svg.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        this.svg.removeEventListener('mouseleave', this.handleMouseLeave);
        this.svg.removeEventListener('wheel', this.handleWheel);
        
        if (this.controls && this.controls.destroy) {
            this.controls.destroy();
        }
    }
}