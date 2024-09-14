'use client';

import { Exercise, Set } from "@/models/User";
import { useState } from "react";
import Modal from "./Modal";
import AddSetForm from "./AddSet";

interface ExerciseCardProps {
    exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleAddSet = async (set: Set) => {
        const response = await fetch('/api/addSet', {
            method: 'POST',
            body: JSON.stringify({ set, exercise_name: exercise.exercise_name }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            //   setExercises((prevExercises) => [...prevExercises, exercise]);
        } else {
            console.log('Unable to add set', set);
        }

        setIsModalOpen(false); // Close modal after submission
    };

    return (
        <>
            <div onClick={() => { setIsModalOpen(true) }} className="">
                <h3 className="bg-white">{exercise.exercise_name}</h3>

            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddSetForm onSubmit={handleAddSet} />
            </Modal>
        </>
    );
}
