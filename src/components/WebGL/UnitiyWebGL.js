import React, { useEffect, useRef } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityWebGL = () => {
  const buildUrl = '/webgl/MQTTWEBGL';
  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl: buildUrl + '.loader.js',
    dataUrl: buildUrl + '.data',
    frameworkUrl: buildUrl + '.framework.js',
    codeUrl: buildUrl + '.wasm',
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
