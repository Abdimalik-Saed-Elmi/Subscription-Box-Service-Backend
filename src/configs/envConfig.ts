export const configs = {
    Node_env: process.env.Node_env || "development",
    Port : process.env.Port || 1000,
    Mongo_Url: process.env.Mongo_Url || ""
}

if (!configs.Mongo_Url) {
  throw new Error ("MongoDB waa waajib")
}