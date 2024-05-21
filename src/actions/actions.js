import { httpToBackend } from '@/utils/http';

export async function fetchWarehouses(params) {
  return httpToBackend
    .post('/wms/warehouse/get', {}, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function fetchWarehousesWithFilters(body, params) {
  return httpToBackend
    .post('/wms/warehouse/get', body, { params })
    .then((res) => {
      console.log(res);

      return res.data.data;
    });
}

export async function AddWarehouses(body) {
  return httpToBackend
    .post('/wms/warehouse/add', body)
    .then((res) => console.log(res));
}

export async function deleteWarehouse(id) {
  return httpToBackend
    .post('/wms/warehouse/delete', { id: id })
    .then((res) => console.log(res));
}

export async function updateWarehouse(body) {
  return httpToBackend
    .post('/wms/warehouse/update', body)
    .then((res) => console.log(res));
}

export async function fetchStorageLocationsByWId(body, params) {
  return httpToBackend
    .post('/wms/storage-location/get', body, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function addStorageLocation(body) {
  return httpToBackend.post('/wms/storage-location/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function deleteStorageLocation(body) {
  return httpToBackend
    .post('/wms/storage-location/delete', body)
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}
// wms/material
export async function fetchMaterial(params, body) {
  return httpToBackend
    .post('/wms/material/get', body, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function fetchMaterialWithFilters(body) {
  return httpToBackend.post('/wms/material/get', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function addMaterial(body) {
  return httpToBackend.post('/wms/material/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function updateMaterial(body) {
  return httpToBackend.post('/wms/material/update', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function deleteMaterial(body) {
  return httpToBackend.post('/wms/material/delete', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchMaterialRFID() {
  return httpToBackend.post('/wms/rfidmaterial/get').then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function addMaterialRFID(body) {
  return httpToBackend.post('/wms/rfidmaterial/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

// wms/inbound
export async function addInboundRecord(body) {
  return httpToBackend.post('/wms/inbound/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function updateInboundRecord(body) {
  return httpToBackend.post('/wms/inbound/update', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchInbound(params) {
  return httpToBackend.post('/wms/inbound/get', {}, { params }).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

// export async function fetchTodayInbound(params) {
//   return httpToBackend.post('/today/inbound', {}, { params }).then((res) => {
//     console.log(res);
//     return res.data.data;
//   });
// }

// export async function fetchTodayInboundDone(params) {
//   return httpToBackend.post('/today/inbound/done', {}, { params }).then((res) => {
//     console.log(res);
//     return res.data.data;
//   });
// }

export async function fetchInboundWithFilter(body, params) {
  return httpToBackend
    .post('/wms/inbound/get', body, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function deleteInbound(body) {
  return httpToBackend.post('/wms/inbound/delete', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchInboundDetails(body) {
  return httpToBackend.post('/wms/inbound/get', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

// wms/outbound
export async function addOutboundRecord(body) {
  return httpToBackend.post('/wms/outbound/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchOutbound(params) {
  return httpToBackend.post('/wms/outbound/get', {}, { params }).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchTodayOutbound(params) {
  return httpToBackend.post('/today/outbound', {}, { params }).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchTodayOutboundDone(params) {
  return httpToBackend
    .post('/today/outbound/done', {}, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function fetchOutboundWithFilter(body) {
  return httpToBackend.post('/wms/outbound/get', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function updateOutboundRecord(body) {
  return httpToBackend.post('/wms/outbound/update', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function deleteOutbound(body) {
  return httpToBackend.post('/wms/outbound/delete', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchOutboundDetails(body) {
  return httpToBackend.post('/wms/outbound/get', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

// wms/stocktaking
export async function addStocktakingRecord(body) {
  return httpToBackend.post('/wms/stocktaking/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchStocktaking(params) {
  return httpToBackend
    .post('/wms/stocktaking/get', {}, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function fetchStocktakingWithFilter(body, params) {
  return httpToBackend
    .post('/wms/stocktaking/get', body, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function deleteStocktaking(body) {
  return httpToBackend.post('/wms/stocktaking/delete', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchStocktakingDetails(body) {
  return httpToBackend.post('/wms/stocktaking/detail', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

// export async function fetchWarehouses(params) {
//   try {
//     let res;
//     res = await fetch('/api/warehouse', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(params),
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch warehouses');
//     }

//     const response = await res.json();
//     return response;
//   } catch (error) {
//     console.error('Error fetching warehouses:', error);
//   }
// }

//maps
export async function fetchWHNameMap(params) {
  return httpToBackend
    .post('/wms/warehouse/namemap', {}, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function fetchSLNameMap(params) {
  return httpToBackend
    .post('/wms/storagelocation/namemap', {}, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function fetchWHSLNameMap(params) {
  return httpToBackend
    .post('/wms/warehousestoragelocation/idmap', {}, { params })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });
}

export async function getPlanelLocations(body) {
  return httpToBackend
    .post('/wms/storagelocation/plane-locations', body)
    .then((res) => {
      return res.data.data;
    });
}

export async function getUsers(body) {
  return httpToBackend.post('/wms/user/get', body).then((res) => {
    return res.data.data;
  });
}

//rule
export async function addRule(body) {
  return httpToBackend.post('/wms/rule/add', body).then((res) => {
    return res.data.data;
  });
}
export async function deleteRule(body) {
  return httpToBackend.post('/wms/rule/delete', body).then((res) => {
    return res.data.data;
  });
}
export async function updateRule(body) {
  return httpToBackend.post('/wms/rule/update', body).then((res) => {
    return res.data.data;
  });
}
export async function getRule(params) {
  return httpToBackend.post('/wms/rule/get', {}, { params }).then((res) => {
    return res.data.data;
  });
}

//resource
export async function addResource(body) {
  return httpToBackend.post('/wms/resource/add', body).then((res) => {
    return res.data.data;
  });
}
export async function deleteResource(body) {
  return httpToBackend.post('/wms/resource/delete', body).then((res) => {
    return res.data.data;
  });
}
export async function updateResource(body) {
  return httpToBackend.post('/wms/resource/update', body).then((res) => {
    return res.data.data;
  });
}
export async function getResource(params) {
  return httpToBackend.post('/wms/resource/get', {}, { params }).then((res) => {
    return res.data.data;
  });
}

//task
export async function addTask(body) {
  return httpToBackend.post('/wms/task/add', body).then((res) => {
    return res.data.data;
  });
}
export async function deleteTask(body) {
  return httpToBackend.post('/wms/task/delete', body).then((res) => {
    return res.data.data;
  });
}
export async function updateTask(body) {
  return httpToBackend.post('/wms/task/update', body).then((res) => {
    return res.data.data;
  });
}
export async function getTask(params, body) {
  return httpToBackend.post('/wms/task/get', body, { params }).then((res) => {
    return res.data.data;
  });
}
export async function getTaskPendingCount(params) {
  return httpToBackend
    .post('/wms/task/count/pending', {}, { params })
    .then((res) => {
      return res.data.data;
    });
}
export async function getTaskDoneCount(params) {
  return httpToBackend
    .post('/wms/task/count/done', {}, { params })
    .then((res) => {
      return res.data.data;
    });
}
