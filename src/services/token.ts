// Định nghĩa kiểu cho dữ liệu người dùng lưu trữ trong localStorage
interface User {
    accessToken: string;
    refreshToken: string;
    [key: string]: any;
}
  
  // Hàm lấy refreshToken từ localStorage
  export const getLocalRefreshToken = (): string | null => {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User).refreshToken : null;
  };
  
  // Hàm lấy accessToken từ localStorage
  export const getLocalAccessToken = (): string | null => {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User).accessToken : null;
  };
  
  // Hàm cập nhật accessToken vào localStorage
  export const updateLocalAccessToken = (token: string): void => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user) as User;
      parsedUser.accessToken = token;
      localStorage.setItem("user", JSON.stringify(parsedUser));
    }
  };
  
  // Hàm lấy thông tin user từ localStorage
  export const getUser = (): User | null => {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User) : null;
  };
  
  // Hàm lưu thông tin user vào localStorage
  export const setUser = (user: User): void => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  // Hàm xoá thông tin user khỏi localStorage
  export const removeUser = (): void => {
    localStorage.removeItem("user");
  };  