'use client';

import { useState } from "react";
import { Food } from "@/models/User";
import { Button } from "./ui/button";
import Modal from "./Modal"; // Import your custom Modal component

interface recordProps {
  food: Food;
  quantity: number;
  time: string;
}

export default function FoodRecordCard({ food, quantity, time }: recordProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* The FoodCard Box */}
      <div
        onClick={toggleModal}
        className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
      >
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">{food.food_name}</span>
          <span className="text-sm text-gray-500">{new Date(time).toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-md font-medium text-gray-600">Qty: {food.quantity}</span>
          <span className="text-md font-medium text-gray-600">{food.nutritional_value.calories} kcal</span>
        </div>
      </div>

      {/* Modal for showing nutritional details */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">{food.food_name}</h3>
          <div className="grid grid-cols-2 gap-4 text-lg text-gray-700">
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
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Edit
          </Button>
          <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
