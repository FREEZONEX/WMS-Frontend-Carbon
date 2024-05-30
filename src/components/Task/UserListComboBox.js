import { useState, useEffect } from 'react';
import { getUsers } from '@/actions/actions';
import { ComboBox } from '@carbon/react';

export default function UserListComboBox({ defaultValue, onChange }) {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      if (res) {
        setWorkers(res.map((t) => t.personname));
      }
    });
  }, []);

  const onSelectWorker = (event) => {
    if (onChange) {
      onChange({ selectedItem: event.selectedItem });
    }
  };
  return (
    <>
      <ComboBox
        titleText="Worker"
        items={workers}
        itemToString={(item) => (item ? item : '')}
        selectedItem={defaultValue}
        placeholder="Choose worker"
        onChange={(selectedItem) => onSelectWorker(selectedItem)}
      />
    </>
  );
}
