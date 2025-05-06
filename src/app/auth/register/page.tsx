import Link from "next/link";

export default function RegisterPage(): JSX.Element {
  return (
    <div className="flex-1 min-h-screen text-2xl font-semibold text-center">
      {/* <h1 className=" text-gray-500 dark:text-white">Choose your role</h1> */}
      <div className="mt-14 flex flex-wrap justify-evenly gap-4 p-10">
        {/* <div className="max-w-sm flex-1 p-6 border border-gray-200 rounded-lg shadow  bg-gray-200 dark:bg-gray-900">
          <div className="role_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-1/4 h-15  text-gray-400 dark:text-white mb-3 m-auto"
            >
              <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
              <path
                fillRule="evenodd"
                d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
                clipRule="evenodd"
              />
            </svg>
            <h5 className="mb-2 text-center text-2xl font-semibold tracking-tight  text-gray-500 dark:text-white">
              PRODUCER
            </h5>
            <Link
              href="/auth/register/producer"
              className="text-blue-500 hover:underline dark:text-blue-500 flex justify-center items-center"
            >
              <p>Create account</p>
              <svg
                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </Link>
          </div>
        </div> */}
        {/* <div className="max-w-sm flex-1 p-6 border border-gray-200 rounded-lg shadow  bg-gray-200 dark:bg-gray-900">
          <div className="role_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-1/4 h-15 b text-gray-400 dark:text-white mb-3 m-auto"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <h5 className="mb-2 text-center text-2xl font-semibold tracking-tight  text-gray-500 dark:text-white">
              CONSUMER
            </h5>
            <Link
              href="/auth/register/consumer"
              className="text-blue-500 hover:underline dark:text-blue-500 flex justify-center items-center"
            >
              <p>Sign Up</p>
              <svg
                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </Link>
          </div>
        </div> */}
        {/* For now the the producer and consumer screens are commented because the code is cloned from the existing flow and now we are using only the Producer registration form. */}

        <div className="max-w-sm flex-1 p-6 border border-gray-200 rounded-lg shadow  bg-gray-200 dark:bg-gray-900">
          <div className="role_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-1/4 h-15 b text-gray-400 dark:text-white mb-3 m-auto"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
            <h5 className="mb-2 text-center text-2xl font-semibold tracking-tight  text-gray-500 dark:text-white">
              Admin
            </h5>
            <Link
              href="/auth/register/mobile-admin"
              className="text-blue-500 hover:underline dark:text-blue-500 flex justify-center items-center"
            >
              <p>Registration</p>
              <svg
                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
