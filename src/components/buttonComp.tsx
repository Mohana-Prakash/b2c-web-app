interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  clickHandler: () => void;
}

export const GreenButton = ({ clickHandler, text }: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-green font-medium rounded-md text-base px-5 py-2 mr-2 w-32"
      onClick={clickHandler}
    >
      {/* <TickIcon />  */}
      {text}
    </button>
  );
};

export const BlueButton = ({ text, icon, clickHandler }: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="focus:outline-none text-sm text-center text-white bg-orange-500 font-medium rounded-md text-base py-2 px-5 w-32"
      onClick={clickHandler}
    >
      {icon}
      {text}
    </button>
  );
};

export const RedButton = ({ clickHandler, text }: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-red-600 font-medium rounded-md text-base px-5 py-2 w-32"
      onClick={clickHandler}
    >
      {/* <CancelIcon /> */}
      {text}
    </button>
  );
};

export const ZoomInButton = ({ clickHandler }: { clickHandler: () => void }): JSX.Element => {
  return (
    <button type="button" className="p-1 shadow-lg rounded-lg border" onClick={clickHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 text-gray-500 dark:text-gray-400 cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm8.25-3.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-1.5 0v-2.25H7.5a.75.75 0 0 1 0-1.5h2.25V7.5a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export const ZoomOutButton = ({ clickHandler }: { clickHandler: () => void }): JSX.Element => {
  return (
    <button type="button" className="p-1 shadow-lg rounded-lg border" onClick={clickHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 text-gray-500 dark:text-gray-400 cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm4.5 0a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};
