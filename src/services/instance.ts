import envConfig from '@/config';
import { getLocalAccessToken, getLocalRefreshToken, updateLocalAccessToken } from './token';

const apiUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT;

interface FetchOptions extends RequestInit {
  retry?: boolean; // Thêm thuộc tính để kiểm tra retry giống axios _retry
}

// Hàm xử lý fetch với interceptor tương tự axios
const fetchInstance = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  // Add base URL to the request
  const fullUrl = `${apiUrl}${url}`;

  // Add token to headers if available
  const token = getLocalAccessToken();
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.append('x-access-token', token);
  }

  // Cập nhật headers trong options
  options.headers = headers;

  try {
    const response = await fetch(fullUrl, options);

    // Check if the response is OK (status 2xx)
    if (!response.ok) {
      if (response.status === 401 && !options.retry) {
        // Handle token expiration (401 Unauthorized)
        options.retry = true; // Đánh dấu là đã retry một lần
        const refreshToken = getLocalRefreshToken();

        if (refreshToken) {
          const refreshResponse = await fetchInstance<{ accessToken: string }>('/api/v1/auth/refreshtoken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          const { accessToken } = refreshResponse;
          updateLocalAccessToken(accessToken); // Cập nhật token mới vào localStorage

          // Gọi lại request gốc với token mới
          headers.set('x-access-token', accessToken);
          options.headers = headers;

          return await fetchInstance<T>(url, options); // Thực hiện lại request
        }
      } else if (response.status === 403 && !options.retry) {
        // Bạn có thể redirect đến trang login nếu cần
        window.location.href = "/login";
      } else {
        // Nếu không phải lỗi 401/403, throw error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    // Parse và trả về dữ liệu JSON
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchInstance;