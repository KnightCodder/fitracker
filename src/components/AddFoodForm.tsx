'use client';

import { Nutrition, Food } from "@/models/User";
import { Button } from "./ui/button";
import { useState } from "react";

interface AddFoodFormProps {
    onSubmit: (food: Food) => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onSubmit }) => {
    const [foodName, setFoodName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [nutrition, setNutrition] = useState<Nutrition>({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        fiber: 0,
    });

    // Handler for adding food
    const handleAddFood = () => {
        const newFood: Food = {
            food_name: foodName,
            quantity: quantity,
            nutritional_value: nutrition,
        };

        onSubmit(newFood);

    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Add Food</h2>

            {/* Form fields for adding food */}
            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Food Name</label>
                <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter food name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">Quantity</label>
                <input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.valueAsNumber)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter quantity"
                />
            </div>

            {/* Nutrition Input */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Calories</label>
                    <input
                        type="number"
                        value={nutrition.calories}
                        onChange={(e) => setNutrition({ ...nutrition, calories: +e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter calories"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Protein (g)</label>
                    <input
                        type="number"
                        value={nutrition.protein}
                        onChange={(e) => setNutrition({ ...nutrition, protein: +e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter protein"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Carbs (g)</label>
                    <input
                        type="number"
                        value={nutrition.carbs}
                        onChange={(e) => setNutrition({ ...nutrition, carbs: +e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter carbs"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Fats (g)</label>
                    <input
                        type="number"
                        value={nutrition.fats}
                        onChange={(e) => setNutrition({ ...nutrition, fats: +e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter fats"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Fiber (g)</label>
                    <input
                        type="number"
                        value={nutrition.fiber}
                        onChange={(e) => setNutrition({ ...nutrition, fiber: +e.target.value })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter fiber"
                    />
                </div>
            </div>

            <div className="mt-4">
                <Button onClick={handleAddFood}>Add Food</Button>
            </div>
        </div>
    );
}

export default AddFoodForm;