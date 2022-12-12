import { ApplicationError } from "../protocols.js";

export function badRequestError(message: string): ApplicationError {
    return {
        name: "BadRequestError",
        message,
    };
}
