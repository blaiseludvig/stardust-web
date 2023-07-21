import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignIn } from 'src/app/hooks/auth/useSignIn';
import { useSignUp } from 'src/app/hooks/auth/useSignUp';
import { useCloseModal } from 'src/app/hooks/useCloseModal';
import ModalFrame, {
  ModalFrameProps,
} from 'src/app/util/modal-frame/modal-frame';

export function SignUpModal(props: ModalFrameProps) {
  const closeModal = useCloseModal();
  const signUp = useSignUp();
  const signIn = useSignIn();

  const [displayedErrors, setDisplayedErrors] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<{
    email: string;
    password: string;
    confirmPassword: string;
  }>();

  return (
    <ModalFrame hidden={props.hidden} onHide={() => reset()}>
      <div className="relative w-full max-w-md">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <button
            onMouseDown={() => closeModal()}
            type="button"
            className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Sign up
            </h3>
            <form
              noValidate
              onSubmit={handleSubmit(async (data) => {
                const errorMessages: string[] = [];

                if (!data.email) {
                  errorMessages.push('Please type in your email address');
                }

                const emailRegex =
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if (data.email && !data.email.match(emailRegex)) {
                  errorMessages.push('Please provide a valid email address');
                }

                if (!data.password) {
                  errorMessages.push('Please type in your password');
                }

                if (data.password !== data.confirmPassword) {
                  errorMessages.push(
                    "The passwords don't match. Please try again"
                  );
                }

                if (errorMessages.length !== 0) {
                  setDisplayedErrors(errorMessages);
                  return;
                }

                const res = await signUp(data.email, data.password);

                if (!res.ok) {
                  const json = (await res.json()) as {
                    statusCode: number;
                    error: string;
                    message: string | string[];
                  };

                  if (Array.isArray(json.message)) {
                    setDisplayedErrors(json.message);
                  } else {
                    setDisplayedErrors([json.message]);
                  }
                }

                if (res.ok) {
                  setDisplayedErrors([]);
                  signIn(data.email, data.password);
                  closeModal();
                }
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
                  inputMode="email"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                  placeholder=""
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
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
              <div>
                {displayedErrors.map((message) => {
                  return (
                    <div className="flex items-center">
                      <ExclamationCircleIcon className="h-8 w-8 stroke-[2] text-rose-500" />
                      <span className="basis-full font-semibold leading-[1.1] text-rose-500">
                        {message}
                      </span>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
}

export default SignUpModal;
