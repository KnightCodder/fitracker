import { Exercise } from "@/models/User";

interface ExerciseDetailsProps {
    exercise: Exercise;
}

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise }) => {
    console.log(exercise);
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-bold">{exercise.exercise_name}</h3>
            <div className="space-y-3">
                {exercise.sets.length > 0 ? (
                    exercise.sets.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
                            <p className="text-sm text-gray-600">Reps: {item.set.reps}</p>
                            <p className="text-sm text-gray-600">Weight: {item.set.weight.weight} {item.set.weight.unit}</p>
                            <p className="text-sm text-gray-600">Time: {new Date(item.time).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No sets recorded yet.</p>
                )}
            </div>
            {/* Optionally, display other exercise details like goal */}
            <div className="mt-4">
                <h4 className="text-lg font-semibold">Goal</h4>
                <p className="text-sm text-gray-600">
                    Reps: {exercise.goal.reps}, Weight: {exercise.goal.weight.weight} {exercise.goal.weight.unit}
                </p>
                <p className="text-sm text-gray-600">Goal Due Date: {new Date(exercise.goalDueDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default ExerciseDetails;
