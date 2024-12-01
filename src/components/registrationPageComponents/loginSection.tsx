function Login() {
  return (
    <div className="text-center mt-12">
      <p className="text-gray-300">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-purple-400 hover:text-purple-300 underline"
        >
          Log in here
        </a>
      </p>
    </div>
  );
}

export default Login;
