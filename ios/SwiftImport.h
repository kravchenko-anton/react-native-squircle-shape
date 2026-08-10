//
//  SwiftImport.h
//  Pods
//
//  Created by Fabrizio Beccaceci on 19/11/25.
//

#ifndef SwiftImport_h
#define SwiftImport_h

// #import "SquircleShape-Swift.h"
// #import <SquircleShape/SquircleShape-Swift.h>

#if __has_include(<SquircleShape/SquircleShape-Swift.h>)
#import <SquircleShape/SquircleShape-Swift.h>
#elif __has_include("SquircleShape-Swift.h")
#import "SquircleShape-Swift.h"
#else
#error "Swift bridging header not found"
#endif

#endif /* SwiftImport_h */