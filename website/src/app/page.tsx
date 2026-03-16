import Image from "next/image";

const CHECK_ICON = "/images/check-icon.svg";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-center w-full">
      <Image src={CHECK_ICON} alt="" width={16} height={16} className="shrink-0" />
      <p className="flex-1 text-sm text-[#939393] tracking-[-0.14px]">
        {children}
      </p>
    </div>
  );
}

function ScheduleVisual() {
  const heights = [16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72];
  return (
    <div className="w-full lg:w-[421px] shrink-0 backdrop-blur-xl bg-[rgba(32,31,29,0.81)] rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl overflow-hidden px-[23px] py-[19px] flex flex-col justify-between min-h-[200px]">
      <div className="flex gap-2 items-start">
        <Image src="/images/schedule-icon.svg" alt="" width={16} height={16} />
        <span className="text-sm font-medium text-[#96938e]">Schedule</span>
      </div>
      <div className="flex gap-[5px] items-end w-full mt-6">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg"
            style={{
              height: h,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(153,153,153,0.06))",
            }}
          />
        ))}
      </div>
      <div className="flex items-end justify-between w-full mt-6">
        <p className="text-xl font-medium text-[#e4ddd7]">$50 / week</p>
        <p className="text-sm font-medium text-[#96938e]">
          Next buy: Tuesday &middot; 09:00
        </p>
      </div>
    </div>
  );
}

function PriceTriggerVisual() {
  return (
    <div className="w-full lg:w-[421px] shrink-0 backdrop-blur-xl bg-[rgba(32,31,29,0.81)] rounded-b-2xl lg:rounded-bl-none lg:rounded-l-2xl overflow-hidden px-[23px] py-[19px] flex flex-col justify-between min-h-[200px]">
      <div className="flex gap-2 items-start">
        <Image src="/images/trigger-icon.svg" alt="" width={16} height={16} />
        <span className="text-sm font-medium text-[#96938e]">Price Trigger</span>
      </div>
      <div className="relative h-[72px] w-full mt-6">
        <Image
          src="/images/chart-baseline.svg"
          alt=""
          fill
          className="object-contain object-bottom"
        />
        <Image
          src="/images/chart-line.svg"
          alt=""
          fill
          className="object-contain object-bottom"
        />
        <div className="absolute left-[60%] top-[43%] bg-[rgba(255,255,255,0.06)] px-2 py-1 rounded">
          <span className="text-sm font-medium text-white">$4,600</span>
        </div>
      </div>
      <div className="flex items-end justify-between w-full mt-6">
        <p className="text-xl font-medium text-[#e4ddd7]">{`Buy < $4,600`}</p>
        <p className="text-sm font-medium text-[#96938e]">
          Bought <span className="text-[#e4ddd7]">0.016 XAU&#x20AE;</span>
        </p>
      </div>
    </div>
  );
}

function GoalVisual() {
  return (
    <div className="w-full lg:w-[421px] shrink-0 backdrop-blur-xl bg-[rgba(32,31,29,0.81)] rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl overflow-hidden px-[23px] py-[19px] flex flex-col justify-between min-h-[200px]">
      <div className="flex gap-2 items-start">
        <Image src="/images/goal-icon.svg" alt="" width={16} height={16} />
        <span className="text-sm font-medium text-[#96938e]">Goal</span>
      </div>
      <div className="flex flex-col gap-2 w-full mt-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#96938e]">Accumulated</span>
            <span className="text-xl font-medium text-[#e4ddd7]">
              1.26 XAU&#x20AE;
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#96938e]">Goal</span>
            <span className="text-xl font-medium text-[#e4ddd7]">3 XAU&#x20AE;</span>
          </div>
        </div>
        <div className="w-full h-[3px] bg-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
          <div
            className="h-[4px] bg-[#e4ddd7] rounded-lg"
            style={{ width: "42%" }}
          />
        </div>
      </div>
      <div className="flex items-end justify-between w-full mt-6">
        <p className="text-sm font-medium text-[#96938e]">
          42% complete &middot; 8 months to go at current pace
        </p>
      </div>
    </div>
  );
}

function TelegramVisual() {
  return (
    <div className="w-full lg:w-[421px] shrink-0 backdrop-blur-xl bg-[rgba(32,31,29,0.81)] rounded-b-2xl lg:rounded-bl-none lg:rounded-l-2xl overflow-hidden px-[23px] py-[19px] flex flex-col gap-6 h-[272px]">
      <div className="flex gap-2 items-center pb-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="w-6 h-6 rounded-full bg-[rgba(0,0,0,0.25)] flex items-center justify-center">
          <Image src="/images/auric-small.svg" alt="" width={16} height={10} />
        </div>
        <span className="text-sm font-medium text-[#e4ddd7]">Auric Bot</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center">
          <div className="bg-[rgba(255,255,255,0.06)] px-2 py-1 rounded-tr rounded-br rounded-bl flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[#e4ddd7]">
              Bought 0.016 XAU&#x20AE; at $4,647
            </span>
            <span className="text-[11px] font-medium text-[#96938e]">
              DCA &middot; Tuesday 09:00 UTC
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <div className="bg-[rgba(63,142,195,0.52)] px-2 py-1 rounded-tl rounded-tr rounded-bl h-6 flex items-center">
            <span className="text-xs font-medium text-[#e4ddd7]">/status</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[rgba(255,255,255,0.06)] px-2 py-1 rounded-tr rounded-br rounded-bl flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[#e4ddd7]">
              Total: 0.42 XAU&#x20AE; &middot; $1,319 &middot; +12.4%
            </span>
            <span className="text-[11px] font-medium text-[#96938e]">
              3 active rules
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const FLAGS = Array.from({ length: 16 }, (_, i) => `/images/flag-${i + 1}.svg`);

function FlagRow({ order }: { order: number[] }) {
  return (
    <div className="flex gap-6 md:gap-10 items-center justify-center">
      {order.map((idx, i) => (
        <div key={i} className="w-6 h-6 md:w-8 md:h-8 overflow-hidden shrink-0">
          <Image
            src={FLAGS[idx]}
            alt=""
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-white w-full overflow-hidden">
      {/* XAU₮ watermark */}
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[264px] text-[60px] font-medium text-[#dccfba] whitespace-nowrap z-0 pointer-events-none hidden lg:block"
        style={{ fontFamily: "var(--font-eb-garamond), 'EB Garamond', serif" }}
      >
        XAU&#x20AE;
      </p>

      {/* Hero Section */}
      <section className="relative mx-2 mt-2 rounded-2xl overflow-hidden h-[600px] md:h-[867px]">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(150deg, rgba(29,28,26,0.74) 12%, rgba(29,28,26,0) 77%)",
            }}
          />
        </div>

        {/* Nav */}
        <nav className="relative z-10 flex items-center justify-between px-4 md:px-9 pt-6">
          <div className="flex gap-2 items-center">
            <Image
              src="/images/logo-icon.svg"
              alt="Auric"
              width={29}
              height={19}
            />
            <Image
              src="/images/logo-text.svg"
              alt="Auric"
              width={60}
              height={20}
            />
          </div>
          <div className="hidden md:flex gap-0.5 items-center">
            <a
              href="#how-it-works"
              className="px-2 py-2 text-sm font-medium text-white"
            >
              How it works
            </a>
            <a
              href="#features"
              className="px-2 py-2 text-sm font-medium text-white w-[114px] text-center"
            >
              Features
            </a>
            <a
              href="#why-xaut"
              className="px-2 py-2 text-sm font-medium text-white w-[114px] text-center"
            >
              {`Why XAU₮`}
            </a>
          </div>
          <a
            href="#cta"
            className="bg-[#fef9f4] text-[#1d1c1a] font-medium text-sm md:text-base px-3 md:px-4 py-2 md:py-3 rounded-full h-[36px] md:h-[44px] flex items-center tracking-[-0.1px]"
          >
            <span className="hidden md:inline">Start Accumulating &rarr;</span>
            <span className="md:hidden">Get Started &rarr;</span>
          </a>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <div className="flex flex-col gap-6 md:gap-8 items-center text-center max-w-[557px]">
            <div className="flex flex-col gap-4 md:gap-[25px] items-center w-full">
              <h1 className="text-[36px] md:text-[52px] lg:text-[64px] font-medium leading-[1.1] md:leading-[70px] text-[#fef9f4]">
                Gold that works while you sleep.
              </h1>
              <p className="text-base md:text-xl font-medium text-[#fff3e9] max-w-[443px]">
                Set your accumulation rules once. Auric monitors XAU&#x20AE;
                markets, evaluates your conditions, and executes on-chain &mdash;
                while you sleep.
              </p>
            </div>
            <a
              href="#"
              className="bg-[#fef9f4] text-[#1d1c1a] font-medium text-base px-4 py-3 rounded-full h-[44px] flex items-center tracking-[-0.1px]"
            >
              Open Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-[986px] mx-auto pt-16 md:pt-[100px] px-5 md:px-6 lg:px-0">
        <div className="mb-8 md:mb-12">
          <div className="bg-[#f6f6f6] inline-flex items-center justify-center px-2 py-1.5 rounded-full mb-4 md:mb-6">
            <span className="text-sm font-medium text-[#939393] tracking-[-0.1px]">
              Features
            </span>
          </div>
          <h2 className="text-[28px] md:text-[40px] font-medium text-[#201f1d] leading-normal max-w-[459px]">
            Everything to automate your gold savings.
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-[88px]">
          {/* DCA Schedules */}
          <div className="flex flex-col lg:flex-row lg:items-stretch w-full">
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                DCA schedules
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                Set a recurring amount and Auric automatically buys Tether Gold
                (XAU&#x20AE;) at your chosen cadence.
              </p>
              <CheckItem>
                Weekly, bi-weekly, or monthly &mdash; your choice
              </CheckItem>
              <CheckItem>
                {`Runs silently on autopilot — you're notified after each buy`}
              </CheckItem>
              <CheckItem>Adjust or pause any time from Telegram</CheckItem>
            </div>
            <ScheduleVisual />
          </div>

          {/* Price Triggers */}
          <div className="flex flex-col-reverse lg:flex-row lg:items-stretch w-full">
            <PriceTriggerVisual />
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                Price Triggers
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                Define a dip threshold and Auric buys the moment XAU&#x20AE; hits
                it. Capitalise on market moves automatically.
              </p>
              <CheckItem>Set any price level as your trigger</CheckItem>
              <CheckItem>
                {`Instant settlement through Tether's infrastructure`}
              </CheckItem>
              <CheckItem>
                Set multiple triggers, each with its own buy amount
              </CheckItem>
            </div>
          </div>

          {/* Goal-based saving */}
          <div className="flex flex-col lg:flex-row lg:items-stretch w-full">
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                Goal-based saving
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                Set a target in XAU&#x20AE; &mdash; say, 1 oz of gold &mdash; and
                let Auric accumulate until you reach it.
              </p>
              <CheckItem>
                Target in XAU&#x20AE; or USD equivalent
              </CheckItem>
              <CheckItem>Tracks progress in real time</CheckItem>
              <CheckItem>Notifies you the moment you hit your goal</CheckItem>
            </div>
            <GoalVisual />
          </div>

          {/* Telegram interface */}
          <div className="flex flex-col-reverse lg:flex-row lg:items-start w-full">
            <TelegramVisual />
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                Telegram interface
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                Everything lives in Telegram. Define rules, check your balance, and
                get execution confirmations &mdash; no app needed.
              </p>
              <CheckItem>Bot-guided setup in under 2 minutes</CheckItem>
              <CheckItem>Instant notifications on every execution</CheckItem>
              <CheckItem>
                /status, /pause, /history, /withdraw commands
              </CheckItem>
            </div>
          </div>
        </div>
      </section>

      {/* Why XAU₮ Section */}
      <section
        id="why-xaut"
        className="bg-[#f7f6f6] mt-16 md:mt-[100px] py-12 md:py-[80px] relative overflow-hidden"
      >
        <div className="flex flex-col gap-3 md:gap-4 items-center">
          <div className="opacity-40">
            <FlagRow
              order={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            />
          </div>
          <div className="opacity-40">
            <FlagRow
              order={[10, 0, 1, 3, 4, 6, 7, 8, 2, 9, 11, 12, 5, 13, 14, 15]}
            />
          </div>
          <div className="opacity-40">
            <FlagRow
              order={[0, 5, 1, 2, 7, 6, 3, 9, 13, 10, 4, 12, 8, 15, 14, 11]}
            />
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12 px-5">
          <h2 className="text-2xl md:text-4xl font-medium text-[#201f1d]">
            The next step beyond USDT in Latin America.
          </h2>
          <p className="max-w-[601px] mx-auto mt-4 md:mt-6 text-sm md:text-base font-medium text-[#96938e] leading-normal">
            In Latin America, USDT helps people shield their savings from
            inflation. XAU&#x20AE; is the next logical step &mdash; gold-backed,
            borderless, and settled on-chain.{" "}
            <span className="text-[#201f1d]">Auric</span> automates this,
            allowing your gold position to grow while you focus on other things.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-[988px] mx-auto pt-12 md:pt-[80px] px-5 md:px-6 lg:px-0">
        <div className="py-6 md:py-8">
          <div className="bg-[#f6f6f6] inline-flex items-center justify-center px-2 py-1.5 rounded-full mb-4 md:mb-6">
            <span className="text-sm font-medium text-[#939393] tracking-[-0.1px]">
              How it works
            </span>
          </div>
          <h2 className="text-[28px] md:text-[40px] font-medium text-[#201f1d] leading-normal">
            Set it up once.
            <br />
            Let it compound.
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          {[
            {
              num: "01",
              title: "Define your strategy",
              desc: "Set a DCA schedule, configure price-trigger buys, or define a savings goal. Auric understands your intent, not just your instructions.",
              border: true,
            },
            {
              num: "02",
              title: "Fund your wallet",
              desc: "Self-custodial from day one. Your seed phrase stays with you \u2014 private keys are derived on-demand and never stored.",
              border: true,
            },
            {
              num: "03",
              title: "Auric runs",
              desc: "Auric monitors XAU\u20AE conditions continuously, evaluates your rules, and settles on-chain through Tether\u2019s infrastructure. You just watch it grow.",
              border: false,
            },
          ].map((step) => (
            <div
              key={step.num}
              className={`flex gap-4 md:gap-8 items-start py-4 md:py-6 w-full ${step.border ? "border-b border-[#f0f0f0]" : ""}`}
            >
              <div className="w-[40px] md:w-[51px] shrink-0 opacity-50">
                <p className="text-[32px] md:text-[40px] font-medium text-[#96938e] leading-none">
                  {step.num}
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-4 md:gap-6 overflow-hidden">
                <p className="text-xl md:text-2xl font-medium text-[#1d1c1a] tracking-[-0.24px]">
                  {step.title}
                </p>
                <div className="max-w-[370px]">
                  <p className="text-sm md:text-base text-[#96938e] tracking-[-0.16px] leading-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="max-w-[1308px] mx-auto mt-12 md:mt-[80px] mb-12 md:mb-[80px] px-4 md:px-6 lg:px-0">
        <div className="bg-[#f7f6f6] rounded-2xl md:rounded-3xl h-[400px] md:h-[549px] flex items-center justify-center overflow-hidden px-6">
          <div className="flex flex-col gap-4 items-center max-w-[621px]">
            <Image
              src="/images/auric-cta-logo.svg"
              alt="Auric"
              width={72}
              height={59}
            />
            <h2 className="text-2xl md:text-[32px] font-medium text-[#201f1d] text-center">
              Start building your gold position.
            </h2>
            <p className="text-sm md:text-base font-medium text-[#96938e] text-center w-full">
              Join the waitlist. Launching with a small group of early users
              first.
            </p>
            <a
              href="#"
              className="bg-[#ffea98] border-2 border-[rgba(127,117,76,0.04)] text-[#2b2b2b] font-medium text-base px-4 py-3 rounded-full h-[44px] flex items-center tracking-[-0.3px]"
            >
              Open Telegram
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#f0f0f0] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-4 md:py-6 gap-3 md:gap-0">
        <div className="flex gap-4 items-center">
          <div className="flex gap-1.5 items-center">
            <Image
              src="/images/footer-logo-light.svg"
              alt="Auric"
              width={18}
              height={18}
            />
            <span
              className="text-xl font-medium text-[#201f1d]"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              Auric
            </span>
          </div>
          <span className="text-sm font-medium text-[#96938e]">By TNT Labs</span>
        </div>
        <p
          className="text-xs md:text-sm font-medium text-[#939393]"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Tether Gold DCA Engine Hackathon
          <span className="text-[#96938e]"> &middot; </span>
          <span className="text-[rgba(150,147,142,0.5)]">2026</span>
        </p>
      </footer>
    </main>
  );
}
