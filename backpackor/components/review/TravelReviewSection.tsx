// @/component/review/TravelReviewSection.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import type { Review } from "@/types/review";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HelpfulButton } from "@/components/review/HelpfulButton";

interface ReviewWithProfile extends Review {
  profiles: {
    display_name: string;
  } | null;
}

interface TravelReviewSectionProps {
  placeId: string;
  averageRating: number;
  reviewCount: number;
  showReviewButton?: boolean;
  placeName?: string;
}

const TravelReviewSection: React.FC<TravelReviewSectionProps> = ({
  placeId,
  averageRating: initialAverageRating,
  reviewCount: initialReviewCount,
  showReviewButton = false,
  placeName = "",
}) => {
  const router = useRouter();
  const [reviews, setReviews] = useState<ReviewWithProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actualReviewCount, setActualReviewCount] =
    useState(initialReviewCount);
  const [actualAverageRating, setActualAverageRating] =
    useState(initialAverageRating);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/apis/review?place_id=${placeId}`);

        if (!response.ok) {
          throw new Error("리뷰를 불러오는데 실패했습니다.");
        }

        const data = await response.json();
        setReviews(data.reviews || []);
        setActualReviewCount(data.count || 0);
        setActualAverageRating(data.averageRating || 0);
      } catch (err) {
        console.error("리뷰 로드 실패:", err);
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  if (loading) {
    return (
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">리뷰 로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="p-5 text-red-600 text-center">
          <p>리뷰를 불러오는데 실패했습니다.</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          여행지 리뷰 ({actualReviewCount}개)
        </h2>
        {actualReviewCount > 0 && (
          <span className="text-lg font-semibold text-yellow-500">
            ⭐ {actualAverageRating.toFixed(1)}
          </span>
        )}
      </div>

      {/* 리뷰 작성 버튼 */}
      {showReviewButton && (
        <button
          onClick={() =>
            router.push(
              `/review/write?placeId=${placeId}&placeName=${encodeURIComponent(
                placeName
              )}`
            )
          }
          className="group relative w-full mb-6 overflow-hidden rounded-lg border border-gray-900 bg-white px-6 py-3 transition-all hover:border-gray-700"
        >
          <div className="relative flex items-center justify-center gap-2">
            <span className="text-sm font-medium text-gray-900 transition-colors group-hover:text-gray-700">
              이 장소 리뷰 작성하기
            </span>
            <svg
              className="h-4 w-4 text-gray-900 transition-all group-hover:translate-x-1 group-hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      )}

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">아직 작성된 리뷰가 없습니다.</p>
            {showReviewButton && (
              <p className="text-sm text-gray-400">
                이 장소의 첫 번째 리뷰를 작성해보세요!
              </p>
            )}
          </div>
        ) : (
          reviews.map((review) => {
            return (
              <div
                key={review.review_id}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* 리뷰 헤더 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {review.profiles?.display_name || "익명 사용자"}
                    </span>
                    <span className="text-yellow-500 font-medium">
                      {"⭐".repeat(Math.floor(review.rating))}{" "}
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(review.created_at).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* 리뷰 제목 */}
                {review.review_title && (
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {review.review_title}
                  </h3>
                )}

                {/* 리뷰 내용 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {review.review_content}
                </p>

                {/* 리뷰 푸터 - 도움됨 버튼 (여행지 상세에서는 읽기 전용) */}
                <div className="flex items-center gap-4">
                  <HelpfulButton
                    reviewId={review.review_id}
                    initialHelpfulCount={review.helpful_count || 0}
                    readOnly={true}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TravelReviewSection;
