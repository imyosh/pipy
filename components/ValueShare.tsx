import { ValueShareType } from "@/types";
import ValueShareOptions from "./ValueShareOptions";

export default function ValueShare({ share }: { share: ValueShareType }) {
  return (
    <div className="relative flex flex-1 flex-col gap-2 rounded-xl border p-4">
      <h2 className="text-xs font-bold capitalize text-secondary-foreground">
        {share.title}
      </h2>
      <ValueShareOptions target={share} />
      <p className="text-2xl">
        <span className="text-xl">$</span>
        {share.value.toFixed(2)}
      </p>
    </div>
  );
}
