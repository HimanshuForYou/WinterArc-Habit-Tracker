import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Habit, DayStatus, TrackedDays } from '../types';
import CalendarGrid from './CalendarGrid';
import { TrashIcon, FireIcon, CalendarDaysIcon } from './Icons';
import StreakView from './StreakView';

interface HabitTrackerProps {
  habit: Habit;
  onUpdate: (id: number, updates: Partial<Habit>) => void;
  onDelete: (id: number) => void;
}

const calculateStreak = (trackedDays: TrackedDays, startDateStr: string): number => {
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Use replace to avoid timezone issues with YYYY-MM-DD format
    const startDate = new Date(startDateStr.replace(/-/g, '/'));
    startDate.setHours(0, 0, 0, 0);

    let checkDate = new Date(today);
    const todayStatus = trackedDays[formatDate(today)];
  
    // If today is not 'done', the current streak is based on performance up to yesterday
    if (todayStatus !== DayStatus.Done) {
        checkDate.setDate(checkDate.getDate() - 1);
    }

    let streak = 0;
    while (checkDate >= startDate) {
        const dateString = formatDate(checkDate);
        const status = trackedDays[dateString];

        if (status === DayStatus.Done) {
            streak++;
        } else {
            // Any other status (missed, pending, or undefined) breaks the streak
            break;
        }
        checkDate.setDate(checkDate.getDate() - 1);
    }
    return streak;
};


const HabitTracker: React.FC<HabitTrackerProps> = ({ habit, onUpdate, onDelete }) => {
  const [name, setName] = useState(habit.name);
  const [time, setTime] = useState(habit.time);
  const [isStreakViewOpen, setIsStreakViewOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const streak = useMemo(() => calculateStreak(habit.tracked_days, habit.start_date), [habit.tracked_days, habit.start_date]);

  useEffect(() => {
    setName(habit.name);
    setTime(habit.time);
  }, [habit]);

  const handleInputChange = (field: 'name' | 'time', value: string) => {
    if (field === 'name') setName(value);
    if (field === 'time') setTime(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onUpdate(habit.id, { [field]: value });
    }, 1000);
  };

  const handleDayUpdate = (dateString: string) => {
    const currentStatus = habit.tracked_days[dateString] || DayStatus.Pending;
    let newStatus: DayStatus;

    if (currentStatus === DayStatus.Pending) {
      newStatus = DayStatus.Done;
    } else if (currentStatus === DayStatus.Done) {
      newStatus = DayStatus.Missed;
    } else { // Missed
      newStatus = DayStatus.Pending;
    }

    const newTrackedDays = { ...habit.tracked_days };
    if (newStatus === DayStatus.Pending) {
      delete newTrackedDays[dateString];
    } else {
      newTrackedDays[dateString] = newStatus;
    }
    
    onUpdate(habit.id, { tracked_days: newTrackedDays });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-grow pr-4">
            <div className="flex items-center gap-2">
              <label htmlFor={`habit-name-${habit.id}`} className="font-bold text-gray-600">Habit:</label>
              <input
                id={`habit-name-${habit.id}`}
                type="text"
                value={name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="font-semibold text-xl p-1 -m-1 rounded-md border-transparent focus:border-orange-300 focus:ring-orange-300 transition w-full"
                placeholder="E.g., Morning Run"
              />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <label htmlFor={`habit-time-${habit.id}`} className="font-bold text-gray-600">Time:</label>
              <input
                id={`habit-time-${habit.id}`}
                type="text"
                value={time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="text-gray-500 p-1 -m-1 rounded-md border-transparent focus:border-orange-300 focus:ring-orange-300 transition w-full"
                placeholder="E.g., 6:00 AM"
              />
            </div>
          </div>
          
          <div className="flex items-start gap-4">
              <div className="flex flex-col items-center text-center pt-1">
                  <FireIcon className={`w-8 h-8 ${streak > 0 ? 'text-orange-500' : 'text-gray-300'}`} />
                  <span className={`font-bold text-xl ${streak > 0 ? 'text-orange-600' : 'text-gray-400'}`}>{streak}</span>
                  <span className="text-xs text-gray-500">day streak</span>
              </div>
              <div className="flex flex-col">
                <button 
                  onClick={() => onDelete(habit.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  aria-label="Delete habit"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsStreakViewOpen(true)}
                  className="text-gray-400 hover:text-green-500 transition-colors p-1 mt-2"
                  aria-label="View streak history"
                >
                    <CalendarDaysIcon className="w-5 h-5" />
                </button>
              </div>
          </div>
        </div>

        <CalendarGrid 
          startDate={new Date(habit.start_date.replace(/-/g, '/'))}
          trackedDays={habit.tracked_days}
          onDayClick={handleDayUpdate}
        />
      </div>
      {isStreakViewOpen && (
        <StreakView habit={habit} onClose={() => setIsStreakViewOpen(false)} />
      )}
    </>
  );
};

export default HabitTracker;