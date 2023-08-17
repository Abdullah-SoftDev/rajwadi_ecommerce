'use client'
import { Drawer } from "vaul";
import { useSignInWithFacebook, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { SyntheticEvent } from "react";

const LoginDrawer = () => {

  const [signInWithGoogle, googleUser, loading1, googleError] = useSignInWithGoogle(auth);
  const [signInWithFacebook, facebookUser, loading2, facebookError] = useSignInWithFacebook(auth);

  // Create user document in Firestore on google authentication
  const handleGoogleSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();

    const result = await signInWithGoogle();
    const user = result?.user;

    if (user) {
      const docRef = doc(db, `users/${user.uid}`);
      await setDoc(docRef, JSON.parse(JSON.stringify(user)));
    }
  };

  // Create user document in Firestore on firebase authentication
  const handleFacebookSignIn = async (event: SyntheticEvent) => {
    event.preventDefault();

    const result = await signInWithFacebook();
    const user = result?.user;

    if (user) {
      const docRef = doc(db, `users/${user.uid}`);
      await setDoc(docRef, JSON.parse(JSON.stringify(user)));
    }
  };

  if (googleError || facebookError) {
    toast.error((googleError || facebookError)?.message)
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
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
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Login using Mobile Number
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500"></div>
              <form
                className="mt-3 sm:flex sm:items-center">
                <div className="w-full sm:max-w-xl">
                  <input
                    type="number"
                    className="block w-full pl-3 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter Mobile Number..." />
                </div>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-3 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm whitespace-nowrap"
                >
                  GET OTP
                </button>
              </form>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className={`w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 ${loading1 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading1}
              >
                {!loading1 ? <>
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    className="w-6 h-6"
                    alt="" />
                  <span>Login with Google</span>
                </>
                  :
                  <img
                    src="https://www.svgrepo.com/show/347118/loader-4.svg"
                    className="w-6 h-6 animate-spin"
                    alt="" />
                }
              </button>
              <button
                onClick={handleFacebookSignIn}
                className={`w-full max-w-xl text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 ${loading2 ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading2}
              >
                {!loading2 ? <>
                  <img
                    src="https://www.svgrepo.com/show/448224/facebook.svg"
                    className="w-6 h-6"
                    alt="" />
                  <span>Login with Facebook</span>
                </>
                  :
                  <img
                    src="https://www.svgrepo.com/show/347118/loader-4.svg"
                    className="w-6 h-6 animate-spin"
                    alt="" />
                }
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};

export default LoginDrawer;
