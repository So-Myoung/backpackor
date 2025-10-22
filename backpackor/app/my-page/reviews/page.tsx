"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { getReviewsByRegion } from "@/apis/reviewApi";
import { WriteButton, ReviewActionButtons } from "@/components/review/ReviewButton";
import { HelpfulButton } from "@/components/review/HelpfulButton";
import { RegionFilter } from "@/components/common/filter/RegionFilter";
import { useProfile } from "@/hooks/auth/useProfile";
import { supabase } from "@/lib/supabaseClient";
import type { ReviewWithImages } from "@/types/review";
import { formatDateShort } from "@/utils/dateFormat";
import { renderStars } from "@/utils/rating";
import {
  MY_PAGE_REVIEW_SORT_OPTIONS,
  SortOptions,
} from "@/components/common/filter/SortOptions";
import Image from "next/image";

// 개별 리뷰 카드 컴포넌트
function ReviewCard({
  review,
  user,
  onEdit,
  onDelete,
}: {
  review: ReviewWithImages;
  user: any;
  onEdit: (reviewId: string, e: React.MouseEvent) => void;
  onDelete: (reviewId: string) => void;
}) {
  const router = useRouter();
  const { profile, profileUrl, isLoading } = useProfile(review.user_id);
  const [placeName, setPlaceName] = useState<string>("");
  const [placeAddress, setPlaceAddress] = useState<string>("");

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      if (review.place_id) {
        const { data, error } = await supabase
          .from("place")
          .select("place_name, place_address")
          .eq("place_id", review.place_id)
          .single();

        if (!error && data) {
          setPlaceName(data.place_name);
          setPlaceAddress(data.place_address || "");
        }
      }
    };
    fetchPlaceInfo();
  }, [review.place_id]);

  return (
    <div
      onClick={() => router.push(`/review/detail/${review.review_id}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {review.images.length > 0 ? (
        <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
            <Image
                src={
                    review.images.sort((a, b) => a.image_order - b.image_order)[0]
                        .review_image
                }
                alt={review.review_title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority={false}
                onError={() => {
                    console.error("이미지 로드 실패");
                }}
            />

          {review.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{review.images.length}</span>
            </div>
          )}

          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-sm font-bold text-gray-900">
              {review.rating.toFixed(1)}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-start gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold text-gray-900 truncate mb-1">
                {placeName || "여행지 정보 없음"}
              </h4>
              {placeAddress && (
                <p className="text-xs text-gray-500 truncate">{placeAddress}</p>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-base font-bold mb-2 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
          {review.review_title}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex">{renderStars(review.rating)}</div>
        </div>

        <div className="mb-4 h-[2.5rem] flex items-start">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
            {review.review_content}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : (
                <Image
                    src={
                        profileUrl && profileUrl.trim() !== ""
                            ? profileUrl
                            : "https://rlnpoyrapczrsgmxtlrr.supabase.co/storage/v1/object/public/logo/profile/base.png"
                    }
                    alt={profile?.display_name || "프로필"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover shadow-sm ring-2 ring-gray-100"
                />
            )}
            <span className="text-sm font-semibold text-gray-700">
              {profile?.display_name || "익명"}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDateShort(review.created_at)}
          </span>
        </div>

        {/* 도움됨 버튼 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <HelpfulButton
            reviewId={review.review_id}
            initialHelpfulCount={review.helpful_count || 0}
          />
        </div>

        {user && user.id === review.user_id && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <ReviewActionButtons
              reviewId={review.review_id}
              onEdit={(e) => onEdit(review.review_id, e)}
              onDelete={() => onDelete(review.review_id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyReviewsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<ReviewWithImages[]>([]);
  const [sortedReviews, setSortedReviews] = useState<ReviewWithImages[]>([]);
  const [currentSort, setCurrentSort] = useState("created_desc");
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyReviews = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        // 전체 리뷰를 가져온 후 user_id로 필터링
        const data = await getReviewsByRegion(null);
        const myReviews = data.filter((r) => r.user_id === user.id);
        setReviews(myReviews);
      } catch (error) {
        console.error("내 리뷰 조회 오류:", error);
        alert("리뷰를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReviews();
  }, [user?.id]);

  // 필터링 및 정렬 로직
  useEffect(() => {
    let filtered = [...reviews];

    // 지역 필터링
    if (selectedRegionId !== null) {
      filtered = filtered.filter((r) => r.region_id === selectedRegionId);
    }

    // 정렬
    switch (currentSort) {
      case "created_desc":
        // 최신순
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "created_asc":
        // 오래된순
        filtered.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "helpful_desc":
        // 도움순
        filtered.sort((a, b) => (b.helpful_count || 0) - (a.helpful_count || 0));
        break;
      case "rating_desc":
        // 별점높은순
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "rating_asc":
        // 별점낮은순
        filtered.sort((a, b) => a.rating - b.rating);
        break;
    }

    setSortedReviews(filtered);
  }, [reviews, currentSort, selectedRegionId]);

  const handleDeleteCallback = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.review_id !== reviewId));
  };

  const handleEdit = (reviewId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/review/write?edit=${reviewId}`);
  };

  if (!user) {
    return <LoadingSpinner fullScreen message="사용자 정보를 불러오는 중..." />;
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen message="리뷰를 불러오는 중..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">내 리뷰</h1>
            <p className="text-gray-600 text-base">
              {reviews.length > 0
                ? `총 ${reviews.length}개의 리뷰를 작성했습니다.`
                : "아직 작성한 리뷰가 없습니다."}
            </p>
          </div>
          <WriteButton />
        </div>

        {/* 필터 및 정렬 */}
        {reviews.length > 0 && (
          <div className="flex justify-between items-center mb-8 bg-white rounded-xl p-4 shadow-sm gap-4">
            <RegionFilter
              selectedRegionId={selectedRegionId}
              onRegionChange={setSelectedRegionId}
            />
            <SortOptions
              currentSort={currentSort}
              options={MY_PAGE_REVIEW_SORT_OPTIONS}
              onSortChange={setCurrentSort}
            />
          </div>
        )}

        {/* 리뷰 목록 */}
        {sortedReviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-300 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-600 text-lg mb-2 font-semibold">
              작성한 리뷰가 없습니다
            </p>
            <p className="text-gray-500 text-sm mb-6">
              여행지를 방문하고 첫 리뷰를 작성해보세요!
            </p>
            <WriteButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedReviews.map((review) => (
              <ReviewCard
                key={review.review_id}
                review={review}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDeleteCallback}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
