"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const index_1 = require("../index");
class Demo extends React.Component {
    render() {
        const images = [{
                url: 'http://scimg.jb51.net/allimg/160815/103-160Q509544OC.jpg'
            }, {
                url: 'http://img.sc115.com/uploads1/sc/jpgs/1508/apic22412_sc115.com.jpg'
            }, {
                url: 'http://h.hiphotos.baidu.com/zhidao/pic/item/0df431adcbef7609bca7d58a2adda3cc7cd99e73.jpg'
            }];
        return (React.createElement("div", { style: { width: 400, height: 300, display: 'flex' } },
            React.createElement(index_1.default, { imageUrls: images, index: 2 })));
    }
}
Demo.title = '基本用法';
Demo.description = ``;
exports.default = Demo;
//# sourceMappingURL=basic.js.map