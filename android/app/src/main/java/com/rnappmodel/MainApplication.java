package com.rnappmodel;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.imagepicker.ImagePickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.remobile.toast.RCTToastPackage;
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
            new BlurViewPackage(),
            new ReactVideoPackage(),
            new RNSoundPackage(),
            new ReactNativeAudioPackage(),
            new PickerViewPackage(),
            new PickerPackage(),
            new RCTCameraPackage(),
            new ImagePickerPackage(),
            new RNFetchBlobPackage(),
            new RNFSPackage(),
            new RNDeviceInfo(),
            new RCTToastPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
