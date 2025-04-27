import SVGCore from "./build/bundle_es.js";

const rootContainer1 = document.getElementById('root');
const rootContainer2 = document.getElementById('root1');

fetch('./images/floor_6.svg')
    .then(response => response.text())
    .then(data => {
        const svg = new SVGCore(rootContainer1, data);
        svg.setOption({
            type: 'range',
            colorRange: '#2fcb57',
            tooltip: {
                position: 'bottom',
                fontSize: 16,
                padding: 5,
                background: 'white',
                formatter: (str) => {
                    return 'Помещение:' + '</br>' + str
                },
                className: 'tooltip-custom', 
            },
            label: {
                show: true,
                fontSize: 20,
                fontFamily: 'Arial',
                color: 'pink'
            },
            data: [
                { name: 'Квартира №1', value: 100 },
                { name: 'Квартира №2', value: 80 },
                { name: 'Сектор E', value: 50 },
                { name: 'Сектор B', value: 20 },
            ]
        })
    })
    .catch(error => console.error('Ошибка загрузки SVG:', error));


fetch('./images/floor_5.svg')
    .then(response => response.text())
    .then(data => {
        const svg = new SVGCore(rootContainer2, data);
        svg.setOption({
            type: 'status',
            colorStatus: [
                { status: 'Свободно', color: '#2fcb57' },
                { status: 'Занято', color: '#e05a48' },
                { status: 'Сделка', color: '#8431c5' },
                { status: 'Ожидание', color: '#ffff07' },
                { status: 'В работе', color: '#b3be62' },
            ],
            events: {
                click: (value) => {
                    alert('CLICK');
                },
                dblclick: (value) => {
                    alert("DBCLICK");
                }
            },
            tooltip: {
                positionAuto: true,
                fontSize: 14,
                fontFamily: 'Arial',
                borderColor: 'black',
                borderRadius: 5,
                color: 'black',
                padding: 10,
                formatter: (str) => {
                    return '<b>ЖК Аврора</b>' + '</br>' + '<b>Этаж 13</b>' + '</br>' + str
                }
            },
            label: {
                show: false,
                color: 'black',
                fontSize: 20,
                fontFamily: 'Arial',
                formatter: (str) => {
                    return str + ' %'
                }
            },
            data: [
                { name: 'Кабинет №1', value: 90, status: 'Свободно'},
                { name: 'Кабинет №2', value: 32, status: 'Занято' },
                { name: 'Кабинет №3', value: 100, status: 'Сделка' },
                { name: 'квартира 4', value: 100, status: 'Ожидание' },
                { name: 'квартира 5', value: 70, status: 'В работе' },
            ]
        })
        
    })
    .catch(error => console.error('Ошибка загрузки SVG:', error));

// type: 'value' | 'range' | 'status'
// colorRange: hexColor (default #8431c)
// colorStatus: [{status: text, color: hexColor}]
// tooltip: {
//     show: boolean (default true),
//     position: 'top' | 'bottom',
//     positionAuto: boolean,
//     fontSize: number,
//     fontFamily: string,
//     background: color,
//     borderColor: color,
//     borderRadius: number,
//     color: color,
//     padding: number,
//     className: string,
//     formatter: () => string,
// }
// label: {
//     show: boolean (default true),
//     color: color,
//     fontSize: number,
//     fontFamily: string
//     className: string,
//     formatter: () => string,
// }

// range or value
// data: [{name: string, value: number}]

// status
// data: [{name: string, value: number, status: text}]
