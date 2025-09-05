export const authorize = (email, password) => {
  console.log(`Simulating login for: ${email}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({ token: "a-fake-jwt-token-from-the-server" });
      } else {
        reject(new Error("Email and password are required."));
      }
    }, 500);
  });
};

export const checkToken = (token) => {
  console.log(`Simulating token check for: ${token}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (token === "a-fake-jwt-token-from-the-server") {
        resolve({
          data: {
            name: "Elise",
            email: "elise@example.com",
            _id: "fake-user-id-12345",
          },
        });
      } else {
        reject(new Error("Invalid token."));
      }
    }, 500);
  });
};
