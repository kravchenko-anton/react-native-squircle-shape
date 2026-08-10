//
//  SquircleShapeBoxShadow.h
//  Pods
//
//  Created by Fabrizio Beccaceci on 05/08/25.
//

#import <UIKit/UIKit.h>
#import <React/RCTBoxShadow.h>
#import <vector>
#import <React/RCTBorderDrawing.h>
#import <React/RCTDefines.h>
#import <UIKit/UIKit.h>
#import <react/renderer/graphics/BoxShadow.h>

#ifndef SquircleShapeBoxShadow_h
#define SquircleShapeBoxShadow_h

using namespace facebook::react;

RCT_EXTERN CALayer *SquircleShapeGetBoxShadowLayer(
    const facebook::react::BoxShadow &shadow,
    RCTCornerRadii cornerRadii,
    UIEdgeInsets edgeInsets,
    CGSize layerSize,
    NSNumber *cornerSmoothing);

#endif /* SquircleShapeBoxShadow_h */
