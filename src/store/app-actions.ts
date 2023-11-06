export const emptyCacheAndHardReload: any = () => {
  localStorage.clear();
  window.location.reload();
};

export const setFBInfo: any = (data: any) => {
  // return (dispatch: any) => {
  localStorage.setItem("fb_info", JSON.stringify(data));
  // };
};

export const setJWTToken: any = (data: any) => {
  // return (dispatch: any) => {
  localStorage.setItem("jwt_token", JSON.stringify(data));
  // };
};
