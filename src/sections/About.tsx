import Container from "@/components/shared/Container";

export default function About() {
  return (
    <section
      id="about"
      className="py-24"
    >
      <Container>
        <div className="mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            About
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Who I Am
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <div>
            <p className="leading-8 text-slate-400">
              안녕하세요.

              저는 사용자 경험을 중요하게 생각하는
              프론트엔드 개발자입니다.

              Next.js와 React를 중심으로
              유지보수가 쉬운 구조와
              확장 가능한 서비스를 만드는 것을 좋아합니다.

              또한 NestJS를 이용한 Backend 개발도 함께 진행하며
              Full Stack 프로젝트를 제작하고 있습니다.
            </p>
          </div>

          {/* Right */}
          <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/10 bg-white/5">
            <span className="text-slate-500">
              Profile Image
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}