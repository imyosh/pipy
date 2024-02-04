import { ValueShareType } from "@/types";
import ValueShareOptions from "./ValueShareOptions";

export default function ValueShare({ share }: { share: ValueShareType }) {
  return (
    <div className="relative flex flex-1 flex-col gap-2 rounded-xl border p-3">
      <h2 className="text-xs font-bold capitalize text-secondary-foreground">
        {share.title}
      </h2>
      <ValueShareOptions target={share} />
      <p className="text-2xl leading-none">
        <span className="text-xl">$</span>
        {share.value.toFixed(1)}
      </p>

      {share.handler !== "mine" && (
        <p className="text-[0.6rem] z-20 text-green-200 bottom-[0.9rem] right-3 absolute">
          {share.percentage * 100}%
        </p>
      )}
    </div>
  );
}
