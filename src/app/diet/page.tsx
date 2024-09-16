'use client';

import { useEffect, useState } from "react";
import { Food } from "@/models/User"; // Assuming you have defined this type
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import AddFoodForm from "@/components/AddFoodForm";
import FoodCard from "@/components/Food";
import FoodRecordCard from "@/components/FoodRecord";

export default function Diet() {
  // State to manage modal and foods list
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFoodsVisible, setIsFoodsVisible] = useState<boolean>(false); // For showing/hiding foods
  const [foods, setFoods] = useState<Food[]>([]);

  // State for managing search input, selected food, quantity, and records
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [foodRecords, setFoodRecords] = useState<{ food: Food; quantity: number; time: string }[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter foods based on search input
  const filteredFoods = foods.filter((food) =>
    food.food_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Function to handle selecting a food from search results
  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    setQuantity(food.quantity);
    setIsSearchFocused(false);
  };

  // Function to handle saving the record of food eaten
  const handleSaveRecord = async () => {
    if (selectedFood) {
      const newRecord = {
        food: selectedFood,
        quantity,
        time: new Date().toISOString()
      };

      const response = await fetch('/api/addFoodRecord', {
        method: 'POST',
        body: JSON.stringify({ newRecord }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFoodRecords((prevRecords) => [newRecord, ...prevRecords]);  // Add new record to the top
        setSelectedFood(null);  // Reset the selected food after saving
      } else {
        console.error('Failed to save food record');
      }
    }
  };

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


    const fetchFoodDetails = async () => {
      try {
        const response = await fetch('/api/getFoodDetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFoodRecords(data.records); // Assuming API returns an object with a foods array
        } else {
          console.error('Failed to fetch food record');
        }
      } catch (error) {
        console.error('Error fetching food record:', error);
      }
    };

    fetchFoodDetails();
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
        <div className="border border-gray-300 rounded-lg p-4 shadow-md m-4">
          <h3 onClick={() => { setIsSearchFocused(false); setSelectedFood(null) }} className="text-2xl font-semibold">Add Food Record</h3>

          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search for food"
            className="mt-2 p-2 border rounded-md w-full"
          />

          {isSearchFocused && filteredFoods.length > 0 ? (
            <ul className="mt-4">
              {filteredFoods.map((food) => (
                <li key={food.food_name} onClick={() => handleSelectFood(food)} className="cursor-pointer">
                  {food.food_name}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}

          {isSearchFocused && filteredFoods.length === 0 ? (
            <p className="text-gray-500">No foods found.</p>
          ) : (
            <></>
          )}

          {selectedFood && (
            <div className="mt-4">
              <h4 className="text-xl">{selectedFood.food_name}</h4>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className="mt-2 p-2 border rounded-md w-full"
              />
              <Button onClick={handleSaveRecord} className="mt-4">
                Save Record
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 shadow-md m-4">
        <h3 className="text-2xl font-semibold">Your Food Records</h3>

        {foodRecords.length > 0 ? (
          <ul className="mt-4">
            {foodRecords.map((record, index) => (
              <li key={index} className="m-2">
                <FoodRecordCard food={record.food} quantity={record.quantity} time={record.time}/>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No records yet.</p>
        )}
      </div>

    </>
  );
}
