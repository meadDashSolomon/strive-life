/**
 * Cookie utility object for managing browser cookies.
 */
const Cookie = {
  /**
   * Gets the value of a specified cookie.
   * @param cname The name of the cookie.
   * @returns The value of the cookie, or an empty string if not found.
   */
  getCookie: function (cname: string): string {
    const name = cname + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },

  /**
   * Sets a cookie with a specified name, value, and expiration days.
   * @param cName The name of the cookie.
   * @param cValue The value of the cookie.
   * @param expDays The number of days until the cookie expires.
   */
  setCookie: function (cName: string, cValue: string, expDays: number): void {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${cName}=${cValue}; ${expires}; path=/`;
  },

  /**
   * Deletes a specified cookie by setting its expiration date to the past.
   * @param cName The name of the cookie to delete.
   */
  deleteCookie: function (cName: string): void {
    document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  },
};

export default Cookie;
