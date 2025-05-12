import { validate as uuidValidate } from "uuid";

const throWError = (prop: string) => {
    const error = new Error(`Argument required : ${prop}`);
    error.name = "ArgumentRequiredError";
    throw error;
};

const required = (...argumentName: any[]) => (requestBody: any = {}) => {
    if (!requestBody) {
        throWError("body");
    }

    argumentName.forEach((name: string) => {
        const value = requestBody[name];

        if (value === undefined || value === null || value === "") {
            throWError(name);
        }

        if ((name === "id" || name.slice(-2) === "Id") && name !== "deviceId") {
            const validId = uuidValidate(value);
            if (!validId) {
                throWError(name);
            }
        }
    });
};

export default required;
