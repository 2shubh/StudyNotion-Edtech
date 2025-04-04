import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api/v1",
});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}


// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/api/v1", // Make sure this is correct
// });

// export const apiConnector = (method, url, bodyData, headers, params) => {
//   return axiosInstance({
//     method: method,
//     url: url, // This should be a valid endpoint
//     data: bodyData || null,
//     headers: headers || null,
//     params: params || null,
//   });
// };
