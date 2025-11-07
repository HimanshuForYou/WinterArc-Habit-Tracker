import React from 'react';
import { Habit, DayStatus } from '../types';

interface StreakViewProps {
  habit: Habit;
  onClose: () => void;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const StreakView: React.FC<StreakViewProps> = ({ habit, onClose }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yearAgo = new Date(today);
  yearAgo.setFullYear(today.getFullYear() - 1);

  // Start the calendar on the first Sunday before or on the `yearAgo` date
  const startDate = new Date(yearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const days: Date[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= today) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthLabels = days
    .map((day, index) => {
      if (day.getDate() === 1) {
        return {
          month: months[day.getMonth()],
          weekIndex: Math.floor(index / 7),
        };
      }
      return null;
    })
    .filter(Boolean)
    .reduce((acc, { month, weekIndex }) => {
        // Prevent duplicate month labels close together
        if (!acc.find(item => Math.abs(item.weekIndex - weekIndex) < 3)) {
            acc.push({ month, weekIndex });
        }
        return acc;
    }, []);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Streak History for <span className="text-orange-600">{habit.name}</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        </div>

        <div className="flex justify-center items-start">
          <div className="flex flex-col text-xs text-gray-500 pr-2 space-y-1.5 mt-6">
            <span>Mon</span>
            <span className="mt-2">Wed</span>
            <span className="mt-2">Fri</span>
          </div>
          <div className="relative overflow-x-auto">
            <div className="flex gap-x-2.5 text-center text-xs text-gray-500 mb-1">
                {monthLabels.map(({ month, weekIndex }) => (
                    <div key={month} className="absolute" style={{ left: `${weekIndex * 15}px` }}>
                        {month}
                    </div>
                ))}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-1 mt-6">
              {days.map(day => {
                const dateString = formatDate(day);
                const status = habit.tracked_days[dateString] || DayStatus.Pending;
                
                let bgColor = 'bg-gray-200';
                let tooltipText = `${dateString}: Pending`;

                if (status === DayStatus.Done) {
                  bgColor = 'bg-green-500';
                  tooltipText = `${dateString}: Done`;
                } else if (status === DayStatus.Missed) {
                  bgColor = 'bg-yellow-500';
                  tooltipText = `${dateString}: Missed`;
                }

                return (
                  <div
                    key={dateString}
                    title={tooltipText}
                    className={`w-3 h-3 rounded-sm ${bgColor}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
         <div className="flex justify-end items-center mt-4 space-x-4 text-xs text-gray-600">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-gray-200"></div>
            <div className="w-3 h-3 rounded-sm bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
            <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default StreakView;