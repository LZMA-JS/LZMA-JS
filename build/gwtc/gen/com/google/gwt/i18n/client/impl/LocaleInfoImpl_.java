package com.google.gwt.i18n.client.impl;

import com.google.gwt.core.client.JavaScriptObject;

public class LocaleInfoImpl_ extends com.google.gwt.i18n.client.impl.LocaleInfoImpl {
  private JavaScriptObject nativeDisplayNames;
  
  public String[] getAvailableLocaleNames() {
    return new String[] {
      "default",
    };
  }
  
  public String getLocaleName() {
    return "default";
  }
  
  public native String getLocaleNativeDisplayName(String localeName) /*-{
    this.@com.google.gwt.i18n.client.impl.LocaleInfoImpl_::ensureNativeDisplayNames()();
    return this.@com.google.gwt.i18n.client.impl.LocaleInfoImpl_::nativeDisplayNames[localeName];
  }-*/;
  
  private native void ensureNativeDisplayNames() /*-{
    if (this.@com.google.gwt.i18n.client.impl.LocaleInfoImpl_::nativeDisplayNames != null) {
      return;
    }
    this.@com.google.gwt.i18n.client.impl.LocaleInfoImpl_::nativeDisplayNames = {
    };
  }-*/;
}
