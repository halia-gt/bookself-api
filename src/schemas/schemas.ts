import joi from "joi";

const baseSchemas = {
    "bookRead": joi.object({
        rating: joi.number()
            .integer()
            .max(4)
            .min(1)
            .required(),
    
        date_finished: joi.date()
            .required(),
    }),
};

export { baseSchemas };
