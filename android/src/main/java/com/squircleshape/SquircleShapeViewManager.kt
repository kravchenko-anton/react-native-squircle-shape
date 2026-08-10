package com.squircleshape

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.SquircleShapeViewManagerDelegate
import com.facebook.react.viewmanagers.SquircleShapeViewManagerInterface
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.react.views.view.ReactViewManager

@ReactModule(name = SquircleShapeViewManager.NAME)
class SquircleShapeViewManager : ReactViewManager(),
  SquircleShapeViewManagerInterface<SquircleShapeView> {

  private val delegate: ViewManagerDelegate<ReactViewGroup>

  init {
    val specificDelegate = SquircleShapeViewManagerDelegate(ViewManagerWrapper(this))
    delegate = SplitDelegate(super.getDelegate(), specificDelegate)
  }

  override fun getName(): String {
    return NAME
  }

  override fun createViewInstance(context: ThemedReactContext): SquircleShapeView {
    return SquircleShapeView(context)
  }

  override fun setCornerSmoothing(view: SquircleShapeView?, value: Float) {
    view?.setCornerSmoothing(value);
  }

  override fun getDelegate(): ViewManagerDelegate<ReactViewGroup> {
    return delegate
  }

  companion object {
    const val NAME = "SquircleShapeView"
  }

}

class ViewManagerWrapper(private val baseVm: SquircleShapeViewManager) :
  SimpleViewManager<SquircleShapeView>(), SquircleShapeViewManagerInterface<SquircleShapeView> {

  override fun createViewInstance(reactContext: ThemedReactContext): SquircleShapeView {
    return baseVm.createViewInstance(reactContext)
  }

  override fun getName(): String {
    return baseVm.name
  }

  override fun setCornerSmoothing(view: SquircleShapeView?, value: Float) {
    baseVm.setCornerSmoothing(view, value)
  }

}

class SplitDelegate(
  private val baseDelegate: ViewManagerDelegate<ReactViewGroup>,
  private val specificDelegate: ViewManagerDelegate<SquircleShapeView>
) : ViewManagerDelegate<ReactViewGroup> {

  override fun setProperty(view: ReactViewGroup, propName: String, value: Any?) {
    baseDelegate.setProperty(view, propName, value)

    // For some reason i cannot understand handling the outlineColor in the specificDelegate causes
    // a crash so we avoid that, it will still be handles by baseDelegate so should not be a problem.
    if (propName == "outlineColor") return

    if (view is SquircleShapeView)
      specificDelegate.setProperty(view, propName, value)
  }

  override fun receiveCommand(view: ReactViewGroup, commandName: String, args: ReadableArray) {
    baseDelegate.receiveCommand(view, commandName, args)

    if (view is SquircleShapeView)
      specificDelegate.setProperty(view, commandName, args)
  }

}
