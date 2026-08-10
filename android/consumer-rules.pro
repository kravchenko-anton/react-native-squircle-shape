# Preserve React Native drawable internals accessed via reflection.
-keepclassmembers class com.facebook.react.uimanager.drawable.BackgroundDrawable {
  *;
}

-keepclassmembers class com.facebook.react.uimanager.drawable.BorderDrawable {
  *;
}

-keepclassmembers class com.facebook.react.uimanager.drawable.OutlineDrawable {
  *;
}

-keepclassmembers class com.facebook.react.uimanager.drawable.OutsetBoxShadowDrawable {
  *;
}

-keepclassmembers class com.facebook.react.uimanager.drawable.BackgroundImageDrawable {
  *;
}
