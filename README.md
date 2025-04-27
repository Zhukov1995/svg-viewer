
# SVG Core
## Установка
Для начала вам нужно установить зависимости
```bash
  npm install
```
Далее собрать проект, эта команда соберет проект и будет отслеживать дальнейшие изменения 
```bash
  npm run watch
```
После сборки у вас появится папка build в которой появтся 2 файла сборки, один для CommonJS другой для ES Modules

## Быстрый старт
Для использования класса его нужно импортировать из файла:
```javascript
import SVGCore from "./build/bundle_es.js";
```
Добавьте контейнер в ваш HTML:
```javascript
<div id="svg-container"></div>
```
Для инициализации создайте экземпляр класса и передайте в него параметры:
```javascript
const svg = new SVGCore(container, svg);  
```
После создания экземпляра можно настроить конфигурацию через метод:
```javascript
svg.setOption({
  type: 'status',
  //другие параметры...
});
```

## Настройки конфигурации
### Общие
| Параметр | Тип     | Описание | По умолчанию |
| :-------- | :------- | :------ |--|
| type | string | Тип визуализации (value,range,status) | - |
| colorRange | string | Базовый цвет (HEX-формат)| #8431c5 |
| data | Array | Данные для отображения| - |
| events | Object | Обработчики событий| - |

#### Пример конфигурации
Для типа **range**:
```javascript
{
    type: 'range',
    colorRange: '#2fcb57',
    events: {
      click: (value) => alert(`Клик: ${value}`),
      dblclick: (value) => alert(`Двойной клик: ${value}`)
    },
    data: [
        { name: 'Квартира №1', value: 100 },
        { name: 'Квартира №2', value: 80 }
    ]
}
```
Для типа **status**:
```javascript
{
    type: 'status',
    colorStatus: [
        { status: 'Свободно', color: '#2fcb57' },
        { status: 'Занято', color: '#e05a48' }
    ],
    events: {
      click: (value) => alert(`Клик: ${value}`),
      dblclick: (value) => alert(`Двойной клик: ${value}`)
    },
    data: [
        { name: 'Офис 101', value: 100, status: 'Свободно' },
        { name: 'Офис 102', value: 50, status: 'Занято' }
    ]
}
```

### Тултип
| Параметр | Тип     | Описание | По умолчанию |
| :-------- | :------- | :------ |--|
| show | boolean | Показывать/Скрыть | true |
| position | string | Позиция 'top' или 'bottom| - |
| positionAuto | boolean | Автопозиционирование| false |
| fontSize | number | Размер шрифта | 14 |
| fontFamily | string | Шрифт| - |
| background | string | Фон| Наследуемый |
| borderColor | string | Цвет рамки| Наследуемый |
| borderRadius | number | Радиус скругления| 0 |
| color | string | Цвет текста| Наследуемый |
| padding | number | Внутренний отступ| - |
| className | string | Произвольный класс| - |
| formatter | function | Функция для обработки| - |

#### Пример конфигурации
```javascript
tooltip: {
    show: false,
    position: 'bottom',
    fontSize: 16,
    background: 'white',
    formatter: (text) => Помещение:<br>${text}
}
```

### Лэйбл
| Параметр | Тип     | Описание | По умолчанию |
| :-------- | :------- | :------ |--|
| show | boolean | Показывать/Скрыть | true |
| color | string | Цвет текста| - |
| fontSize | boolean | Размер шрифта| 14 |
| fontFamily | number | Шрифт | - |
| className | string | Произвольный класс| - |
| formatter | function | Функция для обработки| - |

#### Пример конфигурации
```javascript
label: {
    show: true,
    fontSize: 20,
    color: 'black',
    formatter: (text) => ${text} %
}
```