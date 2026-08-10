//
//  SquircleShapeBorderDrawing.h
//  Pods
//
//  Created by Fabrizio Beccaceci on 04/08/25.
//

#import <UIKit/UIKit.h>

#import <React/RCTBorderStyle.h>
#import <React/RCTDefines.h>
#import <React/RCTBorderDrawing.h>

#ifndef SquircleShapeBorderDrawing_h
#define SquircleShapeBorderDrawing_h

RCT_EXTERN UIImage *SquircleShapeGetBorderImage(
  RCTBorderStyle borderStyle,
  CGSize viewSize,
  RCTCornerRadii cornerRadii,
  UIEdgeInsets borderInsets,
  RCTBorderColors borderColors,
  UIColor *backgroundColor,
  BOOL drawToEdge,
  NSNumber *cornerSmoothing);

#endif /* SquircleShapeBorderDrawing_h */
