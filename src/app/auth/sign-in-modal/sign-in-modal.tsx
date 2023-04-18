import { XMarkIcon } from '@heroicons/react/24/solid';
import { useNavigate } from '@tanstack/react-location';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useSignIn } from 'src/app/hooks/auth/useSignIn';

/* eslint-disable-next-line */
export interface SignInModalProps {}

export function SignInModal(props: SignInModalProps) {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-50 dark:bg-opacity-80">
      <div
        // className="absolute top-0 left-0 right-0 z-[110] h-[calc(100%-1rem)] w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
        // className="absolute top-0 left-0 right-0 z-[110] flex h-[calc(100%-1rem)] w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) navigate({ to: '/app' });
        }}
        className="absolute top-0 left-0 right-0 z-[110] flex h-[calc(100%-1rem)] w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full"
      >
        <div className="relative w-full max-w-md">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
            <button
              onMouseDown={() => navigate({ to: '/app' })}
              type="button"
              className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign in
              </h3>
              <form
                onSubmit={handleSubmit((data) => {
                  signIn(data.email, data.password);
                  navigate({ to: '/app' });
                })}
                className="space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="/"
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{' '}
                  <a
                    href="/"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Sign up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('app') as HTMLElement
  );
}

// return (
//   <ModalFrame ref={modalFrameHandle}>
//     <div className="relative h-full w-full max-w-md md:h-auto">
//       {/* <!-- Modal content --> */}
//       <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
//         <button
//           onClick={() => modalFrameHandle.current?.hide()}
//           type="button"
//           className="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
//         >
//           <XMarkIcon className="h-6 w-6 text-gray-500" />
//           <span className="sr-only">Close modal</span>
//         </button>
//         <div className="px-6 py-6 lg:px-8">
//           <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
//             Sign in
//           </h3>
//           <form
//             onSubmit={handleSubmit((data) => {
//               signIn(data.email, data.password);
//             })}
//             className="space-y-6"
//             action="#"
//           >
//             <div>
//               <label
//                 htmlFor="email"
//                 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Your email
//               </label>
//               <input
//                 {...register('email')}
//                 type="email"
//                 className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
//                 placeholder=""
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Your password
//               </label>
//               <input
//                 {...register('password')}
//                 type="password"
//                 placeholder="••••••••"
//                 className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
//                 required
//               />
//             </div>
//             <div className="flex justify-between">
//               <div className="flex items-start">
//                 <div className="flex h-5 items-center">
//                   <input
//                     id="remember"
//                     type="checkbox"
//                     value=""
//                     className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
//                   />
//                 </div>
//                 <label
//                   htmlFor="remember"
//                   className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <a
//                 href="/"
//                 className="text-sm text-blue-700 hover:underline dark:text-blue-500"
//               >
//                 Lost Password?
//               </a>
//             </div>
//             <button
//               type="submit"
//               className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Login to your account
//             </button>
//             <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
//               Not registered?{' '}
//               <a
//                 href="/"
//                 className="text-blue-700 hover:underline dark:text-blue-500"
//               >
//                 Sign up
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </ModalFrame>
// );
// });
