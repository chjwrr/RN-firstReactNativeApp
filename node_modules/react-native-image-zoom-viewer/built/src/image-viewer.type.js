"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactNative = require("react-native");
const image_viewer_style_1 = require("./image-viewer.style");
class PropsGaea {
    constructor() {
        this.gaeaName = '大图浏览';
        this.gaeaIcon = 'square-o';
        this.gaeaUniqueKey = 'nt-image-viewer';
    }
}
exports.PropsGaea = PropsGaea;
class Props extends PropsGaea {
    constructor() {
        super(...arguments);
        this.show = false;
        this.imageUrls = [];
        this.enableImageZoom = true;
        this.visible = false;
        this.flipThreshold = 80;
        this.maxOverflow = 300;
        this.failImageSource = {};
        this.index = 0;
        this.saveToLocalByLongPress = true;
        this.menuContext = {
            saveToLocal: '保存到相册',
            cancel: '取消'
        };
        this.onShowModal = () => {
        };
        this.onCancel = () => {
        };
        this.loadingRender = () => {
            return null;
        };
        this.onSaveToCamera = () => {
        };
        this.onChange = () => {
        };
        this.onClick = (close) => {
            close();
        };
        this.onDoubleClick = (_close) => {
        };
        this.renderHeader = () => {
            return null;
        };
        this.renderFooter = () => {
            return null;
        };
        this.renderIndicator = (currentIndex, allSize) => {
            return React.createElement(ReactNative.View, { style: image_viewer_style_1.simpleStyle.count }, React.createElement(ReactNative.Text, { style: image_viewer_style_1.simpleStyle.countText }, currentIndex + '/' + allSize));
        };
        this.renderArrowLeft = () => {
            return null;
        };
        this.renderArrowRight = () => {
            return null;
        };
    }
}
exports.Props = Props;
class State {
    constructor() {
        this.show = false;
        this.currentShowIndex = 0;
        this.imageSizes = [];
        this.isShowMenu = false;
    }
}
exports.State = State;
//# sourceMappingURL=image-viewer.type.js.map