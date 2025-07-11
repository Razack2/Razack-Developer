'use client';

import Footer from "../componets/layouts/Footer";
import TopNavbar from "../componets/layouts/TopNavbar";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <section className="min-h-screen flex flex-col justify-between bg-white text-gray-800">
      <TopNavbar />

      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">
          Thank you for submitting your message!
        </h1>
        <p className="text-lg mb-4 max-w-2xl">
          Your message is under review. You will receive a response soon via the email address you provided.
        </p>

        <button
          onClick={() => router.back()}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          ⬅️ Go Back
        </button>
      </main>

      <Footer />
    </section>
  );
};

export default Page;
