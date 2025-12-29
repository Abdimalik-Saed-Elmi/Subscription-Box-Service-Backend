export const configs = {
    Node_env: process.env.Node_env || "development",
    Port : process.env.Port || 1000,
    Mongo_Url: process.env.Mongo_Url || "",
    JWT_Secret: process.env.JWT_Secret || ""
}