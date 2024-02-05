/* eslint-disable import/prefer-default-export */

// Format number to currency format (ex: 1000000 -> 1,000,000)
export const formatNumber = (value: string) => {
    const number = parseInt(value.replace(/,/g, ""), 10);
    return number.toLocaleString("en-US");
};

// Format function to convert ISO time to dd/mm/yyyy hh:mm format
// export function formatDateTime(inputTime: string) {
//     const date = new Date(inputTime);

//     const day = String(date.getUTCDate()).padStart(2, "0");
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1 to get the correct month.
//     const year = date.getUTCFullYear();
//     const hours = String(date.getUTCHours()).padStart(2, "0");
//     const minutes = String(date.getUTCMinutes()).padStart(2, "0");

//     const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}`;

//     return formattedTime;
// }

export function formatDateTime(inputTime: string) {
    const date = new Date(inputTime);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Bangkok", // Set the desired time zone here (convert from UTC+0 to UTC+7)
    };

    const formattedTime = date.toLocaleString("en-GB", options);
    return formattedTime;
}

export function formatDate(inputTime: string) {
    const date = new Date(inputTime);

    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Bangkok", // Set the desired time zone here (convert from UTC+0 to UTC+7)
    };

    const formattedTime = date.toLocaleString("en-GB", options);
    return formattedTime;
}

export const convertDateToServerFormat = (dateString: string) => {
    //* Input date format: DD/MM/YYYY, e.g. 28/02/2023
    //* Output date format: YYYY-MM-DD, e.g. 2023-02-28

    const ClientDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!dateString.match(ClientDateRegex)) {
        // Invalid format
        return dateString;
    }

    const parts = dateString.split("/");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    // Create a new Date object using the components
    const date = new Date(`${year}-${month}-${day}`);

    // Extract the components of the new date
    const convertedDay = String(date.getDate()).padStart(2, "0");
    const convertedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const convertedYear = date.getFullYear();

    // Return the converted date in the "yyyy-mm-dd" format
    return `${convertedYear}-${convertedMonth}-${convertedDay}`;
};
