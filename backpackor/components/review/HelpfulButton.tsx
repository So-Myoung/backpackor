// 리뷰 도움됨 버튼 컴포넌트
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface HelpfulButtonProps {
  reviewId: string;
  initialHelpfulCount: number;
  onCountChange?: (newCount: number) => void;
  readOnly?: boolean; // 리뷰 목록에서는 클릭 불가능하게
}

export const HelpfulButton = ({
  reviewId,
  initialHelpfulCount,
  onCountChange,
  readOnly = false,
}: HelpfulButtonProps) => {
  const router = useRouter();
  const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // 로그인 사용자 확인 및 로컬 스토리지에서 도움됨 상태 불러오기
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // localStorage에서 사용자가 도움됨을 누른 리뷰 목록 불러오기
        const helpfulKey = `helpful_reviews_${user.id}`;
        const saved = localStorage.getItem(helpfulKey);
        if (saved) {
          const helpfulReviews = new Set(JSON.parse(saved));
          setIsHelpful(helpfulReviews.has(reviewId));
        }
      }
    };
    checkUser();
  }, [reviewId]);

  const handleHelpful = async () => {
    // readOnly 모드에서는 클릭 이벤트 무시
    if (readOnly) return;

    // 로그인 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const confirmLogin = confirm(
        "로그인이 필요한 기능입니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      if (confirmLogin) {
        router.push(
          `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        );
      }
      return;
    }

    // 이미 로딩 중이면 무시
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(`/apis/review/helpful`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          action: isHelpful ? "remove" : "add",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "도움됨 처리에 실패했습니다.");
      }

      const data = await response.json();

      // 카운트 업데이트
      setHelpfulCount(data.helpful_count);
      if (onCountChange) {
        onCountChange(data.helpful_count);
      }

      // 사용자 상태 업데이트
      const newIsHelpful = !isHelpful;
      setIsHelpful(newIsHelpful);

      // localStorage에 저장
      const helpfulKey = `helpful_reviews_${user.id}`;
      const saved = localStorage.getItem(helpfulKey);
      const helpfulReviews = new Set(saved ? JSON.parse(saved) : []);

      if (newIsHelpful) {
        helpfulReviews.add(reviewId);
      } else {
        helpfulReviews.delete(reviewId);
      }

      localStorage.setItem(helpfulKey, JSON.stringify([...helpfulReviews]));
    } catch (err) {
      console.error("도움됨 처리 실패:", err);
      alert(err instanceof Error ? err.message : "도움됨 처리에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleHelpful}
      disabled={isLoading || readOnly}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
        readOnly
          ? "border-gray-200 bg-gray-50 cursor-default"
          : isLoading
          ? "border-gray-200 bg-gray-50 cursor-not-allowed"
          : isHelpful
          ? "border-blue-500 bg-blue-50 hover:bg-blue-100 cursor-pointer"
          : "border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
      }`}
    >
      <span className="text-base">
        {isLoading ? "⏳" : "👍"}
      </span>
      <span
        className={`text-sm font-medium ${
          readOnly
            ? "text-gray-500"
            : isLoading
            ? "text-gray-400"
            : isHelpful
            ? "text-blue-600"
            : "text-gray-700"
        }`}
      >
        도움됐어요 {helpfulCount}
      </span>
    </button>
  );
};
