"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropsGaea {
    constructor() {
        this.gaeaName = '图片手势操作';
        this.gaeaIcon = 'square-o';
        this.gaeaUniqueKey = 'nt-image-zoom';
    }
}
exports.PropsGaea = PropsGaea;
class Props extends PropsGaea {
    constructor() {
        super(...arguments);
        this.onClick = () => {
        };
        this.onLongPress = () => {
        };
        this.panToMove = true;
        this.pinchToZoom = true;
        this.cropWidth = 100;
        this.cropHeight = 100;
        this.imageWidth = 100;
        this.imageHeight = 100;
        this.source = '';
        this.longPressTime = 800;
        this.leaveStayTime = 100;
        this.leaveDistance = 10;
        this.maxOverflow = 100;
        this.horizontalOuterRangeOffset = () => {
        };
        this.responderRelease = () => {
        };
        this.onDoubleClick = () => {
        };
    }
}
exports.Props = Props;
class State {
    constructor() {
        this.centerX = 0.5;
        this.centerY = 0.5;
    }
}
exports.State = State;
//# sourceMappingURL=image-zoom.type.js.map