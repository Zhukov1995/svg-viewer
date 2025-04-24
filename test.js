import SVGCore from "./build/bundle_es.js";

const rootContainer = document.getElementById('root');
const rootContainer1 = document.getElementById('root1');

fetch('images/svg-test.svg')
    .then(response => response.text())
    .then(data => {
        const svg = new SVGCore(rootContainer, data);
        svg.controls.useScaleControll();
        svg.setOption({
            type: 'range',
            colorRange: '#2fcb57',
            tooltip: {
                position: 'bottom',
                fontSize: 16,
                padding: 5,
                // background: 'white',
                formatter: (str) => {
                    return 'Помещение:' + '</br>' + str
                },
                className: 'tooltip-custom',
                // show: true,
            },
            label: {},
            data: [
                { name: 'Сектор F', value: 100 },
                { name: 'Сектор A', value: 80 },
                { name: 'Сектор E', value: 50 },
                { name: 'Сектор B', value: 20 },
            ]
        })
    })
    .catch(error => console.error('Ошибка загрузки SVG:', error));

// fetch('images/floorHouse2.svg')
//     .then(response => response.text())
//     .then(data => {
//         const svg = new SVGCore(rootContainer, data);
//         svg.controls.useScaleControll();
//         svg.setOption({
//             type: 'range',
//             tooltip: {
//                 position: 'bottom',
//                 fontSize: 16,
//                 padding: 5,
//                 // background: 'white',
//                 formatter: (str) => {
//                     return 'Помещение:' + '</br>' + str
//                 },
//                 className: 'tooltip-custom',
//                 // show: true,
//             },
//             label: {
                
//             },
//             data: [
//                 { name: 'Комната 1', value: 100 },
//                 { name: 'Комната 2', value: 80 },
//                 { name: 'Главный вход', value: 50 },
//                 { name: 'Комната 4', value: 20 },
//                 { name: 'Комната 5', value: 50 },

//             ]
//         })
//     })
//     .catch(error => console.error('Ошибка загрузки SVG:', error));

fetch('./images3/new2_floor_3.svg')
    .then(response => response.text())
    .then(data => {
        const svg = new SVGCore(rootContainer1, data);
        svg.setOption({
            type: 'range',
            colorRange: '#8431c5',
            colorStatus: [
                { value: 'Свободно', color: '#2fcb57' },
                { value: 'Занято', color: '#e05a48' },
                { value: 'Сделка', color: '#8431c5' },
                { value: 'Ожидание', color: '#8431c5' },
                { value: 'В работе', color: '#8431c5' },
            ],
            events: {
                click: (value) => {
                    console.log('HELLO');
                },
                dblclick: (value) => {
                    console.log("GOODBUY");
                }
            },
            tooltip: {
                position: 'top',
                positionAuto: true,
                fontSize: 16,
                background: 'white',
                // borderColor: 'red',
                padding: 10,
                formatter: (str) => {
                    return 'ЖК Комплекс:' + '</br>' + str
                }
            },
            label: {
                show: false,
                color: 'black',
                fontSize: 16,
                formatter: (str) => {
                    return str + ' %'
                }
            },
            data: [
                { name: '28', value: 100 },
                { name: '29', value: 50 },
                { name: '10', value: 80 },
                { name: '11', value: 50 },
                { name: '29', value: 80 },
                { name: '1', value: 90 },
                { name: '2', value: 100 },
                { name: '3', value: 50 },
                { name: '4', value: 80 },
                { name: '5', value: 30 },
                { name: '12', value: 100 },
                { name: '13', value: 50 },
                { name: '14', value: 80 },
                { name: '5', value: 30 },
                { name: 'квартира 1', value: 30 },
                { name: 'квартира 2', value: 100 },
                { name: 'квартира 3', value: 90 },
                // { name: 'Квартира №4', value: 60 },
                { name: 'Квартира №5', value: 50 },
            ]
        })
        
    })
    .catch(error => console.error('Ошибка загрузки SVG:', error));

// fetch('images/Beef.svg')
//     .then(response => response.text())
//     .then(data => {
//         const svg = new SVGCore(rootContainer1, data);
//         svg.setOption({
//             type: 'range',
//             // colorRange: '#ff7c1d',
//             tooltip: {
//                 position: 'top',
//                 fontSize: 16,
//                 // background: 'red',
//                 padding: 10,
//                 formatter: (str) => {
//                     return str
//                 }
//             },
//             label: {
//                 show: false,
//                 fontSize: 10
//             },
//             data: [
//                 { name: 'Rumsteck', value: 100 },
//                 { name: 'Filet', value: 80 },
//                 { name: 'Queue', value: 50 },
//                 { name: 'Tende de tranche', value: 20 },
//                 { name: 'Plat de tranche', value: 60 },
//                 { name: 'Faux-filet', value: 90 },
//                 { name: 'Collier', value: 100 },
//                 { name: 'Plat de joue', value: 15 },
//                 { name: 'Langue', value: 78 },
//                 { name: 'Paleron', value: 88 },
//                 { name: 'Gros bout de poitrine', value: 99 },
//                 { name: 'Onglet', value: 69 },
//                 { name: 'Hampe', value: 110 },

//             ]
//         })

//     })
//     .catch(error => console.error('Ошибка загрузки SVG:', error));



// type: 'value' | 'range' | 'status'
// colorRange: hexColor (default #8431c)
// colorStatus: [{value: text, color: hexColor}]
// tooltip: {
//     show: boolean (default true),
//     position: 'top' | 'bottom',
//     positionAuto: boolean,
//     fontSize: number,
//     background: color,
//     borderColor: color,
//     color: color,
//     padding: number,
//     className: string,
//     formatter: () => string,
// }
// label: {
//     show: boolean (default true),
//     color: color,
//     fontSize: Number,
//     className: string,
//     formatter: () => string,
// }
// data: [{name: string, value: number}]

