"use client";

import { supabase } from "@/lib/supabaseClient";
import {
  differenceInCalendarDays,
  isAfter,
  isBefore,
  isWithinInterval,
} from "date-fns";
import { useEffect, useState } from "react";

interface TripPlan {
  trip_id: number;
  trip_title: string;
  trip_start_date: string;
  trip_end_date: string;
  created_at: string;
}

interface PlanListProps {
  initialPlans: TripPlan[];
}

export default function PlanList({ initialPlans }: PlanListProps) {
  const [plans, setPlans] = useState<TripPlan[]>(initialPlans);

  useEffect(() => {
    setPlans(initialPlans);
  }, [initialPlans]);

  const handleDelete = async (tripId: number) => {
    const isConfirmed = confirm(
      "정말 이 일정을 삭제하시겠습니까? 관련된 모든 상세 일정이 함께 삭제됩니다."
    );
    if (!isConfirmed) return;

    try {
      const { error: detailError } = await supabase
        .from("trip_plan_detail")
        .delete()
        .eq("trip_id", tripId);
      if (detailError) throw detailError;

      const { error: planError } = await supabase
        .from("trip_plan")
        .delete()
        .eq("trip_id", tripId);
      if (planError) throw planError;

      setPlans((prevPlans) =>
        prevPlans.filter((plan) => plan.trip_id !== tripId)
      );

      alert("일정이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("일정 삭제에 실패했습니다.");
    }
  };

  // 상태 및 태그 계산 함수
  const getTripInfo = (start: string, end: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 날짜만 비교

    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setHours(0, 0, 0, 0);

    // 상태 계산
    let status = "";
    let statusColor = "";

    if (isBefore(today, startDate)) {
      // 오늘이 시작일보다 이전 → 여행예정
      status = "여행예정";
      statusColor = "bg-blue-100 text-blue-700";
    } else if (isWithinInterval(today, { start: startDate, end: endDate })) {
      // 오늘이 시작일과 종료일 사이 (종료일 당일 포함) → 여행중
      status = "여행중";
      statusColor = "bg-green-100 text-green-700";
    } else {
      // 오늘이 종료일보다 이후 → 여행종료
      status = "여행종료";
      statusColor = "bg-gray-100 text-gray-600";
    }

    // 숙박일 계산
    const nights = differenceInCalendarDays(endDate, startDate);
    const days = nights + 1;
    const duration = `${nights}박 ${days}일`;

    return { status, statusColor, duration };
  };

  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
        <svg
          className="w-12 h-12 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-lg font-medium">등록된 여행 일정이 없습니다.</p>
        <p className="text-sm text-gray-400 mt-1">
          새로운 여행 계획을 만들어보세요.
        </p>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const { status, statusColor, duration } = getTripInfo(
          plan.trip_start_date,
          plan.trip_end_date
        );

        return (
          <a
            key={plan.trip_id}
            href={`/my-planner/${plan.trip_id}`}
            className="relative flex flex-col bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer"
          >
            {/* 상단: 기간 태그 & 상태 태그 */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border shadow-sm
    ${
      status === "여행예정"
        ? "bg-white border-blue-100 text-gray-700"
        : status === "여행중"
        ? "bg-white border-green-100 text-gray-700"
        : "bg-white border-gray-100 text-gray-700"
    }`}
              >
                {duration}
              </span>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full shadow-sm
      ${
        status === "여행예정"
          ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
          : status === "여행중"
          ? "bg-gradient-to-r from-green-100 to-emerald-200 text-emerald-800"
          : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
      }`}
              >
                {status === "여행예정" && (
                  <svg
                    className="w-3 h-3 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4h2v6H9V4zm0 8h2v2H9v-2z" />
                  </svg>
                )}
                {status === "여행중" && (
                  <svg
                    className="w-3 h-3 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 4H9v5h2V6zm0 6H9v2h2v-2z" />
                  </svg>
                )}
                {status === "여행종료" && (
                  <svg
                    className="w-3 h-3 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 4h2v6H9V6zm0 8h2v2H9v-2z" />
                  </svg>
                )}
                {status}
              </span>
            </div>

            {/* 제목 */}
            <h2 className="text-base font-bold text-gray-900 mb-2 truncate">
              {plan.trip_title}
            </h2>

            {/* 날짜 */}
            <p className="text-sm text-gray-600 mb-3">
              {new Date(plan.trip_start_date).toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
              })}{" "}
              ~{" "}
              {new Date(plan.trip_end_date).toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* 버튼 영역 */}
            <div className="flex justify-end mt-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(plan.trip_id);
                }}
                className="px-3 py-1.5 text-sm text-red-600 font-semibold hover:text-red-700 hover:bg-red-50 rounded-lg transition"
              >
                삭제
              </button>
            </div>
          </a>
        );
      })}
    </main>
  );
}
