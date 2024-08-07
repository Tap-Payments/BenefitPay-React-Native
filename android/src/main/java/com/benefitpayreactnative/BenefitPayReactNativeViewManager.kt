package com.benefitpayreactnative

import android.graphics.Color
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import company.tap.tapbenefitpay.open.TapBenefitPayStatusDelegate
import company.tap.tapbenefitpay.open.web_wrapper.BeneiftPayConfiguration
import company.tap.tapbenefitpay.open.web_wrapper.TapBenefitPay


class BenefitPayReactNativeViewManager : SimpleViewManager<View>() {
  override fun getName() = "BenefitPayReactNativeView"
  lateinit var customView: TapBenefitPay

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    var testView = LayoutInflater.from(reactContext).inflate(R.layout.cardview, null)
    customView = testView.findViewById(R.id.benefitForm)
    return testView
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
    return MapBuilder.of(
      "onErrorCallback", MapBuilder.of("registrationName", "onErrorCallback"),
      "onSuccessCallback", MapBuilder.of("registrationName", "onSuccessCallback"),
      "onOrderCreatedCallback", MapBuilder.of("registrationName", "onOrderCreatedCallback"),
      "onChargeCreatedCallback", MapBuilder.of("registrationName", "onChargeCreatedCallback"),
      "onReadyCallback", MapBuilder.of("registrationName", "onReadyCallback"),
      "onClickedCallback", MapBuilder.of("registrationName", "onClickedCallback"),
      "onCanceledCallback", MapBuilder.of("registrationName", "onCanceledCallback"),
    )
  }
  @ReactProp(name = "config")
  fun setConfig(view: View, config: ReadableMap) {
    print(config.toString())
    BeneiftPayConfiguration.configureWithTapBenfitPayDictionaryConfiguration(view.context, customView ,config.toHashMap(), object :
      TapBenefitPayStatusDelegate {


      override fun onBenefitPayChargeCreated(data: String) {
        val event = Arguments.createMap().apply {
          putString("data", data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onChargeCreatedCallback", event)
        Log.e("configTest", data)
      }



      override fun onBenefitPayOrderCreated(data: String) {
        val event = Arguments.createMap().apply {
          putString("data", data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onOrderCreatedCallback", event)
        Log.e("configTest", data)
      }



      override fun onBenefitPayError(error: String) {
        val event = Arguments.createMap().apply {
          putString("data", error)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onErrorCallback", event)
        Log.e("configTest", error)
      }



      override fun onBenefitPayCancel() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onCanceledCallback", event)
        Log.e("configTest", "onCancel")
      }




      override fun onBenefitPayReady() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onReadyCallback", event)
        Log.e("configTest", "onReady")
      }



      override fun onBenefitPayClick() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onClickedCallback", event)
        Log.e("configTest", "onClick")
      }


     

      override fun onBenefitPaySuccess(data: String) {
        val event = Arguments.createMap().apply {
          putString("data",data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onSuccessCallback", event)
        Log.e("configTest", data)
      }
    })
  }
}
