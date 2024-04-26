import { Modal, ComboBox, Tag, MultiSelect } from '@carbon/react';
import { useEffect, useState } from 'react';

export default function AssignModal({ isOpen, onClose, onConfirm }) {
  const [msgOpen, setMsgOpen] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [selectedResources, setSelectedResources] = useState([]);
  const [worker, setWorker] = useState([]);
  const [resource, setRource] = useState([]);

  useEffect(() => {
    let resources = [];
    let workers = [];
    for (let i = 0; i < 5; i++) {
      resources.push(`Tray-${i}`);
      workers.push(`Worker-${i}`);
    }
    setWorker(workers);
    setRource(resources);
  }, []);

  const tagColors = [
    'red',
    'magenta',
    'purple',
    'blue',
    'cyan',
    'teal',
    'green',
    'gray',
    'cool-gray',
    'outline',
  ];

  const onSelectWorker = (item) => {};
  const onSelectResource = (item) => {
    setSelectedResources(item.selectedItems);
    console.log(item, selectedResources);
  };

  const handleCancelClicked = () => {
    onClose();
  };

  const handleSubmit = async () => {
    onConfirm();
  };

  return (
    <>
      <Modal
        open={isOpen}
        modalHeading="Assign To"
        modalLabel=""
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
        isFullWidth={true}
        size="sm"
      >
        <div className="p-3 pb-12">
          <div style={{ width: '70%' }}>
            <ComboBox
              titleText="Worker"
              items={worker}
              itemToString={(item) => (item ? item : '')}
              placeholder="Choose worker"
              onChange={(selectedItem) => onSelectWorker(selectedItem)}
            />
            <MultiSelect
              label="Multiselect Label"
              titleText="Resource"
              items={resource}
              itemToString={(item) => (item ? item : '')}
              selectionFeedback="top-after-reopen"
              onChange={(selectedItem) => onSelectResource(selectedItem)}
            />
            <div className="mt-2">
              {selectedResources?.map((item, index) => {
                return (
                  <Tag
                    key={index}
                    type={tagColors[index % tagColors.length]}
                    className="ml-0"
                  >
                    <div className="flex w-10 justify-center">{item}</div>
                  </Tag>
                );
              })}
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
}
