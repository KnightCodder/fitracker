// components/AddExerciseForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { Exercise, Weight } from '@/models/User';

interface AddExerciseFormProps {
  onSubmit: (exercise: Exercise) => void;
}

const AddExerciseForm: React.FC<AddExerciseFormProps> = ({ onSubmit }) => {
  const [exerciseName, setExerciseName] = useState<string>('');
  const [reps, setReps] = useState<number>(1);
  const [weight, setWeight] = useState<Weight>({ weight: 0, unit: 'kg' });
  const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split('T')[0]); // default to today

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const exercise: Exercise = {
      exercise_name: exerciseName,
      sets: [],
      goal: { reps: reps, weight: weight },
      goalDueDate: new Date(dueDate), // converting string to Date
    };

    onSubmit(exercise);
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight((prev) => ({
      ...prev,
      weight: parseFloat(e.target.value),
    }));
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setWeight((prev) => ({
      ...prev,
      unit: e.target.value as 'kg' | 'grams' | 'lbs',
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="exerciseName">Exercise Name</label>
        <input
          type="text"
          id="exerciseName"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="reps">Reps Goal</label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(parseInt(e.target.value))}
          required
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="weight">Weight Goal</label>
        <input
          type="number"
          id="weight"
          value={weight.weight}
          onChange={handleWeightChange}
          required
          className="border p-2 w-full"
        />
        <select value={weight.unit} onChange={handleUnitChange} className="border p-2 mt-2">
          <option value="kg">kg</option>
          <option value="grams">grams</option>
          <option value="lbs">lbs</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate">Goal due date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-black p-2 rounded">
        Add Exercise
      </button>
    </form>
  );
};

export default AddExerciseForm;
