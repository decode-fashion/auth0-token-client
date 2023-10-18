import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  const getAccessToken = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, [isLoading]);

  return (
    <div className="flex items-center justify-center h-[100vh] text-white bg-zinc-800">
      {isLoading && (<span className="loading loading-dots loading-lg text-info"></span>)}
      {(!isAuthenticated && !isLoading) ? (<button
        className="border-2 border-blue-300 hover:bg-blue-300 w-32 h-10 rounded-md"
        onClick={() => loginWithRedirect()}
        hidden={isLoading}
      >
        Login me in
      </button>) : ''}
      {isAuthenticated && (
        <div className=" p-5 rounded-xl w-1/3 h-1/4 flex flex-row gap-5 bg-zinc-700">
          <img className="rounded-md" src={user.picture} />
          <div className="w-full h-full border-l-2 border-blue-300 flex flex-col items-center">
            <section className="flex items-center flex-col gap-5 mt-3">
              <p className="text-xl font-black">{`${user.nickname} (${user.email})`}</p>
              <div className="flex flex-col w-[85%]">
                Access token:
                <textarea
                readOnly={true}
                
                  onClick={() => {navigator.clipboard.writeText(accessToken); toast.success("Copied to clipboard!")}}
                  className="bg-zinc-700 rounded-md scrollbar-hide text-gray-400 focus:outline-none"
                  value={accessToken}
                />
                <Toaster />
              </div>
            </section>
            <section className="flex flex-row gap-3 mt-8 w-[85%] justify-center">
              <button
                className="border-2 hover:text-black border-blue-300 hover:bg-blue-300 w-32 h-10 rounded-md"
                onClick={() => loginWithRedirect()}
              >
                New token
              </button>
              <button
                className="hover:bg-gray-400 hover:text-black w-32 h-10 rounded-md"
                onClick={() => logout()}
              >
                Log out
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
