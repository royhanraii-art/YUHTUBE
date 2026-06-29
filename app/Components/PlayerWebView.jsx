import React, { useRef } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function PlayerWebView({ url }) {

  const myurl = 'https://player003.vercel.app/';
   const handleNavigation = (request) => {
    return request.url.startsWith(myurl);
  };

   const webViewRef = useRef(null);

  // JavaScript snippet injected directly into the DOM context
  const INJECTED_FULLSCREEN_LISTENER = `
    (function() {
      const fullscreenEvents = [
        'fullscreenchange', 
        'webkitfullscreenchange', 
        'mozfullscreenchange', 
        'MSFullscreenChange'
      ];
      
      fullscreenEvents.forEach(eventType => {
        document.addEventListener(eventType, function() {
          const isFullscreen = !!(
            document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement
          );
          // Dispatch status object directly back to native component
          window.ReactNativeWebView.postMessage(JSON.stringify({
            event: 'fullscreen',
            isFullscreen: isFullscreen
          }));
        }, false);
      });
    })();
    true;
  `;

  const handleMessage = async (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data.event === 'fullscreen') {
        if (data.isFullscreen) {
          // --- Target Landscape on Enter ---
          // For Expo:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          // For Bare RN: Orientation.lockToLandscape();
        } else {
          // --- Restore Portrait on Exit ---
          // For Expo:
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          // For Bare RN: Orientation.lockToPortrait();
        }
      }
    } catch (error) {
      console.error("Failed to parse WebView message:", error);
    }
  };

  return (
    <View style={{ flex: 1, minHeight: 400 
    }}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 , minHeight:400 }}
        injectedJavaScript={INJECTED_FULLSCREEN_LISTENER}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        onShouldStartLoadWithRequest={handleNavigation}
        onNavigationStateChange={(navState) => {
          if (!navState.url.startsWith(myurl)) {
            // Reset to allowed URL
            return false;
          }
        }}

        // Disable opening new windows / popups
        setSupportMultipleWindows={false}
      />
    </View>
  );
}