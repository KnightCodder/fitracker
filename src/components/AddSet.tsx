// components/AddSetForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { Set, Weight } from '@/models/User';

interface AddSetFormProps {
  onSubmit: (set: Set) => void;
}

const AddSetForm: React.FC<AddSetFormProps> = ({ onSubmit }) => {
  const [reps, setReps] = useState<number>(1);
  const [weight, setWeight] = useState<Weight>({ weight: 0, unit: 'kg' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const set: Set = {
      reps: reps,
      weight: weight
    };

    onSubmit(set);
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
        <label htmlFor="reps">Reps</label>
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
        <label htmlFor="weight">Weight</label>
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
      <button type="submit" className="bg-blue-500 text-black p-2 rounded">
        Add Set
      </button>
    </form>
  );
};

export default AddSetForm;
