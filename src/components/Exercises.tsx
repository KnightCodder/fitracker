'use client';

import { Exercise, Set } from "@/models/User";
import { useState } from "react";
import Modal from "./Modal";
import AddSetForm from "./AddSet";
import { Button } from "@/components/ui/button";
import ExerciseDetails from "./ExerciseDetails";

interface ExerciseCardProps {
    exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
    const [isAddSetModalOpen, setisAddSetModalOpen] = useState<boolean>(false);
    const [isDetailExerciseModalOpen, setisDetailExerciseModalOpen] = useState<boolean>(false);

    const handleAddSet = async (set: Set) => {
        const response = await fetch('/api/addSet', {
            method: 'POST',
            body: JSON.stringify({ set, exercise_name: exercise.exercise_name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('set added successfully');
            exercise.sets.push({set: set, time: new Date()});
        } else {
            console.log('Unable to add set', set);
        }

        setisAddSetModalOpen(false); // Close modal after submission
    };

    const handleCardClick = () => {
        setisDetailExerciseModalOpen(true);
    };

    return (
        <div
            className="m-5 py-4 px-6 bg-gray-100 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{exercise.exercise_name}</h3>
                {/* Prevent event propagation when clicking the Add Set button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation(); // Stop the click event from reaching the parent card
                        setisAddSetModalOpen(true);
                    }}
                >
                    Add Set
                </Button>
            </div>

            <div className="mt-4">
                <p className="text-gray-600">Track your progress for {exercise.exercise_name}.</p>
            </div>

            {/* Modal for adding a set */}
            <Modal isOpen={isAddSetModalOpen} onClose={() => setisAddSetModalOpen(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Add New Set</h3>
                    <AddSetForm onSubmit={handleAddSet} />
                </div>
            </Modal>

            {/* Modal for exercise details */}
            <Modal isOpen={isDetailExerciseModalOpen} onClose={() => setisDetailExerciseModalOpen(false)}>
                <ExerciseDetails exercise={exercise} />
            </Modal>
        </div>
    );
}
