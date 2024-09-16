import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt';

export interface Weight {
    weight: number;
    unit: 'grams' | 'kg' | 'lbs';
}

const WeightSchema: Schema<Weight> = new mongoose.Schema({
    weight: { type: Number },
    unit: { type: String, enum: ['grams', 'kg', 'lbs'] }
}, { _id: false });

export interface Set {
    reps: number;
    weight: Weight;
}

const SetSchema: Schema<Set> = new mongoose.Schema({
    reps: { type: Number },
    weight: { type: WeightSchema }
}, { _id: false });

export interface Exercise {
    exercise_name: string;
    sets: { set: Set, time: Date }[];
    goal: Set;
    goalDueDate: Date;
}

const ExerciseSchema: Schema<Exercise> = new mongoose.Schema({
    exercise_name: { type: String, required: true },
    sets: [
        {
            set: { type: SetSchema },
            time: { type: Date }
        }
    ],
    goal: { type: SetSchema, required: true },
    goalDueDate: { type: Date, required: true },
});

export interface Nutrition {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
}

const NutritionSchema: Schema<Nutrition> = new mongoose.Schema({
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    fiber: { type: Number, required: true }
}, { _id: false });

export interface Food {
    food_name: string;
    quantity: number;
    nutritional_value: Nutrition;
}

const FoodSchema: Schema<Food> = new mongoose.Schema({
    food_name: { type: String, required: true },
    quantity: {
        type: Number, // Can be number, string, or Weight
        required: true
    },
    nutritional_value: { type: NutritionSchema, required: true }
});

export interface Diet {
    intake: { food: Food, time: Date }[];
    daily_goal: [Food];
}

const DietSchema: Schema<Diet> = new mongoose.Schema({
    intake: {
        type: [
            {
                food: { type: FoodSchema },
                time: { type: Date }
            }
        ], default: []
    },
    daily_goal: { type: [FoodSchema], default: [] }
});

export interface Goal {
    description: string;
    weight: { weight: Weight, time: Date }[];
    goal: Weight;
    goalDueDate: Date;
}

const GoalSchema: Schema<Goal> = new mongoose.Schema({
    description: { type: String, default: '' },
    weight: {type:[
        {
            weight: { type: WeightSchema },
            time: { type: Date }
        }
    ], default: []},
    goal: { type: WeightSchema },
    goalDueDate: { type: Date }
});

interface User extends Document {
    username: string;
    firstName: string;
    lastName: string;
    DOB: Date;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isPublic: boolean;
    workout: Exercise[];
    foods: Food[];
    diet: Diet;
    goal: Goal;
    verifyPassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, requird: true },
    lastName: { type: String },
    DOB: { type: Date, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address'],
    },
    password: { type: String, required: true },
    verifyCode: { type: String, required: true },
    verifyCodeExpiry: { type: Date, required: true },
    isVerified: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
    workout: { type: [ExerciseSchema], default: [], required: true },
    foods: { type: [FoodSchema], default: [], required: true },
    // Adjust how default value is defined for the diet field
    diet: { type: DietSchema, default: {}},
    goal: { type: GoalSchema, default: {} }, // Optional field
});



UserSchema.pre<User>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;
