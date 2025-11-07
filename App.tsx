import React, { useState, useEffect, useCallback } from 'react';
import { Habit } from './types';
import { getHabits, addHabit, updateHabit, deleteHabit, isSupabaseConfigured } from './services/supabaseService';
import Header from './components/Header';
import HabitTracker from './components/HabitTracker';
import { PlusIcon } from './components/Icons';
import SupabaseSetup from './components/SupabaseSetup';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const configured = isSupabaseConfigured();

  const fetchHabits = useCallback(async () => {
    if (!configured) {
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    const fetchedHabits = await getHabits();
    setHabits(fetchedHabits);
    setIsLoading(false);
  }, [configured]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleAddHabit = async () => {
    const newHabit = await addHabit();
    if (newHabit) {
      setHabits(prevHabits => [...prevHabits, newHabit]);
    }
  };

  const handleUpdateHabit = async (id: number, updates: Partial<Habit>) => {
    const updatedHabit = await updateHabit(id, updates);
    if (updatedHabit) {
      setHabits(prevHabits =>
        prevHabits.map(habit => (habit.id === id ? { ...habit, ...updates } : habit))
      );
    }
  };

  const handleDeleteHabit = async (id: number) => {
    const success = await deleteHabit(id);
    if (success) {
      setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    }
  };
  
  const AddHabitButton = () => (
    <button
      onClick={handleAddHabit}
      className="fixed bottom-8 right-8 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105"
      aria-label="Add new habit"
    >
      <PlusIcon className="h-8 w-8" />
    </button>
  );

  if (!configured) {
    return <SupabaseSetup />;
  }

  return (
    <div className="min-h-screen text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {isLoading ? (
          <div className="text-center text-gray-500 text-xl">Loading habits...</div>
        ) : habits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {habits.map(habit => (
              <HabitTracker
                key={habit.id}
                habit={habit}
                onUpdate={handleUpdateHabit}
                onDelete={handleDeleteHabit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-xl mt-16">
            <p>No habits yet. Let's start a new journey!</p>
            <p className="mt-2">Click the '+' button to add your first habit.</p>
          </div>
        )}
      </main>
      <AddHabitButton />
    </div>
  );
};

export default App;
