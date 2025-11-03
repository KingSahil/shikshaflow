"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (error: any) {
      console.error("Reset password error:", error);
      let errorMessage = "Failed to send reset email. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Login</span>
          </motion.button>
        </Link>

        {/* Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
        >
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Forgot Password?
                </h1>
                <p className="text-gray-600">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-900"
                      placeholder="student@example.com"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Reset Link
                    </>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            /* Success Message */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Check Your Email!
              </h2>
              <p className="text-gray-600 mb-2">
                We've sent password reset instructions to:
              </p>
              <p className="font-semibold text-blue-600 mb-6">{email}</p>
              <p className="text-sm text-gray-500 mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <motion.button
                onClick={() => setEmailSent(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Try another email
              </motion.button>
            </motion.div>
          )}

          {/* Footer */}
          {!emailSent && (
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="mailto:support@shikshaflow.com" className="text-blue-600 hover:text-blue-700 font-semibold underline">
              Contact Support
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
