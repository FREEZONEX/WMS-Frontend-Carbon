import React, { useEffect, useState, useRef } from 'react';
import { Modal, ComboBox } from '@carbon/react';
import { fetchWarehouses, getPlanelLocations } from '@/actions/actions';

const AddExpectLocationModal = ({ isOpen, onClose, onConfirm }) => {
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedStorageLocation, setSelectedStorageLocation] = useState([]);
  const [locationDatas, setLocationDatas] = useState([]);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const divRef = useRef(null);
  const maskRef = useRef(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  let selectedWarehouseInfo = null;

  useEffect(() => {
    initPage();
    fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
      if (res && res.list) {
        setWarehouseOptions(res.list);
      }
    });
  }, []);

  const initPage = () => {
    let container = document.getElementById('shelf-container');
    let modal = document.getElementsByClassName('shelf-modal')[0];
    container.onselectstart = function () {
      return false;
    };
    modal.oncontextmenu = function () {
      return false;
    };
  };

  const getStorageLocation = () => {
    console.log('wh info', selectedWarehouseInfo);
    const currentWarehouseInfo = selectedWarehouseInfo;
    if (currentWarehouseInfo?.id) {
      getPlanelLocations({ warehouse_id: currentWarehouseInfo.id }).then(
        (res) => {
          setLocationDatas(res.list);
        }
      );
    }
    console.log(locationDatas);
  };
  const onSelectWarehouse = (event) => {
    setSelectedStorageLocation([]);
    const shelvesEles = document.querySelectorAll('.shelf-area');
    shelvesEles.forEach((t) => {
      t.classList.remove('bg-sky-200');
    });
    selectedWarehouseInfo = event.selectedItem;
    getStorageLocation();
  };
  const handleCancelClicked = () => {
    onClose();
  };

  const handleSubmit = async () => {
    let shelfIds = [];
    selectedStorageLocation.forEach((t) => {
      shelfIds.push(...t.items);
    });
    onConfirm(shelfIds);
  };
  const onShelfClick = (e, item) => {
    setSelectedShelves(item);
    e.target.classList.toggle('bg-sky-200');
  };

  const setSelectedShelves = (item) => {
    const exist =
      selectedStorageLocation.find(
        (t) => t.colId == item.colId && item.shelfId == t.shelfId
      ) != null;
    if (!exist) {
      setSelectedStorageLocation([...selectedStorageLocation, item]);
    }
    if (exist) {
      selectedStorageLocation.splice(selectedStorageLocation.indexOf(item), 1);
    }
    console.log('selectLocation', selectedStorageLocation);
  };

  const handleMouseDown = (event) => {
    if (event.button != 0) {
      return;
    }
    setIsSelecting(true);
    const rect = divRef.current.getBoundingClientRect();
    const startX = event.clientX - rect.left;
    const startY = event.clientY - rect.top;
    setSelection({ x: startX, y: startY, width: 0, height: 0 });
  };

  const handleMouseMove = (event) => {
    if (isSelecting) {
      const rect = divRef.current.getBoundingClientRect();
      const width = event.clientX - rect.left - selection.x;
      const height = event.clientY - rect.top - selection.y;
      setSelection((prevSelection) => ({ ...prevSelection, width, height }));

      const shelvesEles = document.querySelectorAll('.shelf-area');
      shelvesEles.forEach((t) => {
        t.classList.remove('bg-sky-200');
        const boxRect = t.getBoundingClientRect();
        if (
          boxRect.x < event.clientX &&
          boxRect.y < event.clientY &&
          boxRect.y >= rect.top + selection.y - 40
        ) {
          t.classList.add('bg-sky-200');
          const dataFlags = t.id?.split('-');
          const shelfId = dataFlags[0];
          const colId = dataFlags[1];
          locationDatas.forEach((shelf) => {
            if (shelf.shelfId == shelfId) {
              let item = shelf.shelfCols.find(
                (col) => col.colId == colId && col.shelfId == shelfId
              );
              if (item != null) {
                setSelectedShelves(item);
              }
            }
          });
        }
      });
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  /**
   * background move
   * @param {*} event
   * @returns
   */
  const onContainerMouseDown = (event) => {
    if (event.button != 2) {
      return;
    }
    const startX = event.clientX - position.x;
    const startY = event.clientY - position.y;

    const handleMouseMove = (moveEvent) => {
      let canvasRect = document
        .getElementById('shelf-canvas')
        .getBoundingClientRect();
      if (
        moveEvent.x - canvasRect.x > 100 &&
        moveEvent.x < canvasRect.width + canvasRect.x - 100
      ) {
        setPosition({
          x: moveEvent.clientX - startX,
          y: moveEvent.clientY - startY,
        });
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
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
      className="shelf-modal"
      isFullWidth={true}
      size="md"
    >
      <div className="p-3" style={{ height: '650px' }}>
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
        <div
          id="shelf-canvas"
          className="bg-white p-5 mt-2"
          style={{ overflow: 'auto', height: '300px' }}
        >
          <div
            className="bg-white"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
            onMouseDown={onContainerMouseDown}
          >
            <div id="shelf-container" style={{ width: '100%' }}>
              <div
                className="flex flex-row items-end text-center relative"
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
                          width: '40px',
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
                          {item.shelfCols.map((col, colIndex) => {
                            return (
                              <>
                                <div
                                  className="shelf-area content-center"
                                  id={`${col.shelfId}-${col.colId}`}
                                  key={colIndex}
                                  style={{
                                    height: '60px',
                                    border: '2px solid #1264FE',
                                  }}
                                  onClick={(event) => onShelfClick(event, col)}
                                >
                                  {col.colName}
                                </div>
                              </>
                            );
                          })}
                        </div>
                        <div className="font-semibold mt-2">
                          {item.shelfName}
                        </div>
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
          </div>
        </div>
        <div className="pt-2">
          <div className="inline-block pr-2" style={{ background: '#eee' }}>
            <p className="text-sm text-gray-600">
              <span className="text-red-500">*</span>You can drag the map by
              holding down the right mouse button.
            </p>
            <p className="text-sm text-gray-600">
              <span className="text-red-500">*</span>You can select multiple
              shelves at the same time with the left mouse button.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddExpectLocationModal;
