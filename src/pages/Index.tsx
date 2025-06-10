// src/pages/Index.tsx
import { useSeoMeta } from "@unhead/react";
import { LoginArea } from "@/components/auth/LoginArea";
import MainFeed from "@/components/MainFeed";
import { PostFormDialog } from "@/components/PostFormDialog";
import { FeedDialog } from "@/components/FeedDialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NoteContent } from "@/components/NoteContent";
import { useCommunityNetFeed } from "@/hooks/useCommunityNetFeed";
import { hasTag } from "@/lib/utils";

export default function Index() {
  useSeoMeta({
    title: "CommunityNet – Decentralized Organizing Platform",
    description:
      "A modern Nostr client application built with React, TailwindCSS, and Nostrify.",
  });

  const { data: events = [] } = useCommunityNetFeed();

  const resources = events.filter(
    (e) => hasTag(e, "resource") || e.content.includes("[resource]")
  );
  const help = events.filter(
    (e) => hasTag(e, "help") || e.content.includes("[help]")
  );
  const actions = events.filter(
    (e) => hasTag(e, "action") || e.content.includes("[action]")
  );
  const knowledge = events.filter(
    (e) => hasTag(e, "knowledge") || e.content.includes("[knowledge]")
  );

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
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Oakland, CA • Neighborhood: Fruitvale
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
                  Show Feed
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <MainFeed />
              </DialogContent>
            </Dialog>
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
            <div className="space-y-3">
              {help.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                >
                  <NoteContent event={ev} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <PostFormDialog
                prefix="[help]"
                title="Request Help"
                withDetails
                trigger={
                  <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
                    Request Help
                  </button>
                }
              />
              <FeedDialog
                events={help}
                title="Help Requests"
                trigger={
                  <button className="px-4 py-2 rounded-md bg-white/80 text-gray-800 border border-gray-300">
                    Show Feed
                  </button>
                }
              />
            </div>
          </div>

          {/* Available Resources */}
          <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:-translate-y-1 transform transition">
            <h3 className="text-xl font-semibold mb-4">
              🤝 Available Resources
            </h3>
            <div className="space-y-3">
              {resources.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                >
                  <NoteContent event={ev} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <PostFormDialog
                prefix="[resource]"
                title="Add Resource"
                withDetails
                trigger={
                  <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
                    Add Resource
                  </button>
                }
              />
              <FeedDialog
                events={resources}
                title="Resources"
                trigger={
                  <button className="px-4 py-2 rounded-md bg-white/80 text-gray-800 border border-gray-300">
                    Show Feed
                  </button>
                }
              />
            </div>
          </div>

          {/* Organizing Actions */}
          <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:-translate-y-1 transform transition">
            <h3 className="text-xl font-semibold mb-4">
              ⚡ Organizing Actions
            </h3>
            <div className="space-y-3">
              {actions.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                >
                  <NoteContent event={ev} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <PostFormDialog
                prefix="[action]"
                title="Start Action"
                withDetails
                trigger={
                  <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
                    Start Action
                  </button>
                }
              />
              <FeedDialog
                events={actions}
                title="Actions"
                trigger={
                  <button className="px-4 py-2 rounded-md bg-white/80 text-gray-800 border border-gray-300">
                    Show Feed
                  </button>
                }
              />
            </div>
          </div>

          {/* Shared Knowledge */}
          <div className="bg-white/90 dark:bg-gray-800/75 backdrop-blur-md rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 hover:-translate-y-1 transform transition">
            <h3 className="text-xl font-semibold mb-4">📚 Shared Knowledge</h3>
            <div className="space-y-3">
              {knowledge.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                >
                  <NoteContent event={ev} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <PostFormDialog
                prefix="[knowledge]"
                title="Share Knowledge"
                withDetails
                trigger={
                  <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
                    Share Knowledge
                  </button>
                }
              />
              <FeedDialog
                events={knowledge}
                title="Knowledge"
                trigger={
                  <button className="px-4 py-2 rounded-md bg-white/80 text-gray-800 border border-gray-300">
                    Show Feed
                  </button>
                }
              />
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
                <PostFormDialog
                  key={i}
                  prefix="[action]"
                  title="Start Action"
                  withDetails
                  trigger={
                    <div
                      className={`absolute w-3 h-3 rounded-full ${pt.color} cursor-pointer`}
                      style={{ top: pt.top, left: pt.left }}
                    />
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <PostFormDialog
              prefix="[resource]"
              title="Add Resource"
              withDetails
              trigger={
                <button className="px-4 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
                  Add Resource/Skill
                </button>
              }
            />
            <PostFormDialog
              prefix="[help]"
              title="Request Help"
              withDetails
              trigger={
                <button className="px-4 py-2 rounded-md font-semibold bg-blue-600 text-white hover:bg-blue-700 transition">
                  Request Help
                </button>
              }
            />
            <PostFormDialog
              prefix="[action]"
              title="Start Action"
              withDetails
              trigger={
                <button className="px-4 py-2 rounded-md font-semibold bg-white/80 text-gray-800 border border-gray-300 hover:bg-white transition">
                  Start Organizing Action
                </button>
              }
            />
            <PostFormDialog
              prefix="[knowledge]"
              title="Share Knowledge"
              withDetails
              trigger={
                <button className="px-4 py-2 rounded-md font-semibold bg-white/80 text-gray-800 border border-gray-300 hover:bg-white transition">
                  Share Knowledge
                </button>
              }
            />
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
