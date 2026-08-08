export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <section className="px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-zinc-500">
          Uma nova experiência
        </p>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Project Sirius
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-400">
          Uma experiência digital interativa construída com Next.js,
          inteligência artificial e design imersivo.
        </p>

        <button
          type="button"
          className="mt-10 rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          Iniciar experiência
        </button>
      </section>
    </main>
  );
}