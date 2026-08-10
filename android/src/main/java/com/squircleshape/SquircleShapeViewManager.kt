package com.squircleshape

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.SquircleShapeViewManagerInterface
import com.facebook.react.viewmanagers.SquircleShapeViewManagerDelegate

@ReactModule(name = SquircleShapeViewManager.NAME)
class SquircleShapeViewManager : SimpleViewManager<SquircleShapeView>(),
  SquircleShapeViewManagerInterface<SquircleShapeView> {
  private val mDelegate: ViewManagerDelegate<SquircleShapeView>

  init {
    mDelegate = SquircleShapeViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<SquircleShapeView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): SquircleShapeView {
    return SquircleShapeView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: SquircleShapeView?, color: Int?) {
    view?.setBackgroundColor(color ?: Color.TRANSPARENT)
  }

  companion object {
    const val NAME = "SquircleShapeView"
  }
}
