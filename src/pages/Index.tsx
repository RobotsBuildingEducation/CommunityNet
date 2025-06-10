// src/pages/Index.tsx
import { useSeoMeta } from "@unhead/react";
import { LoginArea } from "@/components/auth/LoginArea";
import { useNostrPublish } from "@/hooks/useNostrPublish";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Index() {
  useSeoMeta({
    title: "CommunityNet – Decentralized Organizing Platform",
    description:
      "A modern Nostr client application built with React, TailwindCSS, and Nostrify.",
  });

  const { mutateAsync: publish } = useNostrPublish();
  const { user } = useCurrentUser();

  const createEvent = async (content: string) => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    try {
      await publish({ kind: 1, content });
      alert("Event published to Nostr!");
    } catch (error) {
      console.error(error);
      alert("Failed to publish event");
    }
  };

  const addResource = () => {
    const msg = prompt("Describe the resource or skill you want to offer:");
    if (msg) createEvent(`[resource] ${msg}`);
  };

  const requestHelp = () => {
    const msg = prompt("Describe the help you need:");
    if (msg) createEvent(`[help] ${msg}`);
  };

  const startAction = () => {
    const msg = prompt("Describe the organizing action:");
    if (msg) createEvent(`[action] ${msg}`);
  };

  const shareKnowledge = () => {
    const msg = prompt("Share your knowledge:");
    if (msg) createEvent(`[knowledge] ${msg}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* — Header — */}
        <div className="bg-white/90 dark:bg-gray-900/75 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">CommunityNet</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Decentralized organizing platform for community power
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <span>Connected to 47 local nodes</span>
            </div>
          </div>
          <div
            className="flex item
          s-center gap-4"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Oakland, CA • Neighborhood: Fruitvale
            </div>
            <LoginArea className="w-full max-w-sm" />
          </div>
        </div>

        {/* — Three-column cards — */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Urgent Needs */}
          <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:-translate-y-1 transform transition">
            <h3 className="text-xl font-semibold mb-4">
              🚨 Urgent Community Needs
            </h3>
            <div className="space-y-3" onClick={startAction}>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">
                  Eviction Defense - Tomorrow 9AM
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>0.3 miles away</span>
                  <span>12 people responding</span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">
                  Food Distribution - This Weekend
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Community Center</span>
                  <span>Need 6 more volunteers</span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">Legal Observer Training</div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Tuesday 7PM</span>
                  <span>Virtual + In-person</span>
                </div>
              </div>
            </div>
          </div>

          {/* Available Resources */}
          <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:-translate-y-1 transform transition">
            <h3 className="text-xl font-semibold mb-4">
              🤝 Available Resources
            </h3>
            <div className="space-y-3" onClick={addResource}>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">Maria: Bilingual legal aid</div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Immigration law</span>
                  <span>Available weekends</span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">
                  Tech Collective: Digital security
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Phone/computer security</span>
                  <span>Sliding scale</span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">
                  Community Garden: Fresh produce
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Tuesday/Saturday pickup</span>
                  <span>No questions asked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Organizing Actions */}
          <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:-translate-y-1 transform transition">
            <h3 className="text-xl font-semibold mb-4">
              ⚡ Organizing Actions
            </h3>
            <div className="space-y-3" onClick={startAction}>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">Rent Strike Planning</div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Building at 14th & Market</span>
                  <span>23 tenants coordinating</span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">Community Land Trust Meeting</div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Thursday 6:30PM</span>
                  <span>Liberation Café</span>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 cursor-pointer">
                <div className="font-medium">Cop Watch Training</div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <span>Know your rights</span>
                  <span>Safe documentation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* — Map Section — */}
        <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Community Activity Map</h3>
          <div className="relative rounded-xl h-64 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center space-y-1">
              <p>Interactive neighborhood map showing:</p>
              <p>
                🔴 Urgent needs • 🟢 Available resources • ⚡ Organizing actions
              </p>
            </div>
            <div className="absolute inset-0">
              {[
                { top: "20%", left: "30%", color: "bg-red-500" },
                { top: "40%", left: "60%", color: "bg-green-500" },
                { top: "70%", left: "25%", color: "bg-blue-500" },
                { top: "50%", left: "80%", color: "bg-red-500" },
                { top: "30%", left: "45%", color: "bg-green-500" },
                { top: "60%", left: "70%", color: "bg-blue-500" },
              ].map((pt, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${pt.color} cursor-pointer`}
                  style={{ top: pt.top, left: pt.left }}
                  onClick={startAction}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              className="px-4 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={addResource}
            >
              Add Resource/Skill
            </button>
            <button
              className="px-4 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={requestHelp}
            >
              Request Help
            </button>
            <button
              className="px-4 py-2 rounded-md font-semibold bg-white/80 text-gray-800 border border-gray-300 hover:bg-white transition"
              onClick={startAction}
            >
              Start Organizing Action
            </button>
            <button
              className="px-4 py-2 rounded-md font-semibold bg-white/80 text-gray-800 border border-gray-300 hover:bg-white transition"
              onClick={shareKnowledge}
            >
              Share Knowledge
            </button>
          </div>
        </div>

        {/* — Network Status — */}
        <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Network Status</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Decentralized on NOSTR protocol • No central servers •
            Community-controlled nodes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: 847, label: "Active community members" },
              { num: 23, label: "Ongoing organizing campaigns" },
              { num: 156, label: "Successful mutual aid connections" },
              { num: 12, label: "Community-run nodes" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stat.num}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
