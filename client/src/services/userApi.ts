import API from './axios';

export async function updateUserInfo(userId: string, data:any) {
  const res = await API.patch(`/api/user/${userId}`, data);
  return res.data;
}

interface ChangePasswordData {
  authorId: string;
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordData) => {
  const response = await API.patch('/user/password', data);
  return response.data;
};
export const getUserBlogs = async () => {
  const res = await API.get('/user/blogs');
  return res.data;
};
