// utils/response.ts

export const successResponse = (message: string, data: any = null) => {
  return {
    status: true,
    message: message,
    data: data,
  };
};

export const errorResponse = (message: string) => {
  return {
    status: false,
    message: message,
  };
};
