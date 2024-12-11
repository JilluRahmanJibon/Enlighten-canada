import Link from "next/link";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";

const ProfileDetails = () => {
  return (
    <div className="min-h-screen bg-amber-50/80">
      {/* Header Section */}
      <header className="relative bg-blue-100">
        <img
          src="https://app.tandem.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-map-hero.5169a879.png&w=1920&q=75" // Replace with actual background image URL
          alt="World Map"
          className="w-full h-64 object-cover"
        />
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-3 top-1/2 flex flex-col items-center left-1/2 transform -translate-y-20 text-center">
          <img
            src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg" // Replace with actual profile image URL
            alt="Profile"
            className="w-44 h-44 rounded-full border-4 border-white object-cover"
          />
          <h1 className="mt-3 text-2xl font-semibold">淳民, 34</h1>
          <p className="text-gray-500">Active 9 minutes ago</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-primary text-white px-6 py-2 rounded-full">
              Follow
            </button>
            <Link href="/chat">
            <button className="bg-primary text-white px-6 py-2 rounded-full">
              Message
            </button>
            </Link>
            <CiMenuKebab
              size={40}
              className="bg-gray-50 border text-primary border-primary p-2 rounded-full"
            />
          </div>
        </div>
        {/* Languages Section */}
        <section className="bg-white border p-4 rounded-lg ">
          <h2 className="font-bold mb-2">Languages</h2>
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold text-sm">NATIVE</h3>
              <p className="text-gray-700 flex items-center">
                <span className="mr-2">🇨🇳</span> Chinese (Simplified) (中文
                (简体))
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">FLUENT</h3>
              <p className="text-gray-700 flex items-center">
                <span className="mr-2">🇹🇼</span> Chinese (Traditional) (中文
                (繁體))
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm">LEARNING</h3>
              <p className="text-gray-700 flex items-center">
                <span className="mr-2">🇰🇷</span> Korean (한국어)
              </p>
              <p className="text-gray-700 flex items-center">
                <span className="mr-2">🇯🇵</span> Japanese (日本語)
              </p>
              <p className="text-gray-700 flex items-center">
                <span className="mr-2">🇬🇧</span> English (English)
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white border p-4 rounded-lg ">
          <h2 className="font-bold mb-2">About 淳民</h2>
          <p className="text-sm text-gray-600 flex items-center mb-1">
            <span className="mr-2">📍</span> Seoul, Korea, Republic Of
          </p>
          <p className="text-sm text-gray-600 flex items-center mb-1">
            <span className="mr-2">⏰</span> 15:26 (1:00)
          </p>
          <p className="text-sm text-gray-600 flex items-center mb-1">
            <span className="mr-2">📧</span> @ze_min21002921
          </p>
          <h3 className="font-semibold mt-4">
            What do you like to talk about?
          </h3>
          <p className="text-gray-700">学习语言</p>
          <h3 className="font-semibold mt-4">
            What's your ideal language exchange partner like?
          </h3>
          <p className="text-gray-700">性格开朗活泼阳光</p>
          <h3 className="font-semibold mt-4">
            What are your language learning goals?
          </h3>
          <p className="text-gray-700">更好的发展和沟通</p>
        </section>

        <section>
          {/* Topics Section */}
          <section className="bg-white border p-4 rounded-lg ">
            <h2 className="font-bold mb-2">Topics</h2>
            <p className="text-gray-700">你好很高兴认识你</p>
          </section>

          {/* Photos Section */}
          <section className="col-span-1 border md:col-span-3 mt-4 bg-white p-4 rounded-lg ">
            <h2 className="font-bold mb-2">Photos</h2>
            <div className="grid grid-cols-3 gap-2">
              {/* Replace src with actual photo URLs */}
              <img
                src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg"
                alt="Photo 1"
                className="w-full h-24 object-cover rounded"
              />
              <img
                src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg"
                alt="Photo 2"
                className="w-full h-24 object-cover rounded"
              />
              <img
                src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg"
                alt="Photo 3"
                className="w-full h-24 object-cover rounded"
              />
              <img
                src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg"
                alt="Photo 4"
                className="w-full h-24 object-cover rounded"
              />
              <img
                src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg"
                alt="Photo 5"
                className="w-full h-24 object-cover rounded"
              />
              <img
                src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg"
                alt="Photo 6"
                className="w-full h-24 object-cover rounded"
              />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default ProfileDetails;
