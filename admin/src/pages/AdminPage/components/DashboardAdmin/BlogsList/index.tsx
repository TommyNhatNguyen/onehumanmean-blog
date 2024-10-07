import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../../../../constant/path";
import CategoryTagComponent from "../../../../../components/CategoryTagComponent";
import Button from "../../../../../components/Button";
import SelectComponent from "../../../../../components/SelectComponent";
import {
  deleteBlogById,
  updateBlogById,
} from "../../../../../store/reducers/blogSlices";
import { useAppDispatch, useAppSelector } from "../../../../../store";
import { POSITION_OPTIONS } from "../../../../../constant/admin";
import { Empty, Spin } from "antd";
import moment from "moment";
import clsx from "clsx";
import ModalPopup from "../../../../../components/ModalPopup";
import { useState } from "react";

const BlogsList = () => {
  const [modal, setModal] = useState({ blogId: "" });
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useAppSelector((state) => state.blogReducers);
  const _onSelectPosition = (position: string, blogId: string) => {
    const _payload = { blogId: blogId, position: position };
    dispatch(updateBlogById(_payload));
  };
  const _onShowDeleteModal = (id: string) => {
    setOpen(true);
    setModal({ blogId: id });
  };
  const _onCancelDeletePost = () => {
    setOpen(false);
  };
  const _onDeletePost = (blogId: string) => {
    dispatch(deleteBlogById({ blogId: blogId }));
    setOpen(false);
  };

  const _onHidePost = (blogId: string, hideStatus: boolean) => {
    const _payload = { blogId: blogId, hidden: !hideStatus };
    dispatch(updateBlogById(_payload));
  };
  const _onEditPost = (blogPath: string) => {
    navigate(blogPath);
  };

  return (
    <div className="blogadmin-table relative w-full overflow-x-scroll">
      <ModalPopup
        open={open}
        handleOk={() => _onDeletePost(modal.blogId)}
        handleCancel={_onCancelDeletePost}
      >
        Confirm delete post {modal.blogId}
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
              >
                Id
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Created Date
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Latest Update
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Author
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Category
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Position
              </th>
              <th
                scope="col"
                className="text-nowrap px-[16px] py-[8px] text-center font-semibold capitalize text-black-100"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {blogs?.length < 1 && !loading && (
              <tr className="border-[1px] border-black-100 odd:bg-white even:bg-blue-100">
                <td colSpan={100} className="px-[6px] py-[6px]">
                  <Empty
                    description="No blogs found"
                    className="h-full w-full"
                  />
                </td>
              </tr>
            )}
            {blogs?.map((item, index) => {
              const {
                id,
                author,
                category,
                position,
                title,
                created_at: createdAt,
                thumbnail_url: thumbnailUrl,
                updated_at: updatedAt,
                hidden,
              } = item || {};
              const formatCreateAt = moment(createdAt).format("DD-MM-YYYY");
              const formatUpadtedAt = moment(updatedAt).format("DD-MM-YYYY");
              const categoryList = category.split(",");
              const blogPath = PATH.ADMIN.CREATE_BLOG + `/${id}`;
              return (
                <tr
                  key={id || index}
                  className={clsx(
                    "border-[1px] border-black-100 odd:bg-white even:bg-blue-100",
                    hidden && "opacity-50",
                  )}
                >
                  <th scope="row">{id}</th>
                  <td className="px-[6px] py-[6px]">
                    <Link
                      className="group flex aspect-square min-h-[100px] overflow-hidden rounded-[8px]"
                      to={blogPath}
                    >
                      <img
                        src={thumbnailUrl}
                        alt="blog img"
                        className="h-[initial] object-cover duration-150 group-hover:scale-110"
                      />
                    </Link>
                  </td>
                  <td className="px-[6px] py-[6px]">
                    <h2 className="line-clamp-3 font-semibold duration-150 hover:text-black-100">
                      <Link to={blogPath}>{title}</Link>
                    </h2>
                  </td>
                  <td className="px-[6px] py-[6px]">
                    <p className="text-center text-tag">{formatCreateAt}</p>
                  </td>
                  <td className="px-[6px] py-[6px]">
                    <p className="text-center text-tag">{formatUpadtedAt}</p>
                  </td>
                  <td className="px-[6px] py-[6px]">
                    <p className="text-center text-tag">{author}</p>
                  </td>
                  <td className="px-[6px] py-[6px]">
                    <CategoryTagComponent tags={categoryList} />
                  </td>
                  <td className="px-[6px] py-[6px]">
                    <SelectComponent
                      value={position}
                      handleChange={(position) =>
                        _onSelectPosition(position, id)
                      }
                      options={POSITION_OPTIONS}
                    />
                  </td>
                  <td className="px-[6px] py-[6px]">
                    <div className="flex flex-col gap-[4px]">
                      <Button
                        onClick={() => _onEditPost(blogPath)}
                        tailClasses="w-full h-[24px] hover:bg-green-200 bg-[rgba(2,122,72,0.8)]"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => _onHidePost(id, hidden)}
                        tailClasses={clsx(
                          "w-full h-[24px]",
                          hidden && "bg-gray-200",
                        )}
                      >
                        {hidden ? "Unhide" : "Hide"}
                      </Button>
                      <Button
                        onClick={() => _onShowDeleteModal(id)}
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

export default BlogsList;
