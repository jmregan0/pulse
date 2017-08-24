/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <React/RCTLinkingManager.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSError* configureError;
  [[GGLContext sharedInstance] configureWithError: &configureError];
  NSAssert(!configureError, @"Error configuring Google services: %@", configureError);
  
  [GIDSignIn sharedInstance].delegate = self;
  
  return YES;
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary *)options {
  return [[GIDSignIn sharedInstance] handleURL:url
                             sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
}

- (void)signIn:(GIDSignIn *)signIn
didSignInForUser:(GIDGoogleUser *)user
     withError:(NSError *)error {
  // Perform any operations on signed in user here.
  NSString *userId = user.userID;                  // For client-side use only!
  NSString *idToken = user.authentication.idToken; // Safe to send to the server
  NSString *fullName = user.profile.name;
  NSString *givenName = user.profile.givenName;
  NSString *familyName = user.profile.familyName;
  NSString *email = user.profile.email;
  // ...
}

- (void)signIn:(GIDSignIn *)signIn
didDisconnectWithUser:(GIDGoogleUser *)user
     withError:(NSError *)error {
  // Perform any operations when the user disconnects from app here.
  // ...
}

@end
