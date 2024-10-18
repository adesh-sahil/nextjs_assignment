"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="relative text-center py-20 bg-gradient-to-r from-[#fb8d8d] to-[#5b00ff] text-white">
        <div className="absolute inset-0 bg-opacity-40"></div>
        <h1 className="text-6xl font-extrabold z-10 relative">
          About Plutus Labs
        </h1>
        <p className="text-2xl mt-4 z-10 relative">
          Empowering the future of decentralized finance with innovation,
          security, and scalability.
        </p>
        <button className="mt-10 px-8 py-3 bg-yellow-500 rounded-full text-lg font-bold hover:bg-yellow-600 z-10 relative">
          Explore Our Journey
        </button>
        <div className="absolute right-0 bottom-0 w-48 h-48"></div>
      </section>

      <section className="container mx-auto py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Who We Are</h2>
        <p className="text-lg max-w-4xl mx-auto">
          Plutus Labs is a pioneer in the decentralized finance (DeFi) space,
          revolutionizing the way people manage and access financial tools
          globally. Our mission is to democratize finance through blockchain
          technology, empowering users to own their financial future.
        </p>
        <div className="mt-12 flex justify-center gap-12">
          <div className="bg-white shadow-lg p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Innovation</h3>
            <p>
              We lead with innovation, offering decentralized solutions that
              challenge traditional finance and create limitless opportunities.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Security</h3>
            <p>
              Security is at the forefront of everything we do. We are committed
              to providing safe, resilient systems to protect users' financial
              data.
            </p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Scalability</h3>
            <p>
              From small businesses to global enterprises, our blockchain
              solutions are designed to scale and meet the needs of all users.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Why I’m Excited to Join Plutus
          </h2>
          <p className="text-lg mb-8">
            As a passionate developer specializing in **Next.js**, I’m driven by
            the opportunities that arise in cutting-edge technology. Joining
            Plutus Labs means contributing to the future of decentralized
            finance. I’m eager to apply my skills in **React.js**, **Next.js**,
            and **Tailwind CSS** to create scalable, performant web solutions
            for Plutus Labs.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="w-20 h-20 bg-white shadow-lg rounded-full flex items-center justify-center">
              <Image src="/Next.js.png" alt="Next.js" width={48} height={48} />
            </div>
            <div className="w-20 h-20 p-4 bg-white shadow-lg rounded-full flex items-center justify-center">
              <Image
                src="/Tailwind CSS.png"
                alt="Tailwind CSS"
                width={48}
                height={48}
              />
            </div>
            <div className="w-20 h-20 p-4 bg-white shadow-lg rounded-full flex items-center justify-center">
              <Image
                src="/TypeScript.png"
                alt="TypeScript"
                width={48}
                height={48}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-purple-900 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-8">
          Let’s Build the Future Together
        </h2>
        <p className="text-xl max-w-xl mx-auto mb-8">
          Plutus Labs is more than a company—it’s a movement to decentralize the
          future of finance. Whether you’re a developer, entrepreneur, or tech
          enthusiast, we welcome you to join us.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 text-lg font-bold rounded-full">
          Join the Team
        </button>
      </section>
    </div>
  );
}
