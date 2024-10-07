import { useEffect, useState } from "react";
import Input from "../../../../../components/Input";
import Button from "../../../../../components/Button";
import ModalPopup from "../../../../../components/ModalPopup";
import { useForm } from "react-hook-form";
import { VALIATION } from "../../../../../constant/validation";
import { message } from "antd";
import { useAppDispatch } from "../../../../../store";
import { changePassword } from "../../../../../store/reducers/authSlices";
import { AxiosError } from "axios";

type FormType = {
  oldPassword: string;
  newPassword: string;
};

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormType>();
  const _onShowPopup = () => {
    setOpen(true);
  };
  const _onHandleSubmit = (payload: FormType) => {
    const { oldPassword, newPassword } = payload || {};
    if (oldPassword === newPassword) {
      message.error("Old password can't be the same as new password");
      reset();
      return;
    }
    // Call API
    dispatch(
      changePassword({
        oldPassword,
        newPassword,
        callback: {
          onSuccess: () => {
            message.success("Change password successful");
          },
          onFail: (error: AxiosError<any, any>) => {
            message.error(error?.response?.data?.message);
          },
        },
      }),
    );
    reset();
  };
  const _onHandleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(false);
  }, [isSubmitting]);
  return (
    <div className="w-full min-w-[25%] max-w-[250px]">
      <div className="flex w-full flex-col gap-[16px]">
        <Input
          label="Old password"
          inputType="password"
          wrapperTailClass="w-full"
          error={errors?.oldPassword?.message}
          {...register("oldPassword", { required: VALIATION.required.message })}
        />
        <Input
          label="New password"
          inputType="password"
          wrapperTailClass="w-full"
          error={errors?.newPassword?.message}
          {...register("newPassword", { required: VALIATION.required.message })}
        />
        <Button onClick={_onShowPopup} tailClasses="w-fit">
          Submit
        </Button>
        <ModalPopup
          open={open}
          handleOk={handleSubmit(_onHandleSubmit)}
          handleCancel={_onHandleCancel}
        >
          <p>Confirm change password?</p>
        </ModalPopup>
      </div>
    </div>
  );
};

export default ChangePassword;
