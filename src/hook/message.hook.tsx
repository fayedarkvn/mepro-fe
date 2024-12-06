import { notification } from 'antd';

export function useMessage() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (description: any) => {
    api.open({
      message: 'Error!',
      description,
      showProgress: true,
      pauseOnHover: false,
    });
  };

  return {
    contextHolder,
    openNotification,
  };
}
