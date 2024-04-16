import React, { useEffect, useRef } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityWebGL = () => {
  const buildUrl = '/MQTTWEBGL';
  const { unityProvider } = useUnityContext({
    loaderUrl: buildUrl + '.loader.js',
    dataUrl: buildUrl + '.data',
    frameworkUrl: buildUrl + '.framework.js',
    codeUrl: buildUrl + '.wasm',
  });

  return (
    <Unity
      unityProvider={unityProvider}
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default UnityWebGL;
