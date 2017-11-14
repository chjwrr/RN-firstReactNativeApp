"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const typings = require("./image-zoom.type");
const image_zoom_style_1 = require("./image-zoom.style");
const isMobile = () => {
    if (react_native_1.Platform.OS === 'web') {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    else {
        return true;
    }
};
class ImageViewer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
        this.lastPositionX = null;
        this.positionX = 0;
        this.animatedPositionX = new react_native_1.Animated.Value(0);
        this.lastPositionY = null;
        this.positionY = 0;
        this.animatedPositionY = new react_native_1.Animated.Value(0);
        this.scale = 1;
        this.animatedScale = new react_native_1.Animated.Value(1);
        this.zoomLastDistance = null;
        this.zoomCurrentDistance = 0;
        this.horizontalWholeOuterCounter = 0;
        this.horizontalWholeCounter = 0;
        this.verticalWholeCounter = 0;
        this.centerDiffX = 0;
        this.centerDiffY = 0;
        this.lastClickTime = 0;
        this.doubleClickX = 0;
        this.doubleClickY = 0;
        this.isDoubleClickScale = false;
    }
    componentWillMount() {
        const setResponder = isMobile();
        this.imagePanResponder = react_native_1.PanResponder.create({
            onStartShouldSetPanResponder: (_evt, _gestureState) => setResponder,
            onPanResponderTerminationRequest: (_evt, _gestureState) => false,
            onPanResponderGrant: (evt, _gestureState) => {
                this.lastPositionX = null;
                this.lastPositionY = null;
                this.zoomLastDistance = null;
                this.horizontalWholeCounter = 0;
                this.verticalWholeCounter = 0;
                this.lastTouchStartTime = new Date().getTime();
                this.isDoubleClickScale = false;
                if (evt.nativeEvent.changedTouches.length > 1) {
                    this.centerDiffX = (evt.nativeEvent.changedTouches[0].pageX + evt.nativeEvent.changedTouches[1].pageX) / 2 - this.props.cropWidth / 2;
                    this.centerDiffY = (evt.nativeEvent.changedTouches[0].pageY + evt.nativeEvent.changedTouches[1].pageY) / 2 - this.props.cropHeight / 2;
                }
                if (this.longPressTimeout) {
                    clearTimeout(this.longPressTimeout);
                }
                this.longPressTimeout = setTimeout(() => {
                    this.props.onLongPress();
                }, this.props.longPressTime);
                if (evt.nativeEvent.changedTouches.length <= 1) {
                    if (new Date().getTime() - this.lastClickTime < 175) {
                        this.lastClickTime = 0;
                        this.props.onDoubleClick();
                        clearTimeout(this.longPressTimeout);
                        this.doubleClickX = evt.nativeEvent.changedTouches[0].pageX;
                        this.doubleClickY = evt.nativeEvent.changedTouches[0].pageY;
                        this.isDoubleClickScale = true;
                        if (this.scale > 1 || this.scale < 1) {
                            this.scale = 1;
                            this.positionX = 0;
                            this.positionY = 0;
                        }
                        else {
                            const beforeScale = this.scale;
                            this.scale = 2;
                            const diffScale = this.scale - beforeScale;
                            this.positionX = (this.props.cropWidth / 2 - this.doubleClickX) * diffScale / this.scale;
                            this.positionY = (this.props.cropHeight / 2 - this.doubleClickY) * diffScale / this.scale;
                        }
                        react_native_1.Animated.parallel([
                            react_native_1.Animated.timing(this.animatedScale, {
                                toValue: this.scale,
                                duration: 100,
                            }),
                            react_native_1.Animated.timing(this.animatedPositionX, {
                                toValue: this.positionX,
                                duration: 100,
                            }),
                            react_native_1.Animated.timing(this.animatedPositionY, {
                                toValue: this.positionY,
                                duration: 100,
                            })
                        ]).start();
                    }
                    else {
                        this.lastClickTime = new Date().getTime();
                    }
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                if (evt.nativeEvent.changedTouches.length <= 1) {
                    let diffX = gestureState.dx - this.lastPositionX;
                    if (this.lastPositionX === null) {
                        diffX = 0;
                    }
                    let diffY = gestureState.dy - this.lastPositionY;
                    if (this.lastPositionY === null) {
                        diffY = 0;
                    }
                    this.lastPositionX = gestureState.dx;
                    this.lastPositionY = gestureState.dy;
                    this.horizontalWholeCounter += diffX;
                    this.verticalWholeCounter += diffY;
                    if (Math.abs(this.horizontalWholeCounter) > 5 || Math.abs(this.verticalWholeCounter) > 5) {
                        clearTimeout(this.longPressTimeout);
                    }
                    if (this.props.panToMove) {
                        if (this.props.imageWidth * this.scale > this.props.cropWidth) {
                            if (this.horizontalWholeOuterCounter > 0) {
                                if (diffX < 0) {
                                    if (this.horizontalWholeOuterCounter > Math.abs(diffX)) {
                                        this.horizontalWholeOuterCounter += diffX;
                                        diffX = 0;
                                    }
                                    else {
                                        diffX += this.horizontalWholeOuterCounter;
                                        this.horizontalWholeOuterCounter = 0;
                                        this.props.horizontalOuterRangeOffset(0);
                                    }
                                }
                                else {
                                    this.horizontalWholeOuterCounter += diffX;
                                }
                            }
                            else if (this.horizontalWholeOuterCounter < 0) {
                                if (diffX > 0) {
                                    if (Math.abs(this.horizontalWholeOuterCounter) > diffX) {
                                        this.horizontalWholeOuterCounter += diffX;
                                        diffX = 0;
                                    }
                                    else {
                                        diffX += this.horizontalWholeOuterCounter;
                                        this.horizontalWholeOuterCounter = 0;
                                        this.props.horizontalOuterRangeOffset(0);
                                    }
                                }
                                else {
                                    this.horizontalWholeOuterCounter += diffX;
                                }
                            }
                            else {
                            }
                            this.positionX += diffX / this.scale;
                            const horizontalMax = (this.props.imageWidth * this.scale - this.props.cropWidth) / 2 / this.scale;
                            if (this.positionX < -horizontalMax) {
                                this.positionX = -horizontalMax;
                                this.horizontalWholeOuterCounter += -1 / 1e10;
                            }
                            else if (this.positionX > horizontalMax) {
                                this.positionX = horizontalMax;
                                this.horizontalWholeOuterCounter += 1 / 1e10;
                            }
                            this.animatedPositionX.setValue(this.positionX);
                        }
                        else {
                            this.horizontalWholeOuterCounter += diffX;
                        }
                        if (this.horizontalWholeOuterCounter > this.props.maxOverflow) {
                            this.horizontalWholeOuterCounter = this.props.maxOverflow;
                        }
                        else if (this.horizontalWholeOuterCounter < -this.props.maxOverflow) {
                            this.horizontalWholeOuterCounter = -this.props.maxOverflow;
                        }
                        if (this.horizontalWholeOuterCounter !== 0) {
                            this.props.horizontalOuterRangeOffset(this.horizontalWholeOuterCounter);
                        }
                        if (this.props.imageHeight * this.scale > this.props.cropHeight) {
                            this.positionY += diffY / this.scale;
                            this.animatedPositionY.setValue(this.positionY);
                        }
                    }
                }
                else {
                    if (this.longPressTimeout) {
                        clearTimeout(this.longPressTimeout);
                    }
                    if (this.props.pinchToZoom) {
                        let minX;
                        let maxX;
                        if (evt.nativeEvent.changedTouches[0].locationX > evt.nativeEvent.changedTouches[1].locationX) {
                            minX = evt.nativeEvent.changedTouches[1].pageX;
                            maxX = evt.nativeEvent.changedTouches[0].pageX;
                        }
                        else {
                            minX = evt.nativeEvent.changedTouches[0].pageX;
                            maxX = evt.nativeEvent.changedTouches[1].pageX;
                        }
                        let minY;
                        let maxY;
                        if (evt.nativeEvent.changedTouches[0].locationY > evt.nativeEvent.changedTouches[1].locationY) {
                            minY = evt.nativeEvent.changedTouches[1].pageY;
                            maxY = evt.nativeEvent.changedTouches[0].pageY;
                        }
                        else {
                            minY = evt.nativeEvent.changedTouches[0].pageY;
                            maxY = evt.nativeEvent.changedTouches[1].pageY;
                        }
                        const widthDistance = maxX - minX;
                        const heightDistance = maxY - minY;
                        const diagonalDistance = Math.sqrt(widthDistance * widthDistance + heightDistance * heightDistance);
                        this.zoomCurrentDistance = Number(diagonalDistance.toFixed(1));
                        if (this.zoomLastDistance !== null) {
                            let distanceDiff = (this.zoomCurrentDistance - this.zoomLastDistance) / 200;
                            let zoom = this.scale + distanceDiff;
                            if (zoom < 0.6) {
                                zoom = 0.6;
                            }
                            if (zoom > 10) {
                                zoom = 10;
                            }
                            const beforeScale = this.scale;
                            this.scale = zoom;
                            this.animatedScale.setValue(this.scale);
                            const diffScale = this.scale - beforeScale;
                            this.positionX -= this.centerDiffX * diffScale / this.scale;
                            this.positionY -= this.centerDiffY * diffScale / this.scale;
                            this.animatedPositionX.setValue(this.positionX);
                            this.animatedPositionY.setValue(this.positionY);
                        }
                        this.zoomLastDistance = this.zoomCurrentDistance;
                    }
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (this.isDoubleClickScale) {
                    return;
                }
                if (this.scale < 1) {
                    this.scale = 1;
                    react_native_1.Animated.timing(this.animatedScale, {
                        toValue: this.scale,
                        duration: 100,
                    }).start();
                }
                if (this.props.imageWidth * this.scale <= this.props.cropWidth) {
                    this.positionX = 0;
                    react_native_1.Animated.timing(this.animatedPositionX, {
                        toValue: this.positionX,
                        duration: 100,
                    }).start();
                }
                if (this.props.imageHeight * this.scale <= this.props.cropHeight) {
                    this.positionY = 0;
                    react_native_1.Animated.timing(this.animatedPositionY, {
                        toValue: this.positionY,
                        duration: 100,
                    }).start();
                }
                if (this.props.imageHeight * this.scale > this.props.cropHeight) {
                    const verticalMax = (this.props.imageHeight * this.scale - this.props.cropHeight) / 2 / this.scale;
                    if (this.positionY < -verticalMax) {
                        this.positionY = -verticalMax;
                    }
                    else if (this.positionY > verticalMax) {
                        this.positionY = verticalMax;
                    }
                    react_native_1.Animated.timing(this.animatedPositionY, {
                        toValue: this.positionY,
                        duration: 100,
                    }).start();
                }
                if (this.scale === 1) {
                    this.positionX = 0;
                    this.positionY = 0;
                    react_native_1.Animated.timing(this.animatedPositionX, {
                        toValue: this.positionX,
                        duration: 100,
                    }).start();
                    react_native_1.Animated.timing(this.animatedPositionY, {
                        toValue: this.positionY,
                        duration: 100,
                    }).start();
                }
                this.horizontalWholeOuterCounter = 0;
                if (this.longPressTimeout) {
                    clearTimeout(this.longPressTimeout);
                }
                const stayTime = new Date().getTime() - this.lastTouchStartTime;
                const moveDistance = Math.sqrt(gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy);
                if (evt.nativeEvent.changedTouches.length === 1 && stayTime < this.props.leaveStayTime && moveDistance < this.props.leaveDistance) {
                    this.props.onClick();
                }
                else {
                    this.props.responderRelease(gestureState.vx, this.scale);
                }
            },
            onPanResponderTerminate: (_evt, _gestureState) => {
            }
        });
    }
    handleLayout(_event) {
    }
    reset() {
        this.scale = 1;
        this.animatedScale.setValue(this.scale);
        this.positionX = 0;
        this.animatedPositionX.setValue(this.positionX);
        this.positionY = 0;
        this.animatedPositionY.setValue(this.positionY);
    }
    render() {
        const animateConf = {
            transform: [{
                    scale: this.animatedScale
                }, {
                    translateX: this.animatedPositionX
                }, {
                    translateY: this.animatedPositionY
                }]
        };
        return (React.createElement(react_native_1.View, Object.assign({ style: Object.assign({}, image_zoom_style_1.default.container, { width: this.props.cropWidth, height: this.props.cropHeight }) }, this.imagePanResponder.panHandlers),
            React.createElement(react_native_1.Animated.View, { style: animateConf },
                React.createElement(react_native_1.View, { onLayout: this.handleLayout.bind(this), style: { width: this.props.imageWidth, height: this.props.imageHeight } }, this.props.children))));
    }
}
ImageViewer.defaultProps = new typings.Props();
exports.default = ImageViewer;
//# sourceMappingURL=image-zoom.component.js.map