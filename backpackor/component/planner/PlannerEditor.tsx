// component/planner/PlannerEditor.tsx
// 새로운 여행 일정을 생성하거나 기존 일정을 수정하는 일정편집 페이지 컴포넌트
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { differenceInDays, format, addDays } from 'date-fns';
import { useState, useEffect, useMemo } from 'react'; // useMemo 추가
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from '@/component/planner/SortableItem';
import type { Place } from '@/app/planner/edit/page';
import { createBrowserClient } from '@/lib/supabaseClient';
import EditorPlaceCard from '@/component/planner/EditorPlaceCard';
import Sort from '@/component/place/Sort'; // [추가] Sort 컴포넌트 import

// --- 데이터 타입 정의 ---
interface DayInfo {
    day: number;
    date: string;
}
type Plan = Record<number, Place[]>;

interface PlannerEditorProps {
    initialPlaces: Place[];
}

export default function PlannerEditor({ initialPlaces }: PlannerEditorProps) {
    // --- Hooks ---
    const supabase = createBrowserClient();
    const router = useRouter();
    const searchParams = useSearchParams();

    // --- URL 파라미터 읽기 ---
    const tripIdToEdit = searchParams.get('trip_id');
    const startDateStr = searchParams.get('start');
    const endDateStr = searchParams.get('end');
    const aiGeneratedTitle = searchParams.get('aiTitle');
    const aiGeneratedPlanStr = searchParams.get('aiPlan');

    // --- 상태 (State) ---
    const [places] = useState<Place[]>(initialPlaces);
    const [plan, setPlan] = useState<Plan>({});
    const [activeDay, setActiveDay] = useState<number>(1);
    const [isSaving, setIsSaving] = useState(false);
    const [tripTitle, setTripTitle] = useState(aiGeneratedTitle || "나만의 새로운 여행");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [visiblePlacesCount, setVisiblePlacesCount] = useState<number>(12);
    // [추가] 정렬 상태를 관리하는 state
    const [sortOrder, setSortOrder] = useState('popularity_desc');

    // --- Effects (페이지 로드 시 실행) ---
    useEffect(() => {
        const initializePlan = async () => {
            setIsLoading(true);

            if (aiGeneratedPlanStr) {
                const aiPlan = JSON.parse(aiGeneratedPlanStr);
                const hydratedPlan: Plan = {};
                for (const day in aiPlan) {
                    hydratedPlan[parseInt(day, 10)] = aiPlan[day]
                        .map((p: { place_name: string }) =>
                            initialPlaces.find(ip => ip.place_name === p.place_name)
                        )
                        .filter((p?: Place): p is Place => p !== undefined);
                }
                setPlan(hydratedPlan);
            } else if (tripIdToEdit) {
                const { data: planData } = await supabase.from('trip_plan').select('trip_title').eq('trip_id', tripIdToEdit).single();
                if (planData) setTripTitle(planData.trip_title);

                const { data: details } = await supabase.from('trip_plan_detail').select('day_number, place(*)').eq('trip_id', tripIdToEdit);
                const newPlan: Plan = {};
                (details as any[] || []).forEach(detail => {
                    if (!newPlan[detail.day_number]) newPlan[detail.day_number] = [];
                    newPlan[detail.day_number].push(detail.place);
                });
                setPlan(newPlan);
            }
            setIsLoading(false);
        };
        initializePlan();
    }, [aiGeneratedPlanStr, initialPlaces, tripIdToEdit, supabase]);

    useEffect(() => {
        setVisiblePlacesCount(12);
    }, [searchQuery, sortOrder]); // [수정] 정렬 순서가 바뀔 때도 개수 초기화

    // --- 데이터 가공 ---
    let days: DayInfo[] = [];
    if (startDateStr && endDateStr) {
        const start = new Date(startDateStr);
        const end = new Date(endDateStr);
        const duration = differenceInDays(end, start) + 1;
        days = Array.from({ length: duration }, (_, i) => ({ day: i + 1, date: format(addDays(start, i), 'yyyy. MM. dd') }));
    }

    // [수정] 정렬과 필터링을 함께 처리하는 useMemo
    const displayPlaces = useMemo(() => {
        const sorted = [...places].sort((a, b) => {
            switch (sortOrder) {
                case 'review_desc':
                    return (b.review_count || 0) - (a.review_count || 0) || (b.favorite_count || 0) - (a.favorite_count || 0);
                case 'rating_desc':
                    return (b.average_rating || 0) - (a.average_rating || 0) || (b.favorite_count || 0) - (a.favorite_count || 0);
                case 'popularity_desc':
                default:
                    return (b.favorite_count || 0) - (a.favorite_count || 0);
            }
        });

        if (!searchQuery) {
            return sorted;
        }
        return sorted.filter(place =>
            place.place_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [places, sortOrder, searchQuery]);

    // --- 핸들러 함수 ---
    const handleAddPlace = (place: Place) => {
        setPlan(prevPlan => ({ ...prevPlan, [activeDay]: [...(prevPlan[activeDay] || []), place] }));
    };

    const handleRemovePlace = (day: number, placeId: string) => {
        setPlan(prevPlan => ({ ...prevPlan, [day]: prevPlan[day].filter((p) => p.place_id !== placeId) }));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setPlan(prevPlan => {
                const activeDayPlaces = prevPlan[activeDay] || [];
                const oldIndex = activeDayPlaces.findIndex(p => p.place_id === active.id);
                const newIndex = activeDayPlaces.findIndex(p => p.place_id === over.id);
                return { ...prevPlan, [activeDay]: arrayMove(activeDayPlaces, oldIndex, newIndex) };
            });
        }
    };

    const handleSavePlan = async () => {
        setIsSaving(true);
        const testUserId = '35fcc2ad-5f65-489c-8d63-d805f8fcf35a'; // TODO: 로그인 기능 완성 후 실제 유저 ID로 변경

        if (tripIdToEdit) {
            await supabase.from('trip_plan').update({ trip_title: tripTitle }).eq('trip_id', tripIdToEdit);
            await supabase.from('trip_plan_detail').delete().eq('trip_id', tripIdToEdit);
            const newPlanDetails = Object.entries(plan).flatMap(([day, places]) =>
                places.map((p, i) => ({ trip_id: tripIdToEdit, place_id: p.place_id, day_number: parseInt(day), visit_order: i + 1 }))
            );
            if (newPlanDetails.length > 0) {
                await supabase.from('trip_plan_detail').insert(newPlanDetails);
            }
            alert("일정이 수정되었습니다.");
            router.push(`/my-planner/${tripIdToEdit}`);
        } else {
            const { data: insertedPlan } = await supabase.from('trip_plan').insert({
                user_id: testUserId, trip_title: tripTitle, trip_start_date: startDateStr, trip_end_date: endDateStr
            }).select('trip_id').single();

            if (insertedPlan) {
                const planDetails = Object.entries(plan).flatMap(([day, places]) =>
                    places.map((p, i) => ({ trip_id: insertedPlan.trip_id, place_id: p.place_id, day_number: parseInt(day), visit_order: i + 1 }))
                );
                if (planDetails.length > 0) {
                    await supabase.from('trip_plan_detail').insert(planDetails);
                }
                alert("일정이 저장되었습니다.");
                router.push('/my-planner');
            }
        }
        setIsSaving(false);
    };

    // 로딩 중일 때 화면
    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center">일정 정보를 불러오는 중...</div>;
    }

    // --- 렌더링 (JSX) ---
    return (
        <div className="w-full h-screen flex flex-col p-4 bg-gray-50">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{tripIdToEdit ? '여행 일정 수정' : '나만의 여행 만들기'}</h1>
                <button onClick={handleSavePlan} disabled={isSaving} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
                    {isSaving ? '저장 중...' : '이 일정 저장하기'}
                </button>
            </header>

            <main className="flex-grow flex gap-4 overflow-hidden">
                <section className="w-1/2 h-full bg-white rounded-lg p-4 shadow-sm flex flex-col overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                        {isEditingTitle ? (
                            <input type="text" value={tripTitle} onChange={(e) => setTripTitle(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); }} className="text-lg font-bold p-1 border-b-2 border-blue-500 focus:outline-none" autoFocus />
                        ) : (<h2 className="font-bold text-lg">🗓️ {tripTitle}</h2>)}
                        <button onClick={() => setIsEditingTitle(!isEditingTitle)} className="text-lg">{isEditingTitle ? '✔' : '✏️'}</button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{startDateStr} ~ {endDateStr}</p>
                    <div className="space-y-4 overflow-y-auto pr-2">
                        {days.map((dayInfo) => (
                            <div key={dayInfo.day} onClick={() => setActiveDay(dayInfo.day)} className={`p-4 rounded-md border cursor-pointer ${activeDay === dayInfo.day ? 'bg-blue-50 border-blue-400' : 'bg-gray-50'}`}>
                                <h3 className="font-bold">Day {dayInfo.day}</h3>
                                <p className="text-sm text-gray-400">{dayInfo.date}</p>
                                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={(plan[dayInfo.day] || []).map(p => p.place_id)} strategy={verticalListSortingStrategy}>
                                        <div className="mt-2 space-y-2">
                                            {(plan[dayInfo.day] || []).map((place) => (
                                                <SortableItem key={place.place_id} place={place} onRemove={() => handleRemovePlace(dayInfo.day, place.place_id)} />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-1/2 h-full bg-white rounded-lg p-4 shadow-sm flex flex-col overflow-hidden">
                    {/* [수정] 제목과 정렬 버튼을 함께 배치 */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg">📍 여행지 둘러보기</h2>
                        <Sort currentSort={sortOrder} onSortChange={setSortOrder} />
                    </div>
                    
                    <input type="text" placeholder="어디로 떠나고 싶으신가요?" className="w-full p-2 border rounded-md mb-4" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    
                    <div className="flex-grow overflow-y-auto pr-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* [수정] displayPlaces 배열 사용 */}
                            {displayPlaces.slice(0, visiblePlacesCount).map((place) => (
                                <EditorPlaceCard 
                                    key={place.place_id} 
                                    place={place} 
                                    onAddPlace={handleAddPlace} 
                                />
                            ))}
                        </div>
                        
                        {/* [수정] displayPlaces 배열 사용 */}
                        {visiblePlacesCount < displayPlaces.length && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setVisiblePlacesCount(prev => prev + 12)}
                                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    더보기
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

