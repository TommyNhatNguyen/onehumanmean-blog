import Button from "../../components/Button";
import { PATH } from "../../constant/path";

const NotFound = () => {
  return (
    <div className="mt-[20px] h-full w-full mobile:mt-[30px] tablet:mt-[50px] *:dark:text-white">
      <div className="m-auto flex max-w-fit flex-col items-center gap-[16px] rounded-lg border-2 border-gray-200 p-[32px]">
        <h1 className="text-nowrap text-center font-bold text-h1 uppercase text-black-100">
          page not found
        </h1>
        <Button
          type="button"
          tailClasses="h-[48px] px-[20px] rounded-[8px] bg-purple-300 hover:bg-purple-200 mx-auto"
          link={PATH.BLOG.INDEX}
        >
          Back to home page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
