import Button from "../Button";
import Input from "../Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { VALIATION } from "../../constant/validation";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constant/path";
import { useAppDispatch } from "../../store";
import { loginAdmin } from "../../store/reducers/authSlices";
import { useEffect } from "react";

type LoginInputType = {
  email: string;
  password: string;
};

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputType>();
  const _onSubmit: SubmitHandler<LoginInputType> = (data) => {
    dispatch(
      loginAdmin({
        ...data,
        options: {
          onSuccess: () => {
            message.success("Login successful");
            reset();
            navigate(PATH.ADMIN.BLOGS);
          },
          onFail: (error: any) => {
            reset();
            message.error(error.response.data.message);
          },
        },
      }),
    );
  };
  useEffect(() => {
    reset({ email: "demoaccount@gmail.com", password: "demo123" });
  }, []);
  return (
    <div className="fixed left-0 top-0 flex h-lvh w-full items-center justify-center">
      <div className="min-h-[400px] w-[50%] min-w-[400px] max-w-[500px] rounded-[24px] bg-sky-100 px-[32px] py-[16px] shadow-md">
        <h2 className="text-center font-semibold text-h2 capitalize text-black-100">
          Admin Dashboard
        </h2>
        <div className="mb-[16px] mt-[12px] h-[2px] w-full rounded-full bg-sky-200"></div>
        <form
          action="#"
          method="POST"
          className="flex flex-col items-start gap-[16px]"
          onSubmit={handleSubmit(_onSubmit)}
        >
          <Input
            label="Email"
            inputType="text"
            placeholder="Email"
            {...register("email", {
              required: VALIATION.required.message,
              pattern: {
                value: VALIATION.email.validateRe,
                message: VALIATION.email.message,
              },
            })}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            inputType="password"
            placeholder="Password"
            {...register("password", {
              required: VALIATION.required.message,
            })}
            error={errors.password?.message}
          />
          <Button onClick={() => {}} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
