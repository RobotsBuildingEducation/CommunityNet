import { useSeoMeta } from "@unhead/react";
import { LoginArea } from "@/components/auth/LoginArea";
import { useNeopetsFeed } from "@/hooks/useNeopetsFeed";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import PetCard from "@/components/pets/PetCard";
import PetFormDialog from "@/components/pets/PetFormDialog";

export default function Index() {
  useSeoMeta({
    title: "NeoPets Collector",
    description: "Collect, trade, and zap digital pets across Nostr.",
  });

  const { data: events = [] } = useNeopetsFeed();
  const { user } = useCurrentUser();

  const myPets = events.filter((e) => user && e.pubkey === user.pubkey);
  const otherPets = events.filter((e) => !user || e.pubkey !== user.pubkey);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-purple-600 text-gray-900 dark:text-gray-100">
      <header className="text-center py-12 text-white space-y-2">
        <h1 className="text-4xl font-extrabold">NeoPets Collector</h1>
        <p className="text-lg">Collect and trade digital pets across Nostr</p>
        <p className="text-sm">
          <a
            href="https://soapbox.pub/tools/mkstack/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vibed with MKStack
          </a>
        </p>
      </header>
      <div className="container mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-6">
          <LoginArea />
          <PetFormDialog
            trigger={
              <button className="px-4 py-2 rounded-md bg-white text-gray-800">Mint Pet</button>
            }
          />
        </div>

        {myPets.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">My Pets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {myPets.map((ev) => (
                <PetCard key={ev.id} event={ev} />
              ))}
            </div>
          </>
        )}

        <h2 className="text-2xl font-bold text-white mb-4">Latest Pets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherPets.map((ev) => (
            <PetCard key={ev.id} event={ev} />
          ))}
        </div>
      </div>
    </div>
  );
}
