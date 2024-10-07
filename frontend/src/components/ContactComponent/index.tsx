import clsx from "clsx";
import Input from "../Input";
import Button from "../Button";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { VALIATION } from "../../constant/validation";
import { message } from "antd";
import { createNotification } from "../../store/reducers/notiSlices";
import { useAppDispatch } from "../../store";

type ContactComponentType = { tailClasses?: string };
type InputContactType = { contact: string; question: string };

const ContactComponent = ({ tailClasses }: ContactComponentType) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputContactType>();
  const _onContact: SubmitHandler<InputContactType> = (data) => {
    const payload = { email: data?.contact, question: data?.question };
    dispatch(createNotification(payload));
    message.success("Thank you for connecting, I will response soon!");
    reset();
  };
  return (
    <div
      className={clsx("flex flex-col items-center justify-center", tailClasses)}
    >
      <p className="text-center font-semibold text-purple-300">Contact</p>
      <h2 className="mb-[24px] mt-[12px] text-center font-semibold text-h1-sm text-black-100 dark:text-white">
        Contact me
      </h2>
      <p className="text-center text-body-big dark:text-white">
        I’d love to hear from you! Whether you have a question, feedback, or
        just want to connect, feel free to reach out.
      </p>
      <form
        className="mt-[40px]"
        action="#"
        method="POST"
        onSubmit={handleSubmit(_onContact)}
      >
        <div className="flex flex-col items-start justify-center gap-[16px] tablet:flex-row tablet:items-end">
          <Input
            {...register("contact", {
              required: VALIATION.required.message,
              pattern: {
                value: VALIATION.email.validateRe,
                message: VALIATION.email.message,
              },
            })}
            label="Contact Email"
            error={errors?.contact?.message as string}
            wrapperTailClass="h-[48px] rounded-[8px] border-blue-light-300 px-[16px] py-[12px] w-full min-w-[320px]"
            placeholder="Your email here..."
          />
          <Input
            {...register("question", { required: VALIATION.required.message })}
            error={errors?.question?.message as string}
            label="Your Question"
            wrapperTailClass="h-[48px] rounded-[8px] border-blue-light-300 px-[16px] py-[12px] w-full min-w-[320px]"
            placeholder="Make question concise..."
          />
          <Button
            type="submit"
            tailClasses="h-[48px] px-[20px] rounded-[8px] bg-purple-300 hover:bg-purple-200"
          >
            Contact
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactComponent;
