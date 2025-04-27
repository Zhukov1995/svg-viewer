export class Controls {
    #containerNode;
    #svg;
    #core;  // Добавляем ссылку на основной класс
    
    constructor(containerNode, svg, core) {  // Добавляем параметр core
        this.#containerNode = containerNode;
        this.#svg = svg;
        this.#core = core;  // Сохраняем ссылку на основной класс
    }

    createBtn(text,callback) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.style.cssText = `
            padding:0;
            width:20px;
            height:20px;
            line-height:18px;
            background:#ebebeb;
            border: 1px solid black;
            border-radius:
            2px;cursor:pointer;
        `;
        btn.addEventListener('click', callback);
        return btn;
    }

    useScaleControll() {
        const scaleBox = document.createElement('div');
        scaleBox.style.cssText = `
            position:absolute;
            top:0;
            right:0;
            display:flex;
            gap:2px;
            padding:2px;
            z-index:1000;
        `;
        const btnNegative = this.createBtn('-', () => {
            const currentScale = this.#core.scale;
            const newScale = Math.max(this.#core.minScale, currentScale - 0.1);
            this.#core.setScale(newScale);
            this.#core.centerView();
        });

        const btnPositive = this.createBtn('+', () => {
            const currentScale = this.#core.scale;
            const newScale = Math.min(this.#core.maxScale, currentScale + 0.1);
            this.#core.setScale(newScale);
            this.#core.centerView();
        });

        const btnReset = this.createBtn('↻', () => {
            this.#core.fitContainer();
        });
        
        scaleBox.append(btnNegative, btnPositive, btnReset);
        this.#containerNode.appendChild(scaleBox);
    }

    destroy() {
        // Метод для очистки при уничтожении
        const controls = this.#containerNode.querySelectorAll('[style*="position:absolute;top:0;right:0"]');
        controls.forEach(control => control.remove());
    }
}