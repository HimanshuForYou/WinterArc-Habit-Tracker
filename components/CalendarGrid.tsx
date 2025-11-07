import React from 'react';
import { TrackedDays, DayStatus } from '../types';

interface CalendarGridProps {
  startDate: Date;
  trackedDays: TrackedDays;
  onDayClick: (dateString: string) => void;
}

const Day: React.FC<{ date: Date; status: DayStatus; onClick: () => void; isToday: boolean }> = ({ date, status, onClick, isToday }) => {
  let statusClasses = 'bg-gray-100 hover:bg-gray-200 text-gray-700';
  let content = <>{date.getDate()}</>;

  if (status === DayStatus.Done) {
    statusClasses = 'bg-green-500 text-white font-bold relative';
    content = <>
      <span className="opacity-40">{date.getDate()}</span>
      <span className="absolute inset-0 flex items-center justify-center text-2xl opacity-70">✕</span>
    </>;
  } else if (status === DayStatus.Missed) {
    statusClasses = 'bg-yellow-500 text-white font-bold rounded-full';
  }

  const todayMarker = isToday ? 'ring-2 ring-orange-500 ring-offset-1' : '';

  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-all duration-200 ${statusClasses} ${todayMarker}`}
    >
      {content}
    </button>
  );
};

const CalendarGrid: React.FC<CalendarGridProps> = ({ startDate, trackedDays, onDayClick }) => {
  const get90DaysArray = (start: Date): Date[] => {
    const days: Date[] = [];
    for (let i = 0; i < 90; i++) {
      const newDate = new Date(start);
      newDate.setDate(start.getDate() + i);
      newDate.setHours(0, 0, 0, 0); // Normalize date to prevent timezone issues
      days.push(newDate);
    }
    return days;
  };

  const days = get90DaysArray(startDate);
  const today = new Date();
  today.setHours(0,0,0,0);

  const groupedByMonth = days.reduce<Record<string, Date[]>>((acc, date) => {
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(date);
    return acc;
  }, {});

  return (
    <div className="space-y-4 mt-4">
      {Object.entries(groupedByMonth).map(([monthYear, monthDays]) => {
        const firstDayOfMonth = monthDays[0].getDay(); // 0 = Sunday, 1 = Monday...
        return (
          <div key={monthYear}>
            <h3 className="font-semibold text-lg mb-2 text-gray-700">{monthYear}</h3>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {monthDays.map(day => {
                const dateString = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`;
                const status = trackedDays[dateString] || DayStatus.Pending;
                const isToday = day.getTime() === today.getTime();
                return (
                  <Day 
                    key={dateString} 
                    date={day} 
                    status={status} 
                    isToday={isToday}
                    onClick={() => onDayClick(dateString)} 
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
