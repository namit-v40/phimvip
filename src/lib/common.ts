

export const request = async (url: string) => {
    const requestOptions = {
        method: "GET",
        redirect: "follow" as RequestRedirect,
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
    }
};
