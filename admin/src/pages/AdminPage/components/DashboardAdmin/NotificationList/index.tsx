import { Empty, Spin, message } from "antd";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import ModalPopup from "../../../../../components/ModalPopup";
import Editor from "../../../../../components/Editor";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import {
  deleteNotification,
  updateNotification,
} from "../../../../../store/reducers/notiSlices";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../../constant/path";
type modalType = {
  notiId: any;
  email: string;
  question: string;
};
const NotificationList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState<modalType>({
    notiId: "",
    email: "",
    question: "",
  });
  const { notifications, loading } = useAppSelector(
    (state) => state.notiReducers,
  );
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(
    "<p></p> <p>Yours sincerely,</p> <p>Nguyen Anh Nhat</p>",
  );
  useEffect(() => {
    setContent("<p></p> <p>Yours sincerely,</p> <p>Nguyen Anh Nhat</p>");
  }, []);
  const _onShowModal = (notiId: any, email: any, question: any) => {
    setModal({ notiId, email, question });
    setOpen(true);
  };
  const _onCancelAnswer = () => {
    setOpen(false);
  };
  const _onAnswer = async (id: number) => {
    const payload = {
      questionId: id,
      answer: content,
      callback: {
        onSuccess: () => {
          message.success("Answered has been sent!");
        },
        onFail: (error: any) => {
          message.error(error?.response?.data?.message);
        },
      },
    };
    dispatch(updateNotification(payload));
    setOpen(false);
  };
  const _onDeleteNotification = (id: number) => {
    const payload = {
      questionId: id,
      callback: {
        onSuccess: () => {
          message.success("Notification deleted!");
        },
        onFail: (error: any) => {
          message.error(error?.response?.data?.message);
        },
      },
    };
    dispatch(deleteNotification(payload));
  };
  const _onContentChange = (value: string) => {
    setContent(value);
  };
  const _onShowAnswers = (id: number) => {
    navigate(`${PATH.ADMIN.NOTIFICATION.INDEX}/${id}`);
  };
  return (
    <div className="blogadmin-table relative w-full overflow-x-scroll">
      <ModalPopup
        width={700}
        open={open}
        handleOk={() => _onAnswer(modal.notiId)}
        handleCancel={_onCancelAnswer}
        title="Answer questions"
      >
        <h3 className="mb-[8px] text-tag text-black-200">
          Write answer to {modal.email} for post {modal.notiId}
        </h3>
        <p>{modal.question}</p>
        <div className="ckeditor">
          <Editor
            handleChange={_onContentChange}
            initialData={content}
            initialDataLoading={false}
            itemSlug={modal.notiId}
          />
        </div>
      </ModalPopup>
      {loading && (
        <div className="flex min-h-[170px] w-full items-center justify-center overflow-hidden rounded-[16px] border-[1px] border-black-100 bg-white">
          <Spin />
        </div>
      )}
      {!loading && (
        <table className="relativ min-h-[170px] w-full border-collapse overflow-hidden rounded-[16px] border-[1px] border-black-100 bg-white">
          <thead>
            <tr className="border-[1px] border-b-black-100">
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
                colSpan={2}
              >
                Id
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
                colSpan={2}
              >
                email
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
                colSpan={2}
              >
                created at
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
                colSpan={3}
              >
                question
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
                colSpan={2}
              >
                status
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {!loading && notifications?.length < 1 && (
              <tr className="border-[1px] border-black-100 odd:bg-white even:bg-blue-100">
                <td colSpan={100} className="px-[6px] py-[6px]">
                  <Empty
                    description="No notification found"
                    className="h-full w-full"
                  />
                </td>
              </tr>
            )}

            {notifications?.map((item: any, index: any) => {
              const {
                id: notiId,
                created_at: createdAt,
                question,
                email,
                is_answer,
              } = item || {};
              const formatCreateAt = moment(createdAt).format("DD-MM-YYYY");
              return (
                <tr
                  key={notiId || index}
                  className={clsx(
                    "border-[1px] border-black-100 odd:bg-white even:bg-blue-100",
                  )}
                >
                  <th scope="row">{notiId}</th>
                  <td colSpan={2} className="px-[6px] py-[6px]">
                    <p className="break-all text-center text-tag">{email}</p>
                  </td>
                  <td colSpan={2} className="px-[6px] py-[6px]">
                    <p className="text-center text-tag">{formatCreateAt}</p>
                  </td>
                  <td className="px-[6px] py-[6px]" colSpan={4}>
                    <p className="text-justify text-tag">{question}</p>
                  </td>
                  <td colSpan={2} className="px-[6px] py-[6px]">
                    <div className="flex flex-col gap-[4px]">
                      {!is_answer && (
                        <Button
                          onClick={() => _onShowModal(notiId, email, question)}
                          tailClasses={clsx(
                            "w-full h-[24px] hover:bg-green-200 bg-[rgba(2,122,72,0.8)]",
                          )}
                        >
                          Pending
                        </Button>
                      )}
                      {is_answer && (
                        <Button
                          onClick={() => _onShowAnswers(notiId)}
                          tailClasses={clsx(
                            "w-full h-[24px] hover:bg-gray-100 bg-gray-200",
                          )}
                        >
                          Answered
                        </Button>
                      )}
                      <Button
                        onClick={() => _onDeleteNotification(notiId)}
                        tailClasses="w-full h-[24px] hover:bg-red-200 bg-[rgba(193,21,116,0.8)]"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NotificationList;
