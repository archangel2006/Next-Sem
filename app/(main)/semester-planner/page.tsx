"use client";

export default function SemesterPlannerPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* 🔥 HERO SECTION */}
      <div className="w-full bg-[#0b0b0b] rounded-[40px] px-10 py-12 flex flex-col md:flex-row items-center justify-between mb-20">

        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-4">
            Semester Planner.
          </h1>

          <p className="text-gray-400 text-base">
            Your all-in-one space to manage deadlines, exams, and campus events — 
            so you never miss what matters.
          </p>
        </div>

        <div className="mt-10 md:mt-0">
          <img
            src="/card22.png"
            alt="planner"
            className="w-72 md:w-96"
          />
        </div>
      </div>


      {/* 🧠 WHAT YOU CAN DO */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          What you can do with it 👇
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📅 Add Your Deadlines</h3>
            <p className="text-gray-400 text-sm">
              Easily add assignments, exams, and personal reminders to your planner 
              so everything stays organized in one place.
            </p>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🏫 College Events</h3>
            <p className="text-gray-400 text-sm">
              Societies and clubs can list their events, which automatically appear 
              in your calendar — keeping you updated with campus life.
            </p>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🔄 Auto Updates</h3>
            <p className="text-gray-400 text-sm">
              Once events are added by societies, they instantly reflect in every 
              student’s planner — no manual tracking needed.
            </p>
          </div>

          <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">⚡ Stay Ahead</h3>
            <p className="text-gray-400 text-sm">
              Plan smarter, avoid last-minute stress, and always stay one step ahead 
              in your academic journey.
            </p>
          </div>

        </div>
      </div>


      {/* 📸 CALENDAR SHOWCASE */}
      <div className="w-full bg-[#0b0b0b] rounded-3xl px-10 py-14 
                      flex flex-col md:flex-row items-center 
                      gap-12 mb-20 shadow-[0_0_40px_rgba(255,255,255,0.05)]">

        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-start">

          <div className="bg-[#111] p-3 rounded-2xl border border-gray-800 shadow-lg">
            <img
              src="/calendar.png"
              alt="calendar preview"
              className="w-56 md:w-[280px] lg:w-[320px] 
                         rounded-xl object-contain"
            />
          </div>

        </div>

        {/* RIGHT TEXT */}
        <div className="w-full md:w-1/2 flex justify-start">

          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold mb-4">
              See everything at a glance 📆
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Get a complete and organized view of your semester with a clean calendar interface. 
              Instead of juggling multiple apps and notes, everything — from assignments to exams — 
              is available in one place, helping you stay focused and stress-free.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              Add your own deadlines, track upcoming exams, and never miss important college events. 
              With automatic updates from societies and clubs, your planner keeps evolving in real-time — 
              so you always know what’s coming next and can plan ahead with confidence.
            </p>
          </div>

        </div>

      </div>


      {/* 🚀 CTA SECTION */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to take control of your semester?
        </h2>

        <p className="text-gray-400 mb-6">
          Sign up now and start building your personalized planner.
        </p>

        <button className="bg-white text-black px-6 py-3 rounded-full font-medium 
                           hover:scale-105 hover:shadow-lg transition duration-300">
          Sign up to create your planner →
        </button>
      </div>

    </div>
  );
}