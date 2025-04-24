export class Controls {
    #containerNode;
    #svg;
    constructor(containerNode,svg,instance){
        this.#containerNode = containerNode;
        this.#svg = svg;
        this.instacnce = instance
    }

    useScaleControll() {
        const scaleBox = document.createElement('div');
        scaleBox.style = 'position:absolute;top:0;right:0;display:flex;gap:2px;padding:2px'
        const btnNegative = document.createElement('button');
        btnNegative.textContent = '-';
        btnNegative.style = 'padding:0;width:20px;height:20px;line-height:20px;background:#ebebeb;border:none;border-radius:2px;';
        btnNegative.addEventListener('click', () => {
            console.log('negative');
            // console.log(scale)
            // scale -= 0.55;
            this.instacnce.setScale(this.instacnce.scale - 0.55)
            // console.log(scale)
        });
        const btnPositive = document.createElement('button');
        btnPositive.textContent = '+';
        btnPositive.style = 'padding:0;width:20px;height:20px;line-height:20px;background:#ebebeb;border:none;border-radius:2px;';
        btnPositive.addEventListener('click', () => {
            console.log('positive');
        });
        scaleBox.append(btnNegative, btnPositive);
        this.#containerNode.appendChild(scaleBox);
    }

    useGrabSVG() {
        let isDragging = false;
        let startX, startY, offsetX, offsetY;

        this.#svg.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            offsetX = this.#svg.offsetLeft;
            offsetY = this.#svg.offsetTop;
            document.body.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            let newLeft = offsetX + dx;
            let newTop = offsetY + dy;

            // Ограничения по границам контейнера
            const rightLimit = this.#containerNode.clientWidth - this.#svg.clientWidth;
            const bottomLimit = this.#containerNode.clientHeight - this.#svg.clientHeight;

            if (newLeft > 0) newLeft = 0;
            if (newLeft < rightLimit) newLeft = rightLimit;
            if (newTop > 0) newTop = 0;
            if (newTop < bottomLimit) newTop = bottomLimit;

            this.#svg.style.left = newLeft + 'px';
            this.#svg.style.top = newTop + 'px';
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            document.body.style.cursor = 'default';
        });
    }
}