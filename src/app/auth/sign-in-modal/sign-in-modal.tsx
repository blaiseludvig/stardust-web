import { XMarkIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { useAuth } from 'src/app/hooks/stores/useAuth';
import { useCloseModal } from 'src/app/hooks/useCloseModal';
import ModalFrame, {
  ModalFrameProps,
} from 'src/app/util/modal-frame/modal-frame';

export function SignInModal(props: ModalFrameProps) {
  const closeModal = useCloseModal();
  const signIn = useAuth((state) => state.signIn);

  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  return (
    <ModalFrame hidden={props.hidden}>
      <div className="relative w-full max-w-md">
        <div className="relative rounded-lg bg-gray-700 shadow">
          <button
            onMouseDown={() => closeModal()}
            type="button"
            className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6 text-gray-500" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-white">Sign in</h3>
            <form
              onSubmit={handleSubmit((data) => {
                signIn(data.email, data.password);
                closeModal();
              })}
              className="space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Your password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
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
                      className="focus:ring-3 h-4 w-4 rounded border border-gray-500 bg-gray-600 ring-offset-gray-800 focus:ring-blue-600 focus:ring-offset-gray-800"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a href="/" className="text-sm text-blue-500 hover:underline">
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-300">
                Not registered?{' '}
                <a href="/" className="text-blue-500 hover:underline">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModalFrame>
  );
}
