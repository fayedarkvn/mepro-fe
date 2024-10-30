import { notification } from "antd";

export const useMessage = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (description: any) => {
    api.open({
      message: "Error!",
      description: description,
      showProgress: true,
      pauseOnHover: false,
    });
  };

  return {
    contextHolder,
    openNotification,
  };
};
