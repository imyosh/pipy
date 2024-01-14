"use client";

import { TouchEventHandler, useState } from "react";
import UpTrendIcon from "@/public/svg/up-trend.svg";
import DownTrendIcon from "@/public/svg/down-trend.svg";
import { IdPosition, Position } from "@/types";
import { Button } from "./ui/button";

import SwipeToRevealActions from "react-swipe-to-reveal-actions";
import DeletePositionAlertDialog from "./DeletePositionAlertDialog";
import DeleteIcon from "@/public/svg/delete.svg";

export default function Position({ position }: { position: IdPosition }) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  let handleTouchStart: TouchEventHandler = function (e) {
    setTouchStart(e.targetTouches[0].clientX);
  };

  let handleTouchMove: TouchEventHandler = function (e) {
    console.log(e.targetTouches);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  let handleTouchEnd: TouchEventHandler = function () {
    console.log("handleTouchEnd");
    if (touchStart - touchEnd > 150) {
      console.log("left swip");
      // do your stuff here for left swipe
    }

    if (touchStart - touchEnd < -150) {
      console.log("right swip");

      // do your stuff here for right swipe
    }

    setTouchEnd(0);
    setTouchStart(0);
  };

  return (
    <SwipeToRevealActions
      hideDotsButton
      height="48px"
      actionButtons={[
        {
          content: (
            <DeletePositionAlertDialog position={position}>
              <Button variant="outline" size="icon">
                <DeleteIcon className="h-4 w-4 fill-[#90929D] transition group-hover:fill-[#fff]" />
              </Button>
            </DeletePositionAlertDialog>
          ),
          onClick: () => {},
        },
      ]}
      actionButtonMinWidth={70}
    >
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-content-center rounded-lg bg-secondary">
            {position.value > 0 ? (
              <UpTrendIcon className="h-7 w-7 fill-green-400" />
            ) : (
              <DownTrendIcon className="h-7 w-7 fill-red-400" />
            )}
          </div>
          <div className="space-2">
            <p>
              {position.currencyPair === "" ? (
                <span className="text-gray-500">--</span>
              ) : (
                position.currencyPair
              )}
            </p>
            <p className="text-secondary-foreground">
              {position.lot === 0 ? (
                <span className="text-gray-500">--</span>
              ) : (
                position.lot
              )}
            </p>
          </div>
        </div>
        <p
          data-ispositive={position.value > 0}
          className="text-green-400 data-[ispositive=false]:text-red-400"
        >
          ${Math.abs(position.value)}
        </p>
      </div>
    </SwipeToRevealActions>
  );
}
