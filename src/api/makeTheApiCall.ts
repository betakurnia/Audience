import axios from "axios";

const token =
  "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYWI4OWUyNWUtNWEyYy00NTU1LThjYjUtNTcxMTYwNmM2ZWQxIiwidXNlcm5hbWUiOiJ6b29tZGVtbzIiLCJ0ZWFtSWQiOiI0ZDhkM2ZiYi05MDliLTRjOTgtYmM4Yy1lYmFjMjFkZjY3MDciLCJ0ZWFtT3duZXIiOiJhYjg5ZTI1ZS01YTJjLTQ1NTUtOGNiNS01NzExNjA2YzZlZDEiLCJsaW1pdHMiOnsic2VhdHMiOjEsIm1lbWJlcnMiOjEwfSwidHlwZSI6MCwiY3JlYXRlZEZyb20iOjB9LCJzY29wZSI6IjExMTExMTEwMDAwMDAwMDExMTExMTEwMDEwMDAxMTAwMTAxMDEwMDExMDEwMTAxMDAxMTAxMTAxMTExMTExMTExMTAwMDAwMTAwMDAwMDAxMSIsImV4cCI6MTYyNTM4OTYyMSwiaWF0IjoxNjI1Mzg2MDIxfQ.unalONOz429m0XsibIalKj7bAl4ykLKEEgXwQbvNSK6mjtZtFkHa7uClYQqQKPZgcXG3TE7cNHtPdT7B-gaEUA";

const baseUrl = "https://api-im.chatdaddy.tech";

interface MakeTheApiCallProps {
  method: string;
  url: string;
  body?: any;
  headers?: any;
  callbackSucess: Function;
  callbackFailed: Function;
}

export const makeTheApiCall = (props: MakeTheApiCallProps) => {
  const { method, url, body, headers, callbackSucess, callbackFailed } = props;

  if (method === "GET") {
    axios
      .get(baseUrl + url, {
        headers: {
          Authorization: "Bearer " + token,
        },
        ...headers,
      })
      .then((res) => {
        callbackSucess(res.data);
      })
      .catch((err) => {
        callbackFailed(err);
      });
  } else if (method === "POST") {
    axios
      .post(baseUrl + url, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
        ...headers,
      })
      .then((res) => {
        callbackSucess(res.data);
      })
      .catch((err) => {
        callbackFailed(err);
      });
  }
};
