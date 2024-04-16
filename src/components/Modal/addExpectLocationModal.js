import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  ComboBox,
  TextInput,
  Column,
  Grid,
  TextArea,
} from '@carbon/react';
import { fetchWarehouses, fetchStorageLocationsByWId } from '@/actions/actions';

const AddExpectLocationModal = ({ isOpen, onClose }) => {
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedStorageLocation, setSelectedStorageLocation] = useState([]);
  const [locationDatas, setLocationDatas] = useState([]);
  let selectedWarehouseInfo = null;
  let mouseButton = null;

  const divRef = useRef(null);
  const maskRef = useRef(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    initPage();
    fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
      setWarehouseOptions(res.list);
    });
  }, []);

  const initPage = () => {
    let container = document.getElementById('shelf-container');
    container.onselectstart = function () {
      return false;
    };
  };

  const getStorageLocation = () => {
    console.log('wh info', selectedWarehouseInfo);
    // const currentWarehouseInfo = selectedWarehouseInfo;
    // if (
    //   currentWarehouseInfo?.id &&
    //   prevWarehouseInfoRef.current?.id !== currentWarehouseInfo.id
    // ) {
    //   fetchStorageLocationsByWId(
    //     { warehouse_id: currentWarehouseInfo.id },
    //     { pageNum: 1, pageSize: 99999999 }
    //   ).then((res) => {
    //     setStorageLocationOptions(res.list);
    //   });
    // }
    buildLocationData();
  };

  const buildLocationData = () => {
    let datas = [];
    for (var i = 0; i < 10; i++) {
      datas.push({
        shelfId: i,
        shelfName: 'A' + i,
        sn: i,
        shelfAreaNos: [],
      });

      datas.forEach((t) => {
        t.shelfAreaNos = [];
        for (let j = 4; j >= 0; j--) {
          t.shelfAreaNos.push({
            shelfId: t.shelfId,
            areaId: j,
            areaName: j + 1,
          });
        }
      });
    }
    setLocationDatas(datas);
    console.log('shelf data', locationDatas);
  };

  const onSelectWarehouse = (event) => {
    if (event) {
      selectedWarehouseInfo = event.selectedItem;
      getStorageLocation();
    }
  };
  const handleCancelClicked = () => {
    onClose();
  };

  const handleSubmit = async () => {
    // const newValidation = {
    //   codeInvalid: !formValue.product_code || formValue.product_code === '',
    //   nameInvalid: !formValue.name || formValue.name === '',
    // };
    // setFieldValidation(newValidation);

    // if (Object.values(fieldValidation).some((v) => v)) {
    //   setFieldValidation(newValidation);
    //   return;
    // }
    // updateMaterial(formValue).then((res) => {
    //   onClose();
    //   setRefresh({});
    // });
    onClose();
  };
  const onShelfClick = (e, item) => {
    console.log('shelf', e, item);
    const exist =
      selectedStorageLocation.find(
        (t) => t.shelfId == item.shelfId && t.areaId == item.areaId
      ) != null;
    if (!exist) {
      setSelectedStorageLocation([...selectedStorageLocation, item]);
    }
    console.log('selectLocation', selectedStorageLocation);
    if (exist) {
      selectedStorageLocation.splice(selectedStorageLocation.indexOf(item), 1);
    }
    e.target.classList.toggle('bg-sky-200');
  };

  const handleMouseDown = (event) => {
    setIsSelecting(true);
    const rect = divRef.current.getBoundingClientRect();
    const startX = event.clientX - rect.left;
    const startY = event.clientY - rect.top;
    setSelection({ x: startX, y: startY, width: 0, height: 0 });
  };

  const handleMouseMove = (event) => {
    if (isSelecting) {
      // console.log('move', event.target);
      const rect = divRef.current.getBoundingClientRect();
      const width = event.clientX - rect.left - selection.x;
      const height = event.clientY - rect.top - selection.y;
      setSelection((prevSelection) => ({ ...prevSelection, width, height }));

      const shelvesEles = document.querySelectorAll('.shelf-area');
      console.log('event', event);
      shelvesEles.forEach((t) => {
        t.classList.remove('bg-sky-200');
        const boxRect = t.getBoundingClientRect();
        // console.log("boxRect",boxRect);
        if (
          boxRect.x < event.clientX &&
          boxRect.y < event.clientY &&
          boxRect.top < event.clientY
        ) {
          t.classList.add('bg-sky-200');
          console.log('t', t);
        }
      });
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };
  return (
    <Modal
      open={isOpen}
      modalHeading="Select Expect Location"
      modalLabel="Material Management"
      primaryButtonText="Ok"
      secondaryButtonText="Cancel"
      onRequestClose={handleCancelClicked}
      onRequestSubmit={handleSubmit}
      height="800px"
    >
      <div style={{ height: '500px' }}>
        <div style={{ width: '50%' }}>
          <ComboBox
            titleText="Warehouse"
            items={warehouseOptions}
            itemToString={(item) => (item ? item.name : '')}
            placeholder="Choose warehouse"
            onChange={(selectedItem) => onSelectWarehouse(selectedItem)}
          />
          <div className="mt-1">
            <span className="text-gray-500">
              Please select the warehouse where you want to place your materials
            </span>
          </div>
        </div>
        <div className="bg-white p-5 mt-5">
          <div id="shelf-container" style={{ width: '100%' }}>
            <div
              className="flex flex-row text-center relative"
              ref={divRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {locationDatas.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      style={{
                        width: '50px',
                        marginLeft: index % 2 == 0 ? '30px' : '0px',
                      }}
                      className=" relative"
                    >
                      <div
                        style={{
                          borderTop: '4px solid #1264FF',
                          borderBottom: '4px solid #1264FF',
                          borderLeft:
                            index % 2 == 1 ? 'none' : '4px solid #1264FF',
                          borderRight:
                            index % 2 == 0
                              ? '2px solid #1264FF'
                              : '4px solid #1264FF',
                        }}
                      >
                        {item.shelfAreaNos.map((area, areaIndex) => {
                          return (
                            <>
                              <div
                                className="shelf-area content-center"
                                id={item.shelfName + '-' + area.areaName}
                                key={areaIndex}
                                style={{
                                  height: '60px',
                                  border: '2px solid #1264FE',
                                }}
                                onClick={(event) => onShelfClick(event, area)}
                              >
                                {area.areaName}
                              </div>
                            </>
                          );
                        })}
                      </div>
                      <div className="font-semibold mt-2">{item.shelfName}</div>
                    </div>
                  </>
                );
              })}
              {isSelecting && (
                <div
                  ref={maskRef}
                  style={{
                    position: 'absolute',
                    left: selection.x,
                    top: selection.y,
                    width: selection.width,
                    height: selection.height,
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          </div>
          <div className="mt-5">
            <div
              className="text-xs w-90"
              style={{ background: '#F2F1F1', width: 'auto' }}
            >
              <p>*You can drap the map by hold the right mouse button</p>
              <p>
                *You can select multiple shelves at the same time with the left
                mouse button
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExpectLocationModal;
