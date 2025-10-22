// PlannerEditor 로직을 관리하는 커스텀 훅
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import type { Place, Plan } from "@/types/place";
import { savePlanToSession, fetchPlaceWithCoords } from "@/apis/plannerApi";
import { generateDays, validatePlan, coercePlace } from "@/utils/plannerHelpers";

interface UsePlannerEditorProps {
  initialPlaces: Place[];
  existingTripTitle?: string;
  existingPlan?: Plan;
}

export const usePlannerEditor = ({
  initialPlaces = [],
  existingTripTitle = "",
  existingPlan = {},
}: UsePlannerEditorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tripIdToEdit = searchParams.get("trip_id");
  const startDateStr = searchParams.get("start");
  const endDateStr = searchParams.get("end");

  const [startDate, setStartDate] = useState(startDateStr);
  const [endDate, setEndDate] = useState(endDateStr);
  const [tripTitle, setTripTitle] = useState(existingTripTitle);
  const [plan, setPlan] = useState<Plan>(existingPlan);
  const [activeDay, setActiveDay] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  // 날짜 배열 생성
  const days = useMemo(() => {
    return generateDays(startDate, endDate);
  }, [startDate, endDate]);

  // 새 일정 모드에서만 빈 day 배열 초기화
  useEffect(() => {
    if (tripIdToEdit) return;
    if (days.length === 0) return;

    setPlan((prev) => {
      if (Object.keys(prev).length > 0) return prev;

      const next: Plan = {};
      for (const d of days) {
        next[d.day] = [];
      }
      return next;
    });

    if (activeDay < 1 || activeDay > days.length) {
      setActiveDay(1);
    }
  }, [days.length, tripIdToEdit, activeDay]);

  // AI 추천 계획 처리
  useEffect(() => {
    const aiGeneratedPlanStr = searchParams.get("aiPlan");
    const aiGeneratedTitle = searchParams.get("aiTitle");

    if (aiGeneratedPlanStr) {
      if (aiGeneratedTitle) {
        setTripTitle(aiGeneratedTitle);
      }

      const aiPlanData = JSON.parse(aiGeneratedPlanStr);
      const newPlan: Plan = {};

      for (const day in aiPlanData) {
        const dayNumber = parseInt(day, 10);
        if (!newPlan[dayNumber]) {
          newPlan[dayNumber] = [];
        }

        const placesForDay = aiPlanData[day]
          .map((p: { place_name: string }, index: number) => {
            const fullPlaceInfo = initialPlaces.find(
              (ip) => ip.place_name === p.place_name
            );
            if (fullPlaceInfo) {
              return {
                ...coercePlace(fullPlaceInfo),
                visit_order: index + 1,
                day_number: dayNumber,
              };
            }
            return null;
          })
          .filter((p: Place | null): p is Place => p !== null);

        newPlan[dayNumber] = placesForDay;
      }
      setPlan(newPlan);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 날짜 변경 시 plan 정리
  useEffect(() => {
    if (days.length === 0) return;

    setPlan((prevPlan) => {
      const newPlan: Plan = {};
      const maxDay = days.length;

      for (let day = 1; day <= maxDay; day++) {
        newPlan[day] = prevPlan[day] || [];
      }

      return newPlan;
    });

    if (activeDay > days.length) {
      setActiveDay(1);
    }
  }, [days, activeDay]);

  // 장소 추가
  const handleAddPlace = async (rawPlace: Place, targetDay?: number) => {
    if (!days.length) return;

    const day = targetDay ?? activeDay;
    let place = coercePlace(rawPlace);

    // 좌표 정보가 없으면 DB에서 가져오기
    if (place.latitude == null || place.longitude == null) {
      const filled = await fetchPlaceWithCoords(place.place_id);
      if (filled) {
        place = { ...place, ...filled };
      }
    }

    if (!place.place_id) {
      alert("장소 정보가 올바르지 않습니다.");
      return;
    }

    setPlan((prev) => {
      const curr = prev[day] ?? [];

      // 중복 체크
      if (curr.some((p) => p.place_id === place.place_id)) {
        return prev;
      }

      const nextDayList = [
        ...curr,
        { ...place, visit_order: curr.length + 1, day_number: day },
      ];
      return { ...prev, [day]: nextDayList };
    });
  };

  // 장소 제거
  const handleRemovePlace = (day: number, placeId: string) => {
    setPlan((prev) => {
      const filtered = (prev[day] || []).filter((p) => p.place_id !== placeId);
      const reordered = filtered.map((p, i) => ({
        ...p,
        visit_order: i + 1,
        day_number: day,
      }));
      return { ...prev, [day]: reordered };
    });
  };

  // DnD 정렬
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPlan((prev) => {
      const list = prev[activeDay] || [];
      const oldIndex = list.findIndex((p) => p.place_id === active.id);
      const newIndex = list.findIndex((p) => p.place_id === over.id);

      if (oldIndex < 0 || newIndex < 0) return prev;

      const reordered = arrayMove(list, oldIndex, newIndex).map((p, i) => ({
        ...p,
        visit_order: i + 1,
        day_number: activeDay,
      }));

      return { ...prev, [activeDay]: reordered };
    });
  };

  // 미리보기
  const handlePreviewPlan = () => {
    const validation = validatePlan(tripTitle, plan);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    setIsSaving(true);
    try {
      savePlanToSession({
        tripIdToEdit: tripIdToEdit ?? null,
        tripTitle,
        startDateStr: startDate || "",
        endDateStr: endDate || "",
        plan,
      });
      router.push("/planner/preview");
    } catch {
      alert("미리보기 데이터를 저장하는 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    // State
    tripIdToEdit,
    startDate,
    endDate,
    tripTitle,
    plan,
    activeDay,
    isSaving,
    selectedPlaceId,
    days,

    // Setters
    setStartDate,
    setEndDate,
    setTripTitle,
    setActiveDay,
    setSelectedPlaceId,

    // Handlers
    handleAddPlace,
    handleRemovePlace,
    handleDragEnd,
    handlePreviewPlan,
  };
};
