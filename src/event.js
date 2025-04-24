export default class Events {

    registerEvents(svgNode,data) {
        const elements = svgNode.querySelectorAll('[name]');

        function formatter(value, callback) {
            if (typeof callback === 'function') {
                return callback(value);
            }
            return value
        }

        elements.forEach((node, index) => {
            let flag = true;
            if(data.events.hasOwnProperty('click')) {
                node.addEventListener('click', () => {
                    flag = true;
                    setTimeout(function () {
                        if(flag) {
                            const value = node.getAttribute('name');
                            formatter(value, data.events.click);
                        }
                    }, 300);
                });
            }
            if (data.events.hasOwnProperty('dblclick')) {
                node.addEventListener('dblclick', () => {
                    if(data.events.hasOwnProperty('click')) {
                        flag = false;
                    }
                    const value = node.getAttribute('name');
                    formatter(value, data.events.dblclick);
                });
            }
        })
    }
}