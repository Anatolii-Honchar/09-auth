import css from "@/components/AuthNavigation/AuthNavigation.module.css";
import Link from "next/link";

const AuthNavigation = () => {
  const isLoggedIn = false; // 🔴 тимчасово
  const user = { email: "test@mail.com" };

  return (
    <>
      {isLoggedIn ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user.email}</p>
            <button className={css.logoutButton}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
