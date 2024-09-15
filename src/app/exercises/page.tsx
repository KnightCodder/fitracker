'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import AddExerciseForm from '@/components/AddExerciseForm';
import { Exercise } from '@/models/User';
import ExerciseCard from '@/components/Exercises';

export default function ExercisePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Fetch exercises on component mount
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/getExercises', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExercises(data.exercises); // Assuming API returns an object with an exercises array
        } else {
          console.error('Failed to fetch exercises');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    fetchExercises();
  }, []); // Empty dependency array ensures this runs only once when component mounts

  const handleAddExercise = async (exercise: Exercise) => {
    const response = await fetch('/api/addExercises', {
      method: 'POST',
      body: JSON.stringify(exercise),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setExercises((prevExercises) => [...prevExercises, exercise]);
    } else {
      console.log('Unable to add exercise', exercise);
    }

    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="p-8">
      <div>
        <div className='flex justify-between items-center'>
          <h2 className="text-2xl font-semibold mx-auto">Your Exercises</h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 text-white px-4 py-2 mr-11 rounded hover:bg-green-600"
          >
            Add Exercise
          </button>
        </div>

        <div className="m-6">
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <div key={exercise.exercise_name}>
                <ExerciseCard exercise={exercise} />
              </div>
            ))
          ) : (
            <p>No exercises found</p>
          )}
        </div>
      </div>


      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddExerciseForm onSubmit={handleAddExercise} />
      </Modal>
    </div>
  );
}
