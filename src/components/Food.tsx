'use client';

import { useState } from "react";
import { Food } from "@/models/User";
import { Card, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Modal from "./Modal"; // Import your custom Modal component

interface FoodProps {
    food: Food;
}

export default function FoodCard({ food }: FoodProps) {
    const [isModalOpen, setModalOpen] = useState(false);

    // Function to toggle the modal
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <>
            {/* The FoodCard Box */}
            <Card
                className="border border-gray-200 shadow-lg rounded-lg p-6 max-w-xs mx-auto cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                onClick={toggleModal}
            >
                <CardTitle className="text-xl font-semibold text-gray-900 text-center">{food.food_name}</CardTitle>
            </Card>

            {/* Modal for showing nutritional details */}
            <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800">{food.food_name}</h3>
                    <div className="text-lg text-gray-700">
                        <p><span className="font-medium">Quantity:</span> {food.quantity}</p>
                        <p><span className="font-medium">Calories:</span> {food.nutritional_value.calories}</p>
                        <p><span className="font-medium">Protein:</span> {food.nutritional_value.protein}g</p>
                        <p><span className="font-medium">Carbs:</span> {food.nutritional_value.carbs}g</p>
                        <p><span className="font-medium">Fats:</span> {food.nutritional_value.fats}g</p>
                        <p><span className="font-medium">Fiber:</span> {food.nutritional_value.fiber}g</p>
                    </div>
                </div>

                {/* Footer with Edit/Delete buttons */}
                <div className="flex justify-end space-x-4 px-6 pb-6">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Edit</Button>
                    <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Delete</Button>
                </div>
            </Modal>
        </>
    );
}
