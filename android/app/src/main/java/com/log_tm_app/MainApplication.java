package com.log_tm_app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AMapGeolocationPackage(),
            new AMap3DPackage(),
            new VectorIconsPackage(),
            new PhotoViewPackage(),
            new OrientationPackage(),
            new ImageResizerPackage(),
            new ImagePickerPackage(),
            new PickerPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
