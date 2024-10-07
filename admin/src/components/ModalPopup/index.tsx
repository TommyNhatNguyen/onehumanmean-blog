import { Modal, ModalProps } from "antd";
import { ReactNode, useState } from "react";

type ModalPopupType = {
  handleOk: (arg1?: any) => void;
  handleCancel: () => void;
  open: boolean;
  children: ReactNode;
  title?: string;
  width?: string | number;
} & ModalProps;

const ModalPopup = ({
  handleOk,
  handleCancel,
  open,
  children,
  title,
  width,
  ...props
}: ModalPopupType) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const _onHandleOk = () => {
    setConfirmLoading(true);
    handleOk();
    setConfirmLoading(false);
  };
  const _onHandleCancel = () => {
    handleCancel();
  };
  return (
    <Modal
      width={width}
      title={title}
      open={open}
      onOk={_onHandleOk}
      onCancel={_onHandleCancel}
      confirmLoading={confirmLoading}
      mask={false}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default ModalPopup;
