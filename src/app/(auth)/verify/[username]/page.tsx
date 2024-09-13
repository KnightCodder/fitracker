"use client";

import { FormEvent, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Verify({ params }: { params: { username: string } }) {
    const [error, setError] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(undefined);

        const formData = new FormData(ref.current as HTMLFormElement);

        try {
            const response = await fetch('/api/verify', {
                method: 'POST',
                body: JSON.stringify({
                    username: params.username,
                    code: formData.get("code"),
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status == 200) {
                router.push('/sign-in');
            } else {
                setError('Verification failed. Please try again.');
            }
        } catch (error) {
            setError('An error occurred during verification');
            console.error(error);
        }

        setIsLoading(false);
    };

    return (
        <section className="w-full h-screen flex items-center justify-center">
            <form ref={ref}
                onSubmit={handleSubmit}
                className="p-6 w-full max-w-[500px] flex flex-col justify-between items-center gap-2 
                border border-solid border-black bg-white rounded">
                {error && <div className="text-red-500">{error}</div>}
                <h1 className="mb-5 w-full text-2xl font-bold">Verify</h1>

                <label className="w-full text-sm">Verification Code</label>
                <div className="flex w-full">
                    <input
                        type="text"
                        placeholder="Verification code"
                        className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
                        name="code"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full border border-solid border-black py-1.5 mt-2.5 rounded transition duration-150 ease 
                    ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-black'}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
                {message && <p className="mt-2 text-sm">{message}</p>}
            </form>
        </section>
    );
}
