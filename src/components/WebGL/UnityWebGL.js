import React, { useEffect, useRef } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityWebGL = () => {
  const buildUrl = '/webgl/WareHouseDemoWebGL_v3';
  const { unityProvider, requestFullscreen } = useUnityContext({
    // loaderUrl: buildUrl + '.loader.js',
    loaderUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.loader.js',
    //buildUrl + '.data',
    dataUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.data',
    // frameworkUrl: buildUrl + '.framework.js',
    frameworkUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.framework.js',
    //buildUrl + '.wasm',
    codeUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.wasm',
  });
  function handleClick() {
    requestFullscreen(true);
  }
  return (
    <>
      <Unity
        unityProvider={unityProvider}
        style={{ height: '100%', width: '100%' }}
      />
      {/* <button onClick={handleClick}>Enter Fullscreen</button> */}
    </>
  );
};

export default UnityWebGL;
