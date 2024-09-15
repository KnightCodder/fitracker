'use client';

import { useEffect, useState } from "react";
import { Food } from "@/models/User"; // Assuming you have defined this type
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import AddFoodForm from "@/components/AddFoodForm";
import FoodCard from "@/components/Food";

export default function Diet() {
  // State to manage modal and foods list
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFoodsVisible, setIsFoodsVisible] = useState<boolean>(false); // For showing/hiding foods
  const [foods, setFoods] = useState<Food[]>([]);

  // Fetch foods from the API
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('/api/getFoods', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFoods(data.foods); // Assuming API returns an object with a foods array
        } else {
          console.error('Failed to fetch foods');
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  // Function to handle adding a new food
  const handleAddFood = async (food: Food) => {
    const response = await fetch('/api/addFood', {
      method: 'POST',
      body: JSON.stringify(food),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setFoods((prevFoods) => [...prevFoods, food]);
    } else {
      console.log('Unable to add food', food);
    }

    setIsModalOpen(false); // Close modal after submission
  };

  // Function to toggle food visibility
  const toggleFoodsVisibility = () => {
    setIsFoodsVisible(!isFoodsVisible);
  };

  return (
    <>
      <h1 className="text-4xl text-center m-4">Diet</h1>

      <div>
        <div className="border border-gray-300 rounded-lg p-4 shadow-md m-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={toggleFoodsVisibility}>
            <h3 className="text-2xl font-semibold">Foods</h3>
            <Button onClick={() => setIsModalOpen(true)} className="ml-4">
              Add Food
            </Button>
          </div>

          {isFoodsVisible && (
            <div className="mt-4 flex space-y-4">
              {foods.length > 0 ? (
                foods.map((food, index) => (
                  <FoodCard key={index} food={food} />
                ))
              ) : (
                <p className="text-gray-500">No foods added yet.</p>
              )}
            </div>
          )}
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AddFoodForm onSubmit={handleAddFood} />
          </Modal>
        )}
      </div>

      <div>
        
      </div>
    </>
  );
}
