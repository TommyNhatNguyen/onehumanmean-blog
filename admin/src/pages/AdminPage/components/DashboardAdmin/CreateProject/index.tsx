import { useEffect, useState } from "react";
import Input from "../../../../../components/Input";
import SelectComponent from "../../../../../components/SelectComponent";
import Editor from "../../../../../components/Editor";
import UploadImage from "../../../../../components/UploadImage";
import { Empty, Spin, UploadProps, message } from "antd";
import {
  AUTHOR_OPTIONS,
  CATEGORY_OPTIONS,
  POSITION_OPTIONS,
} from "../../../../../constant/admin";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../store";
import { PATH } from "../../../../../constant/path";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import tokenMethod from "../../../../../utils/tokenMethod";
import ModalPopup from "../../../../../components/ModalPopup";
import {
  createProject,
  updateProjectById,
} from "../../../../../store/reducers/projectSlices";
import { projectServices } from "../../../../../services/projectServices";
import Button from "../../../../../components/Button";
import { ENV } from "../../../../../constant/environments";

const CreateProject = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { projectSlug } = useParams();
  const {
    data: projectSingle,
    error,
    isPending,
  } = useQuery<any>({
    queryKey: [projectSlug],
    queryFn: () => projectServices.getProjectsById(projectSlug),
    initialData: {},
  });
  const { author, category, content, position, thumbnail_url, title } =
    projectSingle?.data?.data ?? {};
  const [form, setForm] = useState({
    title: "",
    author: "",
    position: "",
    category: [],
    content: "",
    thumbnailUrl: "",
  });
  const dragProps: UploadProps = {
    name: "file",
    multiple: false,
    listType: "picture-card",
    maxCount: 1,
    accept: ".png, .jpeg, .jpg",
    action: `${ENV.BASE_URL}admin/uploads`,
    headers: { Authorization: `Bearer ${tokenMethod?.get()?.accessToken}` },
    onPreview: () => {
      window.open(form.thumbnailUrl);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setForm((prev) => {
          return { ...prev, thumbnailUrl: info.file.response };
        });
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        info.file.error.status === 403 &&
          message.error(info.file.response.message);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const _onSelectPosition = (value: string) => {
    setForm((prev) => {
      return { ...prev, position: value };
    });
  };
  const _onSelectCategory = (value: string) => {
    setForm((prev: any) => {
      return { ...prev, category: [...value] };
    });
  };
  const _onSelectAuthor = (value: string) => {
    setForm((prev) => {
      return { ...prev, author: value };
    });
  };
  const _onContentChange = (value: string) => {
    setForm((prev) => {
      return { ...prev, content: value };
    });
  };
  const _onTitleChange = (value: string) => {
    setForm((prev) => {
      return { ...prev, title: value };
    });
  };
  const _onSubmit = () => {
    if (form.title === "") {
      message.error("Please fill in title field");
    }
    if (form.category.length === 0) {
      message.error("Please choose a category");
    } else if (form.category.length > 7) {
      message.error("Max category");
    }
    if (form.content === "") {
      message.error("Please fill in content");
    }
    if (form.thumbnailUrl === "") {
      message.error("Please choose a thumbnail");
    }
    if (
      form.title !== "" &&
      form.category.length !== 0 &&
      form.content !== "" &&
      form.thumbnailUrl !== ""
    ) {
      const _payload = {
        title: form.title || "",
        author: form.author || "",
        position: form.position || "",
        category: form.category.join(","),
        content: form.content || "",
        thumbnailUrl: form.thumbnailUrl || "",
      };
      // Call apis
      dispatch(createProject(_payload));
      // Redirect to project page
      navigate(PATH.ADMIN.PROJECTS);
    }
  };
  const _onUpdatePopup = () => {
    setOpen(true);
  };
  const _onUpdateCancel = () => {
    setOpen(false);
  };
  const _onUpdate = () => {
    if (form.title === "") {
      message.error("Please fill in title field");
    }
    if (form.category.length === 0) {
      message.error("Please choose a category");
    }
    if (form.content === "") {
      message.error("Please fill in content");
    }
    if (form.thumbnailUrl === "") {
      message.error("Please choose a thumbnail");
    }
    if (
      form.title !== "" &&
      form.category.length !== 0 &&
      form.content !== "" &&
      form.thumbnailUrl !== ""
    ) {
      const _payload = {
        title: form.title || "",
        author: form.author || "",
        position: form.position || "",
        category: form.category.join(","),
        content: form.content || "",
        thumbnail_url: form.thumbnailUrl || "",
      };
      // Call apis
      dispatch(updateProjectById({ projectId: projectSlug, ..._payload }));
      setOpen(false);
      // Redirect to project page
      navigate(PATH.ADMIN.PROJECTS);
    }
  };
  const _onCancel = () => {
    navigate(PATH.ADMIN.PROJECTS);
  };
  useEffect(() => {
    if (projectSlug) {
      queryClient.resetQueries(
        {
          queryKey: [projectSlug],
        },
        { cancelRefetch: false },
      );
    }
  }, []);
  useEffect(() => {
    if (projectSingle?.data?.data) {
      setForm({
        title: title || "",
        author: author || "",
        position: position || "",
        category: category?.split(",") || [],
        content: content || "",
        thumbnailUrl: thumbnail_url || "",
      });
    }
  }, [projectSlug, projectSingle?.data?.data]);
  return (
    <div className="relative h-full w-full flex-shrink">
      {isPending && !error && (
        <div className="absolute left-0 top-0 flex h-full min-h-[300px] w-full items-center justify-center">
          <Spin className="z-10" />
        </div>
      )}
      {error && <Empty description="Something went wrong, try refresh page" />}
      <div className="mb-[16px] flex items-center gap-[8px]">
        <h2 className="font-semibold text-h2-sm text-black-100">Title:</h2>
        <Input
          onChange={(e) => _onTitleChange(e.target.value)}
          defaultValue={form.title}
          placeholder="Title"
        />
      </div>
      <div className="mb-[16px] flex items-center gap-[8px]">
        <div>
          <h2 className="font-semibold text-h2-sm text-black-100">Author</h2>
          <SelectComponent
            handleChange={_onSelectAuthor}
            value={form.author}
            options={AUTHOR_OPTIONS}
            width="fit-content"
            styles={{ minWidth: "120px", marginTop: "8px" }}
          />
        </div>
        <div>
          <h2 className="font-semibold text-h2-sm text-black-100">Position</h2>
          <SelectComponent
            handleChange={_onSelectPosition}
            value={form.position}
            options={POSITION_OPTIONS}
            width="fit-content"
            styles={{ minWidth: "120px", marginTop: "8px" }}
          />
        </div>
        <div>
          <h2 className="font-semibold text-h2-sm text-black-100">Category</h2>
          <SelectComponent
            value={form.category}
            handleChange={_onSelectCategory}
            options={CATEGORY_OPTIONS}
            mode="tags"
            tokenSeparators={[","]}
            popupMatchSelectWidth={false}
            width="fit-content"
            styles={{ minWidth: "120px", marginTop: "8px" }}
          />
        </div>
      </div>
      <div className="mb-[16px]">
        <h2 className="font-semibold text-h2-sm text-black-100">Content</h2>
        <div className="ckeditor mt-[8px] min-w-[600px] max-w-[1017px]">
          <Editor
            itemSlug={projectSlug}
            initialData={content}
            initialDataLoading={isPending}
            handleChange={_onContentChange}
          />
        </div>
      </div>
      <div className="mb-[16px]">
        <h2 className="font-semibold text-h2-sm text-black-100">
          Upload thumbnail
        </h2>
        <UploadImage dragProps={dragProps} />
      </div>
      {projectSlug ? (
        <>
          <ModalPopup
            open={open}
            handleCancel={_onUpdateCancel}
            handleOk={_onUpdate}
          >
            Confirm update?
          </ModalPopup>
          <Button
            onClick={_onUpdatePopup}
            tailClasses="h-[42px] px-[24px] hover:bg-green-200 bg-[rgba(2,122,72,0.8)] mr-[8px]"
          >
            Update
          </Button>
          <Button
            onClick={_onCancel}
            tailClasses="h-[42px] px-[24px] hover:bg-red-200 bg-[rgba(193,21,116,0.8)]"
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button onClick={_onSubmit} tailClasses="h-[42px] px-[24px]">
          Submit
        </Button>
      )}
    </div>
  );
};

export default CreateProject;
