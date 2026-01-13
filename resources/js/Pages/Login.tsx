import React, { useState } from "react";
import { router, Link } from "@inertiajs/react";

export default function Login() {
    const [values, setValues] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.post("/login", values, {
            onError: () => setError("Email ou senha incorretos."),
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-green-500">
                    Acesso Restrito
                </h1>

                {error && (
                    <div className="bg-red-500/20 text-red-200 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none"
                            value={values.email}
                            onChange={(e) =>
                                setValues({ ...values, email: e.target.value })
                            }
                            required
                            placeholder="admin@turismo.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Senha</label>
                        <input
                            type="password"
                            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-green-500 focus:outline-none"
                            value={values.password}
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    password: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-500 py-2 rounded font-bold transition"
                    >
                        Entrar
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-400 hover:text-white border-b border-transparent hover:border-white transition"
                    >
                        ← Voltar para o Site
                    </Link>
                </div>
            </div>
        </div>
    );
}
