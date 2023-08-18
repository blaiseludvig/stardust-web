import { ExclamationCircleIcon, EyeIcon } from '@heroicons/react/24/outline';
import { EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useToggle } from '@react-hookz/web';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/app/hooks/stores/useAuth';
import { useCloseModal } from 'src/app/hooks/useCloseModal';
import { extractNestedProperties } from 'src/app/util/lib/extractNestedProperties';
import ModalFrame, {
  ModalFrameProps,
} from 'src/app/util/modal-frame/modal-frame';

export function SignUpModal(props: ModalFrameProps) {
  const closeModal = useCloseModal();
  const signUp = useAuth((state) => state.signUp);
  const signIn = useAuth((state) => state.signIn);

  const [isPasswordVisible, togglePasswordVisible] = useToggle(false);
  const [isPasswordConfirmationVisible, togglePasswordConfirmationVisible] =
    useToggle(false);

  type formDataType = {
    email: string;
    password: string;
    confirmPassword: string;
  };

  const { register, formState, handleSubmit, reset, setError, clearErrors } =
    useForm<formDataType>();

  return (
    <ModalFrame hidden={props.hidden} onHide={() => reset()}>
      <div className="relative w-full max-w-md">
        <div className="relative rounded-lg bg-gray-700 shadow">
          <button
            onMouseDown={() => closeModal()}
            type="button"
            className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400
            hover:bg-gray-800 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-white">Sign up</h3>
            <form
              noValidate
              onSubmit={handleSubmit(async (data) => {
                const res = await signUp(data.email, data.password);

                if (!res.ok) {
                  const json = (await res.json()) as {
                    statusCode: number;
                    error: string;
                    message: string | string[];
                  };

                  if (Array.isArray(json.message)) {
                    json.message.forEach((message, index) =>
                      setError(`root.serverside${index}`, {
                        type: `root.serverside${index}`,
                        message: message,
                      })
                    );
                  } else {
                    setError('root.0', { message: json.message });
                  }
                }

                if (res.ok) {
                  clearErrors();
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
                  className="mb-2 block text-sm font-medium  text-white"
                >
                  Your email
                </label>
                <input
                  {...register('email', {
                    required: 'Please type in your email address',
                    validate: {
                      isEmail: (value) => {
                        const emailRegex =
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                        return (
                          value.match(emailRegex) ||
                          'Please provide a valid email address'
                        );
                      },
                    },
                  })}
                  type="email"
                  inputMode="email"
                  placeholder="john.doe@example.com"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium  text-white"
                >
                  Your password
                </label>
                <div className="flex w-full items-center rounded-lg border border-gray-500 bg-gray-600 pr-2.5 text-sm text-white placeholder-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <input
                    {...register('password', {
                      required: 'Please type in your password',
                      deps: ['confirmPassword'],
                    })}
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter your password here"
                    className="block w-full rounded-lg border-none bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 focus:ring-0"
                  />
                  <div
                    tabIndex={0}
                    onMouseDown={() => togglePasswordVisible()}
                    onKeyDown={(e) => {
                      if (e.code === 'Space' || e.code === 'Enter') {
                        togglePasswordVisible();
                      }
                    }}
                  >
                    {isPasswordVisible ? (
                      <EyeIcon className="h-6 w-6 cursor-pointer text-gray-500" />
                    ) : (
                      <EyeSlashIcon className="h-6 w-6 cursor-pointer text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium  text-white"
                >
                  Confirm your password
                </label>
                <div className="flex w-full items-center rounded-lg border border-gray-500 bg-gray-600 pr-2.5 text-sm text-white placeholder-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: {
                        passwordsMatch: (_, formValues) =>
                          formValues.confirmPassword === formValues.password ||
                          "The passwords don't match. Please try again",
                      },
                    })}
                    type={isPasswordConfirmationVisible ? 'text' : 'password'}
                    placeholder="Confirm your password here"
                    className="block w-full rounded-lg border-none bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 focus:ring-0"
                  />
                  <div
                    tabIndex={0}
                    onMouseDown={() => togglePasswordConfirmationVisible()}
                    onKeyDown={(e) => {
                      if (e.code === 'Space' || e.code === 'Enter') {
                        togglePasswordConfirmationVisible();
                      }
                    }}
                  >
                    {isPasswordConfirmationVisible ? (
                      <EyeIcon className="h-6 w-6 cursor-pointer text-gray-500" />
                    ) : (
                      <EyeSlashIcon className="h-6 w-6 cursor-pointer text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
              >
                Sign up
              </button>

              <div>
                {extractNestedProperties(
                  formState.errors,
                  'message',
                  'string'
                ).map((message, index) => (
                  <div key={index} className="flex items-center">
                    <ExclamationCircleIcon className="h-8 w-8 stroke-[2] text-rose-500" />
                    <span className="basis-full font-semibold leading-[1.1] text-rose-500">
                      {message}
                    </span>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
}

export default SignUpModal;
