import Position from "@/components/Position";
import { apiGetUserPositions } from "@/lib/api";

import { Button } from "@/components/ui/button";
import DeleteIcon from "@/public/svg/delete.svg";
import ClearHistoryDialog from "@/components/ClearHistoryDialog";

export default async function Positions() {
  const posisitons = await apiGetUserPositions();

  return (
    <main className="flex overflow-hidden flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1>Posistions</h1>

        <ClearHistoryDialog>
          <Button
            disabled={posisitons.length === 0}
            variant="outline"
            size="icon"
          >
            <DeleteIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
          </Button>
        </ClearHistoryDialog>
      </div>

      <div className="overflow-y-auto pr-2 relative flex-col space-y-4">
        {posisitons?.length !== 0 ? (
          posisitons?.map((position) => (
            <Position key={position.id} position={position} />
          ))
        ) : (
          <p className="text-gray-400 -translate-x-1/2 -translate-y-1/2 absolute text-sm top-1/2 left-1/2">
            Start adding positions!
          </p>
        )}
      </div>
    </main>
  );
}
