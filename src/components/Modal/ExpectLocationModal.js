import React, { useEffect, useState, useRef } from 'react';
import { Modal, ComboBox } from '@carbon/react';
import { fetchWarehouses, getPlanelLocations } from '@/actions/actions';
let mouseX = 0;

const ExpectLocationModal = ({ isOpen, onClose, onConfirm, selectedItem }) => {
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [locationDatas, setLocationDatas] = useState([]);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const divRef = useRef(null);
  const maskRef = useRef(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState({
    lx: 0,
    ly: 0,
    rx: 0,
    ry: 0,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [mouseDirection, setMouseDirection] = useState(null);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState(null);
  const [errMsg, setErrMsg] = useState();
  const [msgOpen, setMsgOpen] = useState(false);

  useEffect(() => {
    initPage();
    fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
      if (res && res.list) {
        setWarehouseOptions(res.list);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedItem) {
      const selectWarehouse = warehouseOptions.find(
        (t) => t.id == selectedItem.whId
      );
      if (selectWarehouse) {
        setSelectedWarehouseInfo(selectWarehouse);
      }
    }
  }, [warehouseOptions, selectedItem]);

  useEffect(() => {
    if (selectedWarehouseInfo) {
      getStorageLocation(selectedWarehouseInfo.id);
    }
  }, [selectedWarehouseInfo]);

  useEffect(() => {
    const shelvesEles = document.querySelectorAll('.shelf-area');
    shelvesEles.forEach((t) => {
      t.classList.remove('bg-sky-200');
    });

    if (
      selectedItem &&
      selectedItem.whId == selectedWarehouseInfo?.id &&
      selectedItem.shelves.length > 0
    ) {
      shelvesEles.forEach((t) => {
        if (selectedItem.shelves.find((s) => s == t?.id)) {
          t.classList.add('bg-sky-200');
        }
      });
    }
  }, [selectedItem, locationDatas, selectedWarehouseInfo]);

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

  const getStorageLocation = (warehouseId) => {
    getPlanelLocations({ warehouse_id: warehouseId }).then((res) => {
      Object.keys(res.planeNames).map((key) => {
        return res.planeNames[key].reverse();
      });
      setLocationDatas(res.planeNames);
    });
  };

  const onSelectWarehouse = (event) => {
    const shelvesEles = document.querySelectorAll('.shelf-area');
    shelvesEles.forEach((t) => {
      t.classList.remove('bg-sky-200');
    });
    setSelectedWarehouseInfo(event.selectedItem);
  };
  const handleCancelClicked = () => {
    onClose();
  };

  const handleSubmit = async () => {
    let shelves = [];
    const shelvesEles = document.querySelectorAll('.shelf-area');
    shelvesEles.forEach(async (t) => {
      if (t.classList.contains('bg-sky-200')) {
        //console.log('container', t);
        const shelfName = t.id;
        shelves.push(shelfName);
      }
    });
    if (!selectedWarehouseInfo?.id) {
      setErrMsg('Please select a warehouse.');
      setMsgOpen(true);
      return;
    }
    if (shelves.length == 0) {
      setErrMsg('Please select a shelf at least.');
      setMsgOpen(true);
      return;
    }

    onConfirm({
      warehouseInfo: selectedWarehouseInfo,
      warehouse_name: selectedWarehouseInfo.warehouse_name,
      shelves: shelves,
    });
  };

  const onShelfClick = (e, item) => {
    e.target.classList.toggle('bg-sky-200');
  };

  const handleMouseDown = (event) => {
    if (event.button != 2) {
      return true;
    }
    setMouseDirection(null);
    setIsSelecting(true);
    const rect = divRef.current.getBoundingClientRect();
    const startX = event.clientX - rect.left;
    const startY = event.clientY - rect.top;
    setSelection({
      lx: event.clientX,
      ly: event.clientY,
      rx: startX,
      ry: startY,
      left: startX,
      top: startY,
      width: 0,
      height: 0,
    });
  };

  const initSelection = () => {
    setSelection({
      ...selection,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    });
  };
  const handleMouseMove = (event) => {
    if (isSelecting) {
      const currentMouseX = event.clientX;
      if (currentMouseX > mouseX) {
        setMouseDirection('right');
        initSelection();
      } else if (currentMouseX < mouseX) {
        setMouseDirection('left');
        initSelection();
      }
      if (mouseDirection == null) {
        return;
      }
      mouseX = currentMouseX;

      const rect = divRef.current.getBoundingClientRect();
      let width = 0;
      let height = 0;

      if (mouseDirection == 'left') {
        width = selection.lx - event.clientX;
        height = selection.ry + rect.top - event.clientY;
        setSelection((prevSelection) => ({
          ...prevSelection,
          left: event.clientX - rect.left,
          top: event.clientY - rect.top,
          width,
          height,
        }));
      } else {
        let width = event.clientX - rect.left - selection.rx;
        let height = event.clientY - rect.top - selection.ry;
        setSelection((prevSelection) => ({
          ...prevSelection,
          left: selection.rx,
          top: selection.ry,
          width,
          height,
        }));
      }

      const shelvesEles = document.querySelectorAll('.shelf-area');
      shelvesEles.forEach((t) => {
        const boxRect = t.getBoundingClientRect();
        if (
          boxRect.x < event.clientX &&
          boxRect.y < event.clientY &&
          boxRect.y >= rect.top + selection.ry - 60 &&
          boxRect.x > rect.left + selection.rx - 40
        ) {
          t.classList.add('bg-sky-200');
        } else {
          if (mouseDirection == 'left') {
            if (
              boxRect.right > event.clientX &&
              boxRect.bottom > event.clientY &&
              boxRect.bottom <= selection.ly + 60 &&
              boxRect.right <= selection.lx + 40
            ) {
              t.classList.remove('bg-sky-200');
            }
          }
        }
      });
    }
    setMouseDirection(null);
  };

  const handleMouseUp = () => {
    setMouseDirection(null);
    setIsSelecting(false);
  };

  /**
   * background move
   */
  const onContainerMouseDown = (event) => {
    if (event.button != 1) {
      return true;
    }
    event.preventDefault();

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
    <>
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
              selectedItem={selectedWarehouseInfo}
              onChange={(selectedItem) => onSelectWarehouse(selectedItem)}
            />
            <div className="mt-1">
              <span className="text-gray-500">
                Please select the warehouse where you want to place your
                materials
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
              <div
                id="shelf-container"
                className="relative"
                style={{ width: '100%' }}
              >
                <div
                  className="flex flex-row items-end text-center relative"
                  ref={divRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                >
                  {Object.keys(locationDatas).map((key, index) => {
                    return (
                      <>
                        <div
                          key={key}
                          style={{
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
                            {locationDatas[key].map((col, colIndex) => {
                              return (
                                <>
                                  <div
                                    className="shelf-area content-center relative"
                                    id={`${col}`}
                                    key={colIndex}
                                    style={{
                                      height: '60px',
                                      width: '40px',
                                      border: '2px solid #1264FE',
                                    }}
                                    onClick={(event) =>
                                      onShelfClick(event, col)
                                    }
                                  >
                                    {col.replace('-', '')}
                                  </div>
                                </>
                              );
                            })}
                          </div>
                          <div className="font-semibold mt-2">{key}</div>
                        </div>
                      </>
                    );
                  })}
                  {isSelecting && (
                    <div
                      ref={maskRef}
                      style={{
                        position: 'absolute',
                        left: selection.left,
                        top: selection.top,
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
                holding down the middle mouse button.
              </p>
              <p className="text-sm text-gray-600">
                <span className="text-red-500">*</span>You can select multiple
                shelves at the same time with the right mouse button.
              </p>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={msgOpen}
        onRequestClose={() => {
          setMsgOpen(false);
          setErrMsg('');
        }}
        passiveModal
        modalHeading={errMsg}
      />
    </>
  );
};

export default ExpectLocationModal;
