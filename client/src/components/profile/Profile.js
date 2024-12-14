"use client";
import React, { useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { useSelector } from "react-redux";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("About me");
  // Menu items array
  const menuItems = [
    { label: "About me" },
    { label: "Languages" },
    { label: "Learning Preferences" },
    { label: "Topics" },
    { label: "Following" },
    { label: "Settings" },
    { label: "Visitors" },
    { label: "Log out" },
  ];


  const Visitors = () =>
  {
    
    return (
      <div >
        <h3 className="font-semibold text-lg mb-4">Visitors</h3>
        <div className="border-t py-6">
          <p className="text-gray-600 mb-2">
            You had 1 new visitor to your profile last week:
          </p>
          <p className="text-gray-500">
            Upgrade to{' '}
            <a href="#" className="text-pink-500 font-medium">
              Tandem Pro
            </a>{' '}
            to connect with them
          </p>
          <button className="mt-4 bg-pink-500 text-white py-2 px-6 rounded-full">
            SEE YOUR VISITORS
          </button>
        </div>
      </div>
    );
  };

  const ToggleSwitch = ({ isOn, handleToggle }) => (
    <span
      className={`relative inline-block w-10 h-6 ${isOn ? 'bg-blue-500' : 'bg-gray-300'} rounded-full cursor-pointer`}
      onClick={handleToggle}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${isOn ? 'transform translate-x-4' : ''}`}
      />
    </span>
  );
  
  const Settings = () => {
    const [showLocation, setShowLocation] = useState(true);
    const [showTandemID, setShowTandemID] = useState(true);
    const [notifications, setNotifications] = useState(false);
  
    return (
      <div className="">
        {/* Privacy Section */}
        <div>
          <h3 className="font-semibold text-lg mb-7">Privacy</h3>
          <div className="flex py-7 justify-between items-center py-2 border-t">
            <span>Show my location</span>
            <ToggleSwitch isOn={showLocation} handleToggle={() => setShowLocation(!showLocation)} />
          </div>
          <div className="flex py-7 justify-between items-center py-2 border-t">
            <span>Show my Tandem ID</span>
            <ToggleSwitch isOn={showTandemID} handleToggle={() => setShowTandemID(!showTandemID)} />
          </div>
          <div className="flex py-7 justify-between items-center py-2 border-t">
            <span>Manage Cookies</span>
            <button className="text-blue-500">Manage Cookies</button>
          </div>
        </div>
  
        {/* Notifications Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Notifications</h3>
          <div className="flex justify-between items-center py-2 border-t">
            <span>Receive notifications for messages or calls</span>
            <ToggleSwitch isOn={notifications} handleToggle={() => setNotifications(!notifications)} />
          </div>
        </div>
  
        {/* Download Data Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Download your data</h3>
          <p className="text-gray-500 mb-2">You can download your Tandem personal data here.</p>
          <button className="bg-gray-200 text-black py-2 px-4 rounded">Request data</button>
        </div>
  
        {/* Delete Account Section */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Delete account</h3>
          <p className="text-gray-500 mb-2">
            Are you sure that you want to delete your account? This is what will happen:
          </p>
          <ol className="list-decimal list-inside text-gray-500 mb-2">
            <li>You won't be able to practice languages with our community anymore 😢</li>
            <li>All your data on Tandem will be deleted from our servers completely, with no option to recover it later.</li>
            <li>
              While your personal conversation history will be gone forever once you delete your account, your partners on
              Tandem may still have some of the messages you sent them.
            </li>
          </ol>
          <a href="#" className="text-blue-500 block mb-4">
            I want to permanently delete my Tandem account.
          </a>
          <button className="bg-red-500 text-white py-2 px-4 rounded">Delete account</button>
        </div>
      </div>
    );
  };

  const Following = () => {
    const [activeTab, setActiveTab] = useState('Following');
  
    const renderContent = () => {
      switch (activeTab) {
        case 'Following':
          return <p className="text-gray-500">You are not following anyone yet :(</p>;
        case 'Followers':
          return <p className="text-gray-500">You have no followers yet :(</p>;
        case 'Blocked':
          return <p className="text-gray-500">You have not blocked anyone yet :(</p>;
        default:
          return null;
      }
    };
  
    return (
      <div className="w-full mx-auto">
        <div className="flex justify-between border-b border-gray-200">
          {['Following', 'Followers', 'Blocked'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-4 w-full font-medium ${
                activeTab === tab ? 'text-blue-500 border-b-2  border-blue-500' : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="py-6">{renderContent()}</div>
      </div>
    );
  };
  

  const TopicItem = ({ topic, onRemove }) => (
    <div className="flex justify-between items-center py-2">
      <span className="text-blue-600 cursor-pointer">{topic}</span>
      <button onClick={onRemove} className="text-gray-500 hover:text-red-500">
        &times;
      </button>
    </div>
  );

  const Topics = () => {
    const [topics, setTopics] = React.useState(["Life"]);

    const handleRemove = (topicToRemove) => {
      setTopics(topics.filter((topic) => topic !== topicToRemove));
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Topics</h3>
          <a href="#" className="text-blue-500 flex items-center space-x-1">
            <span className="text-sm">➕</span>
            <span>Create A Topic</span>
          </a>
        </div>
        <hr className="border-gray-200" />
        <div>
          {topics.map((topic) => (
            <TopicItem
              key={topic}
              topic={topic}
              onRemove={() => handleRemove(topic)}
            />
          ))}
        </div>
      </div>
    );
  };

  const SettingSection = ({ title }) => (
    <div className="flex justify-between items-center py-4 border-b">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-gray-500">Not set</span>
      </div>
      <a href="#" className="text-blue-500">
        Edit
      </a>
    </div>
  );

  const LanguageSection = ({
    title,
    flagSrc,
    language,
    proficiency,
    level,
  }) => (
    <div className="flex justify-between items-center border-b py-2">
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center space-x-2 mt-5">
          {flagSrc && (
            <img src={flagSrc} alt={`${language} Flag`} className="w-5 h-5" />
          )}
          <span>{language}</span>
          {proficiency && <span className="text-gray-500">{proficiency}</span>}
          {level && (
            <div className="flex space-x-1">
              {Array.from({ length: level }).map((_, index) => (
                <span key={index} className="w-2 h-2 bg-black"></span>
              ))}
              {Array.from({ length: 3 - level }).map((_, index) => (
                <span key={index} className="w-2 h-2 bg-gray-300"></span>
              ))}
            </div>
          )}
        </div>
      </div>
      <a href="#" className="text-blue-500">
        Edit
      </a>
    </div>
  );

  const renderTabContent = () =>
  {
    const {loading,currentUser} = useSelector((state) => state.user);
    console.log("🚀 ~ Profile ~ currentUser:", currentUser)

    
    switch (activeTab) {
      case "About me":
        return (
          <div>
            {/* Main Profile Section */}
            {/* Profile Header with Image */}
            <div className="flex mb-8">
              <div className="flex items-end">
                <img
                  src="https://live-s3-bucket-sjwburhj9xhf.cdn.live.tandem.net/34/4d/d0e8188a857c31a121b883fdf630da9e.jpg" // Replace with your image path
                  alt="Profile"
                  className="rounded-full mb-3 w-44 h-44 object-cover border border-gray-300"
                />
                <button className="text-blue-500 hover:underline flex items-center gap-2 ml-4">
                  <AiTwotoneEdit size={20} />
                  Edit
                </button>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="grid grid-cols-1">
              <div className="relative border-b py-6 flex items-center w-full justify-between">
                <div className="flex items-center gap-5">
                  <label className="block text-2xl font-semibold text-[#222]">
                    Name
                  </label>
                  <p className="text-gray-700"> {currentUser?.username}</p>
                </div>
                <button className="text-blue-500 hover:underline flex items-center gap-2 ml-4">
                  <AiTwotoneEdit size={20} />
                  Edit
                </button>
              </div>
              <div className="relative border-b py-6 flex items-center w-full justify-between">
                <div className="flex items-center gap-5">
                  <label className="block text-2xl font-semibold text-[#222]">
                    Tandem ID
                  </label>
                  <p className="text-gray-700">sevil20936353</p>
                </div>
                <button className="text-blue-500 hover:underline flex items-center gap-2 ml-4">
                  <AiTwotoneEdit size={20} />
                  Edit
                </button>
              </div>
              <div className="relative border-b py-6 flex items-center w-full justify-between">
                <div className="flex items-center gap-5">
                  <label className="block text-2xl font-semibold text-[#222]">
                    Date of Birth
                  </label>
                  <p className="text-gray-700">08/14/1993</p>
                </div>
                <button className="text-blue-500 hover:underline flex items-center gap-2 ml-4">
                  <AiTwotoneEdit size={20} />
                  Edit
                </button>
              </div>
              <div className="relative border-b py-6 flex items-center w-full justify-between">
                <div className="flex items-center gap-5">
                  <label className="block text-2xl font-semibold text-[#222]">
                    Location
                  </label>
                  <p className="text-gray-700">New Westminster, Canada</p>
                </div>
                <button className="text-blue-500 hover:underline flex items-center gap-2 ml-4">
                  <AiTwotoneEdit size={20} />
                  Edit
                </button>
              </div>
            </div>

            {/* About Me Section */}
            <div className="my-8">
              <h2 className="block text-2xl font-semibold text-[#222] mb-4">
                About me
              </h2>
              <div className="space-y-4">
                <div className="border-b py-5">
                  <p className="text-md font-semibold text-[#222]">
                    What do you like to talk about?
                  </p>
                  <p className="text-gray-700">Natures</p>
                </div>
                <div className="border-b py-5">
                  <p className="text-md font-semibold text-[#222]">
                    What's your ideal language exchange partner like?
                  </p>
                  <p className="text-gray-700">Smart, educated</p>
                </div>
                <div className="border-b py-5">
                  <p className="text-md font-semibold text-[#222]">
                    What are your language learning goals?
                  </p>
                  <p className="text-gray-700">Becoming fluent</p>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Photos
              </h2>
              <div className="grid md:grid-cols-5 grid-cols-3 gap-3">
                {Array(5)
                  .fill("")
                  .map((_, index) => (
                    <div
                      key={index}
                      className="border-2 border-dashed border-blue-300 rounded-lg h-24 flex justify-center items-center"
                    >
                      <span className="text-gray-400 text-xl">+</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );
      case "Languages":
        return (
          <div className="space-y-6">
            <LanguageSection
              title="I am native in"
              flagSrc="https://app.tandem.net/static/shared/flags/languages/en-uk.svg"
              language="English (English)"
            />
            <LanguageSection
              title="I am fluent in"
              flagSrc="https://app.tandem.net/static/shared/flags/languages/fr.svg"
              language="French (Français)"
            />
            <LanguageSection
              title="I am learning"
              flagSrc="https://app.tandem.net/static/shared/flags/languages/zh-tw.svg"
              language="Chinese (Traditional) (中文 (繁體))"
              proficiency="Beginner"
              level={2} // Adjust the level according to proficiency
            />
            <LanguageSection
              title="Translate incoming messages to"
              language="No languages selected"
            />
          </div>
        );
      case "Learning Preferences":
        return (
          <div className="space-y-2">
            <SettingSection title="Communication" />
            <SettingSection title="Time Commitment" />
            <SettingSection title="Learning Schedule" />
            <SettingSection title="Correction Preference" />
          </div>
        );
      case "Topics":
        return <Topics />;
      case "Following":
        return <Following />;
      case "Settings":
        return <Settings />;
      case "Visitors":
        return <Visitors />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12">
      <div className="w-full max-w-[1300px] mx-auto">
        {/* Profile Header */}
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 mb-6 p-4 w-full bg-white rounded-lg border pb-4">
          <h1 className="md:text-4xl text-3xl font-semibold text-gray-700">
            My Profile
          </h1>
          <div>
            <div className="flex items-center md:justify-start justify-between gap-4">
              <button className="hover:bg-primary transition-all hover:text-white border rounded-full px-6 py-2 text-[#222] hover:text-gray-700">
                Preview profile
              </button>
              <button className="hover:bg-primary transition-all hover:text-white border rounded-full px-6 py-2 text-[#222] hover:text-gray-700">
                Share profile
              </button>
            </div>
            <div className="flex items-center md:justify-start justify-between gap-4 mt-5">
              <span className="text-sm text-[#222]">
                Show me in the Community
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-lg border flex md:flex-row flex-col p-6">
          {/* Sidebar */}
          <div className="md:w-1/4 border-r overflow-auto border-gray-300 pr-6">
            <ul className="flex md:flex-col flex-row items-start gap-5 text-base">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    activeTab === item.label
                      ? "md:bg-gray-200 md:text-[#222] text-blue-500"
                      : "text-[#222]"
                  }  rounded-full px-7 py-2 md:hover:bg-gray-200 transition-all flex text-center  w-30 md:text-lg hover:text-gray-700 cursor-pointer transition-all ease-in-out`}
                  onClick={() => setActiveTab(item.label)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Profile Section */}
          <div className="md:w-3/4 md:pl-6">
            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
