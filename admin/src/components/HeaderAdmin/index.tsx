import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../constant/path";
import Input from "../Input";
import { BiBell, BiSearch } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import Container from "../Container";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "../../store";
import { logoutAdmin } from "../../store/reducers/authSlices";
import { SubmitHandler, useForm } from "react-hook-form";
import { VALIATION } from "../../constant/validation";
import { message } from "antd";

type FormValues = {
  search: string;
};

const HeaderAdmin = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notifications } = useAppSelector((state) => state.notiReducers);
  const totalNotiNotAnswer = notifications?.filter(
    (item: any) => !item.is_answer,
  )?.length;
  const { username } = useAppSelector((state) => state.authReducers);
  const _onLogout = () => {
    dispatch(logoutAdmin());
    navigate(PATH.ADMIN.LOGIN);
  };
  const _onSearch: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    message.warning("Feature is developing");
  };
  return (
    <Container tailStyles="border-b-[1px] border-gray-100">
      <header className="flex w-full max-w-maxWidthPage items-center justify-between py-[16px]">
        <div className="flex items-center gap-[16px]">
          <Link
            to={PATH.ADMIN.INDEX}
            className="flex flex-shrink-0 items-center"
          >
            <div className="h-[32px] w-[32px]">
              <img src="/images/admin-logo.png" alt="admin logo" />
            </div>
            <h1 className="font-bold text-h2-sm text-black-200">
              One human mean
            </h1>
          </Link>
          <form
            action="#"
            className="relative flex flex-grow"
            onSubmit={handleSubmit(_onSearch)}
          >
            <Input
              placeholder="Search"
              type="text"
              {...register("search", { required: VALIATION.required.message })}
            />
            <div className="absolute right-[6px] top-[54%] flex h-[20px] w-[20px] translate-y-[-50%]">
              <BiSearch className="h-full w-full" />
            </div>
          </form>
        </div>
        <div className="relative flex items-center gap-[16px]">
          <Link
            to={PATH.ADMIN.NOTIFICATION.INDEX}
            className="relative h-[20px] w-[20px]"
          >
            <BiBell className="h-full w-full" />
            {totalNotiNotAnswer > 0 && (
              <div className="absolute right-[-9px] top-[-13px] flex aspect-square w-[24px] items-center justify-center rounded-full bg-red-200 text-tag text-white">
                {totalNotiNotAnswer}
              </div>
            )}
          </Link>
          <Link
            to={PATH.ADMIN.PROFILE}
            className="group flex items-center gap-[8px]"
          >
            <div className="aspect-square w-[32px] flex-shrink-0 overflow-hidden rounded-full border-[1px] border-gray-100">
              <img
                src="https://fastly.picsum.photos/id/315/200/300.jpg?hmac=C67WPcnxkaV_SPowHi-8nl3yoODZSBZqnoOdBObP5Ys"
                alt="profile image"
                className="object-cover"
              />
            </div>
            <p className="text-tag duration-150 group-hover:text-black-100">
              {username || "Admin"}
            </p>
            <IoMdArrowDropdown />
          </Link>
          <Button
            onClick={_onLogout}
            tailClasses="bg-gray-200 hover:bg-gray-100"
          >
            Logout
          </Button>
        </div>
      </header>
    </Container>
  );
};

export default HeaderAdmin;
