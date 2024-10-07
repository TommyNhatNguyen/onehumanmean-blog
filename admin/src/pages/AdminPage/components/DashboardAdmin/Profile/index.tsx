import { Spin } from "antd";
import { useAppSelector } from "../../../../../store";

const Profile = () => {
  const { username, loading } = useAppSelector((state) => state.authReducers);
  return (
    <div className="h-full w-full">
      {loading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-white dark:bg-black-200">
          <Spin className="z-10" size="large" />
        </div>
      )}
      {!loading && username && (
        <div className="flex items-start gap-[16px]">
          <div className="aspect-square w-[96px] overflow-hidden rounded-full shadow-sm">
            <img
              className="object-cover"
              src="https://fastly.picsum.photos/id/315/200/300.jpg?hmac=C67WPcnxkaV_SPowHi-8nl3yoODZSBZqnoOdBObP5Ys"
              alt="profile image"
            />
          </div>
          <h2 className="font-bold text-h2 text-black-100">{username || ""}</h2>
        </div>
      )}
    </div>
  );
};

export default Profile;
