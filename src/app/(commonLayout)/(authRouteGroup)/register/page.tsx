import RegisterForm from "@/components/modules/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background p-4">
      <div className="w-full max-w-6xl flex items-center justify-center py-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
