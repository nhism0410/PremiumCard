import Web3 from 'web3';

// Hàm này sẽ trả về một Promise chứa một instance của Web3
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Kiểm tra xem trình duyệt có hỗ trợ Web3 không
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Yêu cầu quyền truy cập tài khoản người dùng (nếu chưa được cấp)
        window.ethereum.enable().then(() => {
          resolve(web3);
        });
      } catch (error) {
        reject(error);
      }
    }
    // Nếu trình duyệt không hỗ trợ Web3 hoặc không có MetaMask
    else {
      reject('Please install MetaMask extension to use Web3.');
    }
  });
};

export default getWeb3;
