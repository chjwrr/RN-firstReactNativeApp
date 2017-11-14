//
//  RCTBEEPickerManager.m
//  RCTBEEPickerManager
//
//  Created by MFHJ-DZ-001-417 on 16/9/6.
//  Copyright © 2016年 MFHJ-DZ-001-417. All rights reserved.
//

#import "RCTBEEPickerManager.h"
#import "BzwPicker.h"
#import "RCTEventDispatcher.h"

@interface RCTBEEPickerManager()

@property(nonatomic,strong)BzwPicker *pick;
@property(nonatomic,assign)float height;
@property(nonatomic,weak)UIWindow * window;
@property(nonatomic,strong)UIButton *bgimageView;
@end

@implementation RCTBEEPickerManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(_init:(NSDictionary *)indic){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication].keyWindow endEditing:YES];
    });
    
    self.window = [UIApplication sharedApplication].keyWindow;
    
    NSString *pickerConfirmBtnText=indic[@"pickerConfirmBtnText"];
    NSString *pickerCancelBtnText=indic[@"pickerCancelBtnText"];
    NSString *pickerTitleText=indic[@"pickerTitleText"];
    NSArray *pickerConfirmBtnColor=indic[@"pickerConfirmBtnColor"];
    NSArray *pickerCancelBtnColor=indic[@"pickerCancelBtnColor"];
    NSArray *pickerTitleColor=indic[@"pickerTitleColor"];
    NSArray *pickerToolBarBg=indic[@"pickerToolBarBg"];
    NSArray *pickerBg=indic[@"pickerBg"];
    NSArray *selectArry=indic[@"selectedValue"];
    NSArray *weightArry=indic[@"wheelFlex"];
    NSString *pickerToolBarFontSize=[NSString stringWithFormat:@"%@",indic[@"pickerToolBarFontSize"]];
    NSString *pickerFontSize=[NSString stringWithFormat:@"%@",indic[@"pickerFontSize"]];
    NSArray *pickerFontColor=indic[@"pickerFontColor"];
    
    NSString *pickerLongTimeText=indic[@"pickerLongTimeText"];
    bool isShowLongTime=[NSString stringWithFormat:@"%@",indic[@"isShowLongTime"]].boolValue;
    NSString *pickerLongTimeFontSize=[NSString stringWithFormat:@"%@",indic[@"pickerLongTimeFontSize"]];
    NSArray *pickerLongTimeFontColor=indic[@"pickerLongTimeFontColor"];
    NSArray *pickerLongTimeBg=indic[@"pickerLongTimeBg"];
    
    
    id pickerData=indic[@"pickerData"];
    
    NSMutableDictionary *dataDic=[[NSMutableDictionary alloc]init];
    
    dataDic[@"pickerData"]=pickerData;
    
    [self.window.subviews enumerateObjectsUsingBlock:^(__kindof UIView * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        
        if ([obj isKindOfClass:[BzwPicker class]]) {
            dispatch_async(dispatch_get_main_queue(), ^{
                
                [obj removeFromSuperview];
            });
        }
        
    }];

    if (isShowLongTime) {
        if ([[UIDevice currentDevice].systemVersion doubleValue] >= 9.0 ) {
            self.height=302;
        }else{
            self.height=272;
        }
    }else{
        if ([[UIDevice currentDevice].systemVersion doubleValue] >= 9.0 ) {
            self.height=262;
        }else{
            self.height=232;
        }

    }
    
    
    self.bgimageView=[[UIButton alloc]initWithFrame:CGRectMake(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT)];
    self.bgimageView.alpha=0.0;
    self.bgimageView.backgroundColor=[UIColor blackColor];
    [self.bgimageView addTarget:self action:@selector(hiddentPick) forControlEvents:UIControlEventTouchUpInside];

    
    self.pick=[[BzwPicker alloc]initWithFrame:CGRectMake(0, SCREEN_HEIGHT, SCREEN_WIDTH, self.height) dic:dataDic leftStr:pickerCancelBtnText centerStr:pickerTitleText rightStr:pickerConfirmBtnText topbgColor:pickerToolBarBg bottombgColor:pickerBg leftbtnbgColor:pickerCancelBtnColor rightbtnbgColor:pickerConfirmBtnColor centerbtnColor:pickerTitleColor selectValueArry:selectArry weightArry:weightArry pickerToolBarFontSize:pickerToolBarFontSize pickerFontSize:pickerFontSize pickerFontColor:pickerFontColor isShowLongTime:isShowLongTime longTimeTitle:pickerLongTimeText longTimeFontSize:pickerLongTimeFontSize longTimeFontColor:pickerLongTimeFontColor longTimeBGColor:pickerLongTimeBg];
    
    __weak typeof(self) weakSelf=self;
    
    
    _pick.bolock=^(NSDictionary *backinfoArry){
        
        dispatch_async(dispatch_get_main_queue(), ^{
            
            
            if ([backinfoArry[@"type"] isEqualToString:@"confirm"] || [backinfoArry[@"type"] isEqualToString:@"cancel"]) {
                [weakSelf hiddentPick];

            }

            [weakSelf.bridge.eventDispatcher sendAppEventWithName:@"pickerEvent" body:backinfoArry];
        });
    };
    
    dispatch_async(dispatch_get_main_queue(), ^{
        [self.window addSubview:_bgimageView];

        [self.window addSubview:_pick];

        [UIView animateWithDuration:.3 animations:^{
            
            [_pick setFrame:CGRectMake(0, SCREEN_HEIGHT-self.height, SCREEN_WIDTH, self.height)];
            _bgimageView.alpha=0.5;
        }];
        
    });
    
}
- (void)hiddentPick {
    if (self.pick) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [UIView animateWithDuration:.3 animations:^{
                [_pick setFrame:CGRectMake(0, SCREEN_HEIGHT, SCREEN_WIDTH, self.height)];
                _bgimageView.alpha=0.0;
                
            }];
        });
    }
}

RCT_EXPORT_METHOD(show){
    if (self.pick) {
        
        dispatch_async(dispatch_get_main_queue(), ^{
            [UIView animateWithDuration:.3 animations:^{
                
                 [_pick setFrame:CGRectMake(0, SCREEN_HEIGHT-self.height, SCREEN_WIDTH, self.height)];
                _bgimageView.alpha=0.5;

            }];
        });
    }return;
}

RCT_EXPORT_METHOD(hide){
    
    if (self.pick) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [UIView animateWithDuration:.3 animations:^{
                [_pick setFrame:CGRectMake(0, SCREEN_HEIGHT, SCREEN_WIDTH, self.height)];
                _bgimageView.alpha=0.0;

            }];
        });
    }return;
}

RCT_EXPORT_METHOD(select: (NSArray*)data){

    if (self.pick) {
        dispatch_async(dispatch_get_main_queue(), ^{
            _pick.selectValueArry = data;
            [_pick selectRow];
        });
    }return;
}

RCT_EXPORT_METHOD(isPickerShow:(RCTResponseSenderBlock)getBack){
    
    if (self.pick) {
        
        CGFloat pickY=_pick.frame.origin.y;
        
        if (pickY==SCREEN_HEIGHT) {
            
            getBack(@[@YES]);
        }else
        {
            getBack(@[@NO]);
        }
    }else{
        getBack(@[@"picker不存在"]);
    }
}

@end
