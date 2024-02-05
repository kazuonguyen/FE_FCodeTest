/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-async-promise-executor */

import { RectangleCrop } from "./order/PostOrderCrop";

/* eslint-disable no-await-in-loop */
const authPathname = "/login";

// Binary semaphore lock to prevent multiple requests from being made at the same time
// when waiting for a token refresh.
let asynchronous: boolean | undefined = false;

// Refresh token function
async function refreshToken(): Promise<string | undefined> {
    const api = process.env.NEXT_PUBLIC_API_URL;
    //* Handle asynchronous call
    if (asynchronous === true) {
        // Wait for previous call to finish
        while (asynchronous === true) {
            await new Promise((wait) => setTimeout(wait, 1000));
        }
        return new Promise(async (resolve) => {
            const token = localStorage.getItem("ACCESS_TOKEN") || "";
            resolve(token);
        });
    }
    //* Asynchronous call not in progress, start new one
    return new Promise(async (resolve, reject) => {
        asynchronous = true;
        // console.log("Refreshing token...");
        try {
            const rtk = localStorage.getItem("REFRESH_TOKEN");
            if (!rtk) {
                throw new Error("No refresh token found!");
            }
            const res = await fetch(`${api}auth/refresh`, {
                method: "GET",
                // credentials: "include",
                headers: {
                    Authorization: `Bearer ${rtk}`,
                    // Accept: "application/json",
                    // "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "*",
                    // "Allow-Credentials": "true",
                    // "Access-Control-Allow-Credentials": "true",
                },
            });
            const data = await res.json();
            if (res.status === 200) {
                asynchronous = false;
                resolve(data.data.new_access_token);
            } else {
                asynchronous = undefined;
                // Check if pathname is not auth page
                if (!authPathname.includes(window.location.pathname)) {
                    window.location.href = "/login";
                }
                reject(res);
            }
        } catch (error) {
            asynchronous = undefined;
            if (!authPathname.includes(window.location.pathname)) {
                window.location.href = "/login";
            }
            reject(error);
        }
    });
}

export async function fetchAuth(
    url: string,
    {
        method = "GET",
        body = null,
        withToken = true,
    }: {
        method?: "GET" | "POST" | "DELETE";
        body?:
            | { [key: string]: string | number | boolean | RectangleCrop[] | string[] | number[] }
            | string
            | URLSearchParams
            | FormData
            | Blob
            | ArrayBuffer
            | ReadableStream
            | null;
        withToken?: boolean;
    } = {},
): Promise<Response> {
    const api = process.env.NEXT_PUBLIC_API_URL;

    let processedBody: BodyInit | null = null;
    let contentType;

    //* Handle method
    const validMethods = ["GET", "POST", "DELETE"];
    if (!validMethods.includes(method)) {
        return new Promise((resolve, reject) => {
            reject(new Error(`Method must be one of ${validMethods.join(", ")}`));
        });
    }

    //* Handle body
    if (method !== "GET") {
        if (typeof body === "string") {
            processedBody = body;
            contentType = "text/plain";
        } else if (body instanceof URLSearchParams) {
            processedBody = body.toString();
            contentType = "application/x-www-form-urlencoded";
        } else if (body instanceof FormData) {
            processedBody = body;
            contentType = "multipart/form-data";
        } else if (
            body instanceof Blob ||
            body instanceof ArrayBuffer ||
            ArrayBuffer.isView(body)
        ) {
            processedBody = new Blob([body], { type: "application/octet-stream" });
            contentType = "application/octet-stream";
        } else if (body instanceof ReadableStream) {
            processedBody = body;
            contentType = "application/octet-stream";
        } else if (body !== null && typeof body === "object") {
            processedBody = JSON.stringify(body);
            contentType = "application/json";
        } else {
            processedBody = String(body);
            contentType = "text/plain";
        }
    }

    //* Request does not need token
    if (!withToken) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(api + url, {
                    method,
                    headers: {},
                    body: processedBody,
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    //* Handle asynchronous call
    if (asynchronous === true) {
        // Wait for previous call to finish
        while (asynchronous === true) {
            await new Promise((wait) => setTimeout(wait, 1000));
        }
    }

    const headers: { [key: string]: string } = {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    };

    // `contentType` must not be equal to `"multipart/form-data"`.
    // This is because when you're sending a `FormData` object with an HTTP request,
    // the browser automatically sets the `Content-Type` to `"multipart/form-data"`
    // and also appropriately sets the `boundary` parameter,which is needed for this content type.
    // If you manually set the `Content-Type` to `"multipart/form-data"`,
    // you would also need to manually set the `boundary` parameter, which can be complex.
    if (contentType !== "multipart/form-data" && contentType) {
        headers["Content-Type"] = contentType;
    }

    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(api + url, {
                method,
                headers,
                body: processedBody,
            });
            if (res.status === 200) {
                resolve(res);
            } else if (res.status === 401 || res.status === 403) {
                const token = await refreshToken();
                if (token) {
                    localStorage.setItem("ACCESS_TOKEN", token);
                    headers.Authorization = `Bearer ${token}`;
                    res = await fetch(api + url, {
                        method,
                        headers,
                        body: processedBody,
                    });
                    resolve(res);
                } else {
                    // Refresh token failed
                    reject(res);
                }
            } else {
                // First request failed
                resolve(res);
            }
        } catch (error) {
            // General error
            reject(error);
        }
    });
}

export async function fetchLogistics(
    url: string,
    {
        method = "GET",
        body = null,
        withToken = true,
    }: {
        method?: "GET" | "POST" | "DELETE";
        body?:
            | { [key: string]: string | number | boolean | RectangleCrop[] | string[] | number[] }
            | string
            | URLSearchParams
            | FormData
            | Blob
            | ArrayBuffer
            | ReadableStream
            | null;
        withToken?: boolean;
    } = {},
): Promise<Response> {
    const api = process.env.NEXT_PUBLIC_API_LOGISTICS_URL;

    let processedBody: BodyInit | null = null;
    let contentType;

    //* Handle method
    const validMethods = ["GET", "POST", "DELETE"];
    if (!validMethods.includes(method)) {
        return new Promise((resolve, reject) => {
            reject(new Error(`Method must be one of ${validMethods.join(", ")}`));
        });
    }

    //* Handle body
    if (method !== "GET") {
        if (typeof body === "string") {
            processedBody = body;
            contentType = "text/plain";
        } else if (body instanceof URLSearchParams) {
            processedBody = body.toString();
            contentType = "application/x-www-form-urlencoded";
        } else if (body instanceof FormData) {
            processedBody = body;
            contentType = "multipart/form-data";
        } else if (
            body instanceof Blob ||
            body instanceof ArrayBuffer ||
            ArrayBuffer.isView(body)
        ) {
            processedBody = new Blob([body], { type: "application/octet-stream" });
            contentType = "application/octet-stream";
        } else if (body instanceof ReadableStream) {
            processedBody = body;
            contentType = "application/octet-stream";
        } else if (body !== null && typeof body === "object") {
            processedBody = JSON.stringify(body);
            contentType = "application/json";
        } else {
            processedBody = String(body);
            contentType = "text/plain";
        }
    }

    //* Request does not need token
    if (!withToken) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(api + url, {
                    method,
                    headers: {},
                    body: processedBody,
                });
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    }

    //* Handle asynchronous call
    if (asynchronous === true) {
        // Wait for previous call to finish
        while (asynchronous === true) {
            await new Promise((wait) => setTimeout(wait, 1000));
        }
    }

    const headers: { [key: string]: string } = {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
    };

    // `contentType` must not be equal to `"multipart/form-data"`.
    // This is because when you're sending a `FormData` object with an HTTP request,
    // the browser automatically sets the `Content-Type` to `"multipart/form-data"`
    // and also appropriately sets the `boundary` parameter,which is needed for this content type.
    // If you manually set the `Content-Type` to `"multipart/form-data"`,
    // you would also need to manually set the `boundary` parameter, which can be complex.
    if (contentType !== "multipart/form-data" && contentType) {
        headers["Content-Type"] = contentType;
    }

    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(api + url, {
                method,
                headers,
                body: processedBody,
            });
            if (res.status === 200) {
                resolve(res);
            } else if (res.status === 401 || res.status === 403) {
                const token = await refreshToken();
                if (token) {
                    localStorage.setItem("ACCESS_TOKEN", token);
                    headers.Authorization = `Bearer ${token}`;
                    res = await fetch(api + url, {
                        method,
                        headers,
                        body: processedBody,
                    });
                    resolve(res);
                } else {
                    // Refresh token failed
                    reject(res);
                }
            } else {
                // First request failed
                resolve(res);
            }
        } catch (error) {
            // General error
            reject(error);
        }
    });
}
