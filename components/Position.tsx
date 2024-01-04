import UpTrendIcon from "@/public/svg/up-trend.svg"
import DownTrendIcon from "@/public/svg/down-trend.svg"
import { Position } from "@/types"

export default function Position({ position }: { position: Position }) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-4'>
        <div className='grid h-12 w-12 place-content-center rounded-lg bg-secondary'>
          {position.value > 0 ? (
            <UpTrendIcon className='h-7 w-7 fill-green-400' />
          ) : (
            <DownTrendIcon className='h-7 w-7 fill-red-400' />
          )}
        </div>
        <div className='space-2'>
          <p>
            {position.currencyPair === "" ? (
              <span className='text-gray-500'>--</span>
            ) : (
              position.currencyPair
            )}
          </p>
          <p className='text-secondary-foreground'>
            {position.lot === 0 ? <span className='text-gray-500'>--</span> : position.lot}
          </p>
        </div>
      </div>
      <p
        data-ispositive={position.value > 0}
        className='text-green-400 data-[ispositive=false]:text-red-400'
      >
        ${Math.abs(position.value)}
      </p>
    </div>
  )
}
