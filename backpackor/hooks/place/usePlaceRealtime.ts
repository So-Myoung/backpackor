// 여행지 실시간 업데이트 훅
"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@/lib/supabaseClient";
import type { Place } from "@/types/place";

export const usePlaceRealtime = (initialPlaces: Place[]) => {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);

  useEffect(() => {
    const supabase = createBrowserClient();

    const channel = supabase
      .channel("place_rating_changes")
      .on(
        "postgres_changes" as const,
        {
          event: "UPDATE",
          schema: "public",
          table: "place",
        },
        (payload: any) => {
          const updated = payload.new as Place;
          setPlaces((prev) =>
            prev.map((p) =>
              p.place_id === updated.place_id
                ? { ...p, average_rating: updated.average_rating }
                : p
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return places;
};
