type errorProps = {
  message: string;
  onClose: () => void;
};
const SuccessToast = ({ message, onClose }: errorProps) => {
  return (
    <div className="fixed z-99 inset-0 overflow-y-auto" id="my-modal">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white">
              <svg
                fill="#16a34a"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="0 0 342.508 342.508"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M171.254,0C76.837,0,0.003,76.819,0.003,171.248c0,94.428,76.829,171.26,171.251,171.26
		c94.438,0,171.251-76.826,171.251-171.26C342.505,76.819,265.697,0,171.254,0z M245.371,136.161l-89.69,89.69
		c-2.693,2.69-6.242,4.048-9.758,4.048c-3.543,0-7.059-1.357-9.761-4.048l-39.007-39.007c-5.393-5.398-5.393-14.129,0-19.521
		c5.392-5.392,14.123-5.392,19.516,0l29.252,29.262l79.944-79.948c5.381-5.386,14.111-5.386,19.504,0
		C250.764,122.038,250.764,130.769,245.371,136.161z"
                  />
                </g>
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-xl leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Success
              </h3>
              <div className="mt-2 max-h-[7.5rem] overflow-y-auto overflow-x-hidden">
                <div
                  className=" text-gray-500"
                  style={{ wordBreak: "break-word" }}
                  dangerouslySetInnerHTML={{ __html: message }}
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;
