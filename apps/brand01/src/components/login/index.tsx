"use client";
import { useForm } from "react-hook-form";
import Form from "@brand01/src/components/form";
import { useClientTranslation } from "@brand01/src/i18n/client";
import { useRouter } from "next/navigation";
import { useGetPathname } from "JF-core";
import { paths } from "JF-constants";

export type LoginFormType = {
  userName: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormType>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const { locale } = useGetPathname();
  const { t } = useClientTranslation(locale);

  const handleSignIn = async () => {
    try {
      // await onSignIn(payload)
      router.push(paths.home.root);
    } catch (error) {
      // modal.error((error as Error).message)
      //   console.error(error);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit(handleSignIn)}
        component={false}
        className="flex flex-wrap items-center justify-center text-neutral-100"
      >
        <input
          className="mb-4 block w-full rounded-xl border bg-neutral-400 py-3 px-12 text-center outline-none transition dark:border-neutral-300"
          defaultValue=""
          placeholder={t("Label_General_Username") || ""}
          {...register("userName", {
            required: {
              value: true,
              message: t("Label_General_UsernameReq"),
            },
            minLength: {
              value: 6,
              message: t("Label_General_UserNameLength"),
            },
            maxLength: {
              value: 18,
              message: t("Label_General_UserNameLength"),
            },
          })}
        />

        <input
          className="block w-full rounded-xl border bg-neutral-400 py-3 px-12 text-center outline-none transition dark:border-neutral-300"
          defaultValue=""
          type="password"
          placeholder={t("Label_General_Password") || ""}
          {...register("password", {
            required: {
              value: true,
              message: t("Label_General_PasswordRequired"),
            },
          })}
        />
      </Form>
      <button
        type="button"
        className="my-8 block w-full rounded-xl bg-primary-400 py-4 text-center text-neutral-100"
        onClick={handleSubmit(handleSignIn)}
      >
        {t("Label_General_LogIn")}
      </button>
    </>
  );
};

export default Login;
