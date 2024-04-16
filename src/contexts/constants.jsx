export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://acg25admin.navisoft.com.vn/acg25/public"
    : window.location.host?.includes("27.72.61.53")
    ? "http://27.72.61.53:8800/acg25/public"
    : "https://acg25admin.navisoft.com.vn/acg25/public";
export const LOCAL_STORAGE_TOKEN_NAME = "acg25";
