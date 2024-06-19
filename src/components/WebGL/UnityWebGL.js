import React, { useEffect, useRef } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UnityWebGL = () => {
  let brokerConfig = null;
  const brokerDefault = {
    type: 'wss',
    address: 'supos.app',
    port: '8084',
    topicRequest: 'spBv2.0/wms/NCMD/unity/full/request',
    topicIncrement: 'spBv2.0/wms/NDATA/server/increment',
    topicResponse: 'spBv2.0/wms/NDATA/server/full/response',
  };

  const buildUrl = '/webgl/WareHouseDemoWebGL_v3';
  const { unityProvider, requestFullscreen, sendMessage } = useUnityContext({
    // loaderUrl: buildUrl + '.loader.js',
    loaderUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.loader.js',
    // dataUrl: buildUrl + '.data',
    dataUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.data',
    // frameworkUrl: buildUrl + '.framework.js',
    frameworkUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.framework.js',
    // codeUrl: buildUrl + '.wasm',
    codeUrl:
      'https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/WareHouseDemoWebGL_v3.wasm',
  });
  function handleClick() {
    requestFullscreen(true);
  }
  useEffect(() => {
    fetch('https://wmswebgl.oss-ap-southeast-1.aliyuncs.com/config.json')
      .then((res) => {
        brokerConfig = res.json();
        return brokerConfig;
      })
      .then((json) => console.log(json));

    if (typeof window !== 'undefined') {
      window.sendUnityMessage = function () {
        sendMessage(
          'UnityWebServerFetcher',
          'GetServerInfo',
          JSON.stringify(brokerConfig === null ? brokerDefault : brokerConfig)
        );
        console.log('Message received from Unity: ');
      };
    }
  }, []);
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
