import QRCode from 'qrcode.react';
import { Modal, Heading, Button } from '@carbon/react';
import { Printer } from '@carbon/icons-react';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';

export default function QRCodeGenerate({ texts, isModalOpen, onClose }) {
  let componentRef = useRef();
  return (
    <>
      <Modal
        open={isModalOpen}
        modalHeading="Material Codes"
        passiveModal
        onRequestClose={onClose}
        size="md">
        <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
          <div className="flex flex-row justify-between  align-middle">
            <div> Generated QR Codes.</div>
            <div>
              <ReactToPrint
                trigger={() => (
                  <Button size="sm" renderIcon={Printer}>
                    Print
                  </Button>
                )}
                content={() => componentRef}
              />
            </div>
          </div>
        </Heading>
        <div
          ref={(el) => (componentRef = el)}
          className="flex flex-row flex-wrap gap-6 align-top items-start">
          {texts &&
            texts.map((item, i) => {
              return (
                <div
                  key={i}
                  className="w-fit h-fit border-2 border-black p-1 border-dashed">
                  <QRCode value={item} size={128} />
                  <div className="text-center mt-2 font-semibold">{item}</div>
                </div>
              );
            })}
        </div>
      </Modal>
    </>
  );
}
