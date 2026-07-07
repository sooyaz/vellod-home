import Container from "@/components/shared/Container";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-400">
            Freelance Frontend Developer
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Modern Web
            <br />
            Experiences
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-slate-400 md:text-lg">
            Next.js · React · NestJS 기반으로
            빠르고 확장 가능한 웹 서비스를 개발합니다.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500">
              Portfolio
            </button>

            <button className="rounded-xl border border-white/10 px-6 py-3 font-medium transition hover:border-blue-500">
              Contact
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}