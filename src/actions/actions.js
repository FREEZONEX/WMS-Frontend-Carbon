import { httpToBackend } from '@/utils/http';

export async function fetchWarehouses() {
  return httpToBackend.post('/wms/warehouse/get').then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchWarehousesWithFilters(body) {
  return httpToBackend.post('/wms/warehouse/get', body).then((res) => {
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

export async function fetchStorageLocationsByWId(body) {
  return httpToBackend.post('/wms/storagelocation/get', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function addStorageLocation(body) {
  return httpToBackend.post('/wms/storagelocation/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function deleteStorageLocation(body) {
  return httpToBackend.post('/wms/storagelocation/delete', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}
// wms/material
export async function fetchMaterial() {
  return httpToBackend.post('/wms/material/get').then((res) => {
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

// wms/inbound
export async function addInboundRecord(body) {
  return httpToBackend.post('/wms/inbound/add', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchInbound() {
  return httpToBackend.post('/wms/inbound/get').then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchInboundWithFilter(body) {
  return httpToBackend.post('/wms/inbound/get', body).then((res) => {
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
  return httpToBackend.post('/wms/inbound/detail/get', body).then((res) => {
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

export async function fetchOutbound() {
  return httpToBackend.post('/wms/outbound/get').then((res) => {
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

export async function deleteOutbound(body) {
  return httpToBackend.post('/wms/outbound/delete', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchOutboundDetails(body) {
  return httpToBackend.post('/wms/outbound/detail/get', body).then((res) => {
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

export async function fetchStocktaking() {
  return httpToBackend.post('/wms/stocktaking/get').then((res) => {
    console.log(res);
    return res.data.data;
  });
}

export async function fetchStocktakingWithFilter(body) {
  return httpToBackend.post('/wms/stocktaking/get', body).then((res) => {
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
  return httpToBackend.post('/wms/stocktaking/detail/get', body).then((res) => {
    console.log(res);
    return res.data.data;
  });
}
