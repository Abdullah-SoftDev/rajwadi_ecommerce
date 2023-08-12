import React from "react";
import { Drawer } from "vaul";

const LoginDrawer = () => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="sm:ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-700 focus:outline-none">
          Sign In
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="flex flex-col rounded-t-[10px] h-[80%] fixed bottom-0 left-0 right-0 z-50 bg-white">
          {/* My content */}
          <div className="w-full max-w-xl px-4 m-auto">
            <button
              className={`w-full max-w-xl text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150`}
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                alt=""
              />
              <span>Login with Google</span>
            </button>
            <button
              className={`w-full max-w-xl text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150`}
            >
              <img
                src="https://www.svgrepo.com/show/475689/twitter-color.svg"
                className="w-6 h-6"
                alt=""
              />
              <span>Login with Twitter</span>
            </button>
            <button
              className={`w-full max-w-xl text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 `}
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                className="w-6 h-6"
                alt=""
              />
              <span>Login with Github</span>
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default LoginDrawer;
