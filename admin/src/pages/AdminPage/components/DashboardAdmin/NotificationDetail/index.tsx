import { useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";
import { notificationServices } from "../../../../../services/notificationServices";
import moment from "moment";
import Button from "../../../../../components/Button";
import { PATH } from "../../../../../constant/path";

const NotificationDetail = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { data } = useQuery({
    queryKey: [questionId],
    queryFn: () => notificationServices.getNotificationById(`/${questionId}`),
  });
  const { created_at, email, answer, question, answered_at } =
    data?.data?.data || {};
  const formatedCreatedAt = moment(created_at).format("DD-MM-YYYY, h:mm a");
  const formatedAnswerAt = moment(answered_at).format("DD-MM-YYYY, h:mm a");
  const _onBackToNoti = () => {
    navigate(PATH.ADMIN.NOTIFICATION.INDEX);
  };
  return (
    <div className="h-full w-full">
      <div className="mb-[16px]">
        <div className="mb-[16px] max-w-[700px]">
          <h2 className="font-bold text-h2-sm text-black-200">
            Questions: {question}
          </h2>
          <p>From: {email}</p>
          <p>Sent at: {formatedCreatedAt}</p>
          <p>Answered at: {formatedAnswerAt}</p>
        </div>
        <hr />
        <div className="mt-[16px] max-w-[700px]">
          <h2 className="mb-[8px] font-bold text-h2-sm text-black-200">
            Answers:
          </h2>
          <div
            className="notidetail-content"
            dangerouslySetInnerHTML={{ __html: answer }}
          ></div>
        </div>
      </div>
      <Button onClick={_onBackToNoti}>Back to notifications</Button>
    </div>
  );
};

export default NotificationDetail;
