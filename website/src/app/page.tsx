"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { t, type Lang } from "./translations";

const CHECK_ICON = "/images/check-icon.svg";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 items-center w-full">
      <Image
        src={CHECK_ICON}
        alt=""
        width={16}
        height={16}
        className="shrink-0"
      />
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
    <div className="w-full lg:w-[421px] shrink-0 backdrop-blur-xl bg-[rgba(32,31,29,0.81)] rounded-b-2xl lg:rounded-br-none lg:rounded-l-2xl overflow-hidden px-[23px] py-[19px] flex flex-col justify-between min-h-[200px]">
      <div className="flex gap-2 items-start">
        <Image src="/images/trigger-icon.svg" alt="" width={16} height={16} />
        <span className="text-sm font-medium text-[#96938e]">
          Price Trigger
        </span>
      </div>
      <div className="w-full mt-6">
        <svg
          viewBox="0 0 376 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M1.49707 67.5001L1.49707 68.5001L0.5 68.5001L0.5 67.5001L1.49707 67.5001ZM5.48633 67.5001L5.48633 68.5001L3.49219 68.5001L3.49219 67.5001L5.48633 67.5001ZM9.47559 67.5001L9.47559 68.5001L7.48145 68.5001L7.48145 67.5001L9.47559 67.5001ZM13.4658 67.5001L13.4658 68.5001L11.4707 68.5001L11.4707 67.5001L13.4658 67.5001ZM17.4551 67.5001L17.4551 68.5001L15.46 68.5001L15.46 67.5001L17.4551 67.5001ZM21.4443 67.5001L21.4443 68.5001L19.4492 68.5001L19.4492 67.5001L21.4443 67.5001ZM25.4336 67.5001L25.4336 68.5001L23.4385 68.5001L23.4385 67.5001L25.4336 67.5001ZM29.4229 67.5001L29.4229 68.5001L27.4277 68.5001L27.4277 67.5001L29.4229 67.5001ZM33.4121 67.5001L33.4121 68.5001L31.418 68.5001L31.418 67.5001L33.4121 67.5001ZM37.4014 67.5001L37.4014 68.5001L35.4072 68.5001L35.4072 67.5001L37.4014 67.5001ZM41.3906 67.5001L41.3906 68.5001L39.3965 68.5001L39.3965 67.5001L41.3906 67.5001ZM45.3799 67.5001L45.3799 68.5001L43.3857 68.5001L43.3857 67.5001L45.3799 67.5001ZM49.3701 67.5001L49.3701 68.5001L47.375 68.5001L47.375 67.5001L49.3701 67.5001ZM53.3594 67.5001L53.3594 68.5001L51.3643 68.5001L51.3643 67.5001L53.3594 67.5001ZM57.3486 67.5001L57.3486 68.5001L55.3535 68.5001L55.3535 67.5001L57.3486 67.5001ZM61.3379 67.5001L61.3379 68.5001L59.3428 68.5001L59.3428 67.5001L61.3379 67.5001ZM65.3271 67.5001L65.3271 68.5001L63.332 68.5001L63.332 67.5001L65.3271 67.5001ZM69.3164 67.5001L69.3164 68.5001L67.3223 68.5001L67.3223 67.5001L69.3164 67.5001ZM73.3057 67.5001L73.3057 68.5001L71.3115 68.5001L71.3115 67.5001L73.3057 67.5001ZM77.2949 67.5001L77.2949 68.5001L75.3008 68.5001L75.3008 67.5001L77.2949 67.5001ZM81.2842 67.5001L81.2842 68.5001L79.29 68.5001L79.29 67.5001L81.2842 67.5001ZM85.2744 67.5001L85.2744 68.5001L83.2793 68.5001L83.2793 67.5001L85.2744 67.5001ZM89.2637 67.5001L89.2637 68.5001L87.2686 68.5001L87.2686 67.5001L89.2637 67.5001ZM93.2529 67.5001L93.2529 68.5001L91.2578 68.5001L91.2578 67.5001L93.2529 67.5001ZM97.2422 67.5001L97.2422 68.5001L95.2471 68.5001L95.2471 67.5001L97.2422 67.5001ZM101.231 67.5001L101.231 68.5001L99.2363 68.5001L99.2363 67.5001L101.231 67.5001ZM105.221 67.5001L105.221 68.5001L103.227 68.5001L103.227 67.5001L105.221 67.5001ZM109.21 67.5001L109.21 68.5001L107.216 68.5001L107.216 67.5001L109.21 67.5001ZM113.199 67.5001L113.199 68.5001L111.205 68.5001L111.205 67.5001L113.199 67.5001ZM117.188 67.5001L117.188 68.5001L115.194 68.5001L115.194 67.5001L117.188 67.5001ZM121.179 67.5001L121.179 68.5001L119.184 68.5001L119.184 67.5001L121.179 67.5001ZM125.168 67.5001L125.168 68.5001L123.173 68.5001L123.173 67.5001L125.168 67.5001ZM129.157 67.5001L129.157 68.5001L127.162 68.5001L127.162 67.5001L129.157 67.5001ZM133.146 67.5001L133.146 68.5001L131.151 68.5001L131.151 67.5001L133.146 67.5001ZM137.136 67.5001L137.136 68.5001L135.141 68.5001L135.141 67.5001L137.136 67.5001ZM141.125 67.5001L141.125 68.5001L139.13 68.5001L139.13 67.5001L141.125 67.5001ZM145.114 67.5001L145.114 68.5001L143.12 68.5001L143.12 67.5001L145.114 67.5001ZM149.104 67.5001L149.104 68.5001L147.109 68.5001L147.109 67.5001L149.104 67.5001ZM153.093 67.5001L153.093 68.5001L151.099 68.5001L151.099 67.5001L153.093 67.5001ZM157.082 67.5001L157.082 68.5001L155.088 68.5001L155.088 67.5001L157.082 67.5001ZM161.072 67.5001L161.072 68.5001L159.077 68.5001L159.077 67.5001L161.072 67.5001ZM165.062 67.5001L165.062 68.5001L163.066 68.5001L163.066 67.5001L165.062 67.5001ZM169.051 67.5001L169.051 68.5001L167.056 68.5001L167.056 67.5001L169.051 67.5001ZM173.04 67.5001L173.04 68.5001L171.045 68.5001L171.045 67.5001L173.04 67.5001ZM177.029 67.5001L177.029 68.5001L175.034 68.5001L175.034 67.5001L177.029 67.5001ZM181.019 67.5001L181.019 68.5001L179.023 68.5001L179.023 67.5001L181.019 67.5001ZM185.008 67.5001L185.008 68.5001L183.014 68.5001L183.014 67.5001L185.008 67.5001ZM188.997 67.5001L188.997 68.5001L187.003 68.5001L187.003 67.5001L188.997 67.5001ZM192.986 67.5001L192.986 68.5001L190.992 68.5001L190.992 67.5001L192.986 67.5001ZM196.976 67.5001L196.976 68.5001L194.981 68.5001L194.981 67.5001L196.976 67.5001ZM200.965 67.5001L200.965 68.5001L198.971 68.5001L198.971 67.5001L200.965 67.5001ZM204.955 67.5001L204.955 68.5001L202.96 68.5001L202.96 67.5001L204.955 67.5001ZM208.944 67.5001L208.944 68.5001L206.949 68.5001L206.949 67.5001L208.944 67.5001ZM212.934 67.5001L212.934 68.5001L210.938 68.5001L210.938 67.5001L212.934 67.5001ZM216.923 67.5001L216.923 68.5001L214.928 68.5001L214.928 67.5001L216.923 67.5001ZM220.912 67.5001L220.912 68.5001L218.917 68.5001L218.917 67.5001L220.912 67.5001ZM224.901 67.5001L224.901 68.5001L222.906 68.5001L222.906 67.5001L224.901 67.5001ZM228.891 67.5001L228.891 68.5001L226.896 68.5001L226.896 67.5001L228.891 67.5001ZM232.88 67.5001L232.88 68.5001L230.886 68.5001L230.886 67.5001L232.88 67.5001ZM236.869 67.5001L236.869 68.5001L234.875 68.5001L234.875 67.5001L236.869 67.5001ZM240.858 67.5001L240.858 68.5001L238.864 68.5001L238.864 67.5001L240.858 67.5001ZM244.848 67.5001L244.848 68.5001L242.854 68.5001L242.854 67.5001L244.848 67.5001ZM248.838 67.5001L248.838 68.5001L246.843 68.5001L246.843 67.5001L248.838 67.5001ZM252.827 67.5001L252.827 68.5001L250.832 68.5001L250.832 67.5001L252.827 67.5001ZM256.816 67.5001L256.816 68.5001L254.821 68.5001L254.821 67.5001L256.816 67.5001ZM260.806 67.5001L260.806 68.5001L258.811 68.5001L258.811 67.5001L260.806 67.5001ZM264.795 67.5001L264.795 68.5001L262.8 68.5001L262.8 67.5001L264.795 67.5001ZM268.784 67.5001L268.784 68.5001L266.79 68.5001L266.79 67.5001L268.784 67.5001ZM272.773 67.5001L272.773 68.5001L270.779 68.5001L270.779 67.5001L272.773 67.5001ZM276.763 67.5001L276.763 68.5001L274.769 68.5001L274.769 67.5001L276.763 67.5001ZM280.753 67.5001L280.753 68.5001L278.758 68.5001L278.758 67.5001L280.753 67.5001ZM284.742 67.5001L284.742 68.5001L282.747 68.5001L282.747 67.5001L284.742 67.5001ZM288.731 67.5001L288.731 68.5001L286.736 68.5001L286.736 67.5001L288.731 67.5001ZM292.721 67.5001L292.721 68.5001L290.726 68.5001L290.726 67.5001L292.721 67.5001ZM296.71 67.5001L296.71 68.5001L294.715 68.5001L294.715 67.5001L296.71 67.5001ZM300.699 67.5001L300.699 68.5001L298.705 68.5001L298.705 67.5001L300.699 67.5001ZM304.688 67.5001L304.688 68.5001L302.694 68.5001L302.694 67.5001L304.688 67.5001ZM308.678 67.5001L308.678 68.5001L306.684 68.5001L306.684 67.5001L308.678 67.5001ZM312.668 67.5001L312.668 68.5001L310.673 68.5001L310.673 67.5001L312.668 67.5001ZM316.657 67.5001L316.657 68.5001L314.662 68.5001L314.662 67.5001L316.657 67.5001ZM320.646 67.5002L320.646 68.5002L318.651 68.5001L318.651 67.5001L320.646 67.5002ZM324.636 67.5002L324.636 68.5002L322.641 68.5002L322.641 67.5002L324.636 67.5002ZM328.625 67.5002L328.625 68.5002L326.63 68.5002L326.63 67.5002L328.625 67.5002ZM332.614 67.5002L332.614 68.5002L330.62 68.5002L330.62 67.5002L332.614 67.5002ZM336.604 67.5002L336.604 68.5002L334.609 68.5002L334.609 67.5002L336.604 67.5002ZM340.593 67.5002L340.593 68.5002L338.599 68.5002L338.599 67.5002L340.593 67.5002ZM344.583 67.5002L344.583 68.5002L342.588 68.5002L342.588 67.5002L344.583 67.5002ZM348.572 67.5002L348.572 68.5002L346.577 68.5002L346.577 67.5002L348.572 67.5002ZM352.562 67.5002L352.562 68.5002L350.566 68.5002L350.566 67.5002L352.562 67.5002ZM356.551 67.5002L356.551 68.5002L354.556 68.5002L354.556 67.5002L356.551 67.5002ZM360.54 67.5002L360.54 68.5002L358.545 68.5002L358.545 67.5002L360.54 67.5002ZM364.529 67.5002L364.529 68.5002L362.535 68.5002L362.535 67.5002L364.529 67.5002ZM368.519 67.5002L368.519 68.5002L366.524 68.5002L366.524 67.5002L368.519 67.5002ZM372.508 67.5002L372.508 68.5002L370.514 68.5002L370.514 67.5002L372.508 67.5002ZM375.5 67.5002L375.5 68.5002L374.503 68.5002L374.503 67.5002L375.5 67.5002Z"
            fill="#545351"
          />
          <path
            d="M0.0538144 0.274518C0.178353 0.0281321 0.479249 -0.0706588 0.725689 0.0538144C49.8212 24.8512 201.877 74.5001 375 74.5001C375.276 74.5001 375.5 74.724 375.5 75.0001C375.5 75.2763 375.276 75.5001 375 75.5001C201.723 75.5001 49.5125 25.8157 0.274518 0.946393C0.0281321 0.821854 -0.0706588 0.520958 0.0538144 0.274518Z"
            fill="url(#paint0_linear_55_12871)"
          />
          <path
            d="M265.5 68.0001C265.5 71.3138 262.814 74.0001 259.5 74.0001C256.186 74.0001 253.5 71.3138 253.5 68.0001C253.5 64.6864 256.186 62.0001 259.5 62.0001C262.814 62.0001 265.5 64.6864 265.5 68.0001Z"
            fill="#D9D9D9"
          />
          <path
            d="M263.5 68.0001C263.5 70.2093 261.709 72.0001 259.5 72.0001C257.291 72.0001 255.5 70.2093 255.5 68.0001C255.5 65.791 257.291 64.0001 259.5 64.0001C261.709 64.0001 263.5 65.791 263.5 68.0001Z"
            fill="#494846"
          />
          <rect
            x="228.5"
            y="32.0001"
            width="61"
            height="25"
            rx="4"
            fill="white"
            fillOpacity="0.06"
          />
          <path
            d="M240.608 51.2579V50.1505C238.407 50.0275 237.054 48.7491 237.054 46.6779H238.578C238.585 47.881 239.344 48.674 240.615 48.8107L240.622 45.5294L240 45.3722C238.64 45.0304 237.266 44.4152 237.266 42.754C237.266 41.0177 238.558 39.8693 240.643 39.7804V38.6798H241.572L241.565 39.8146C243.384 40.047 244.471 41.2228 244.512 42.9318H243.015C242.953 42.0363 242.447 41.3868 241.565 41.1681L241.552 44.3126L242.003 44.422C243.534 44.8048 244.765 45.4884 244.765 47.1632C244.765 48.8585 243.555 49.9728 241.538 50.1437L241.531 51.2579H240.608ZM240.629 44.087L240.636 41.0929C239.487 41.1681 238.824 41.8038 238.824 42.713C238.824 43.5743 239.795 43.882 240.629 44.087ZM241.538 48.797C242.598 48.6466 243.213 48.0382 243.213 47.1974C243.213 46.213 242.44 45.9738 241.552 45.755L241.538 48.797ZM245.585 48.0314V46.8146L249.926 39.9376H251.799V46.7462H253.139V48.0314H251.799V50.0001H250.35V48.0314H245.585ZM250.363 46.7462V41.7491H250.288L247.178 46.6642V46.7462H250.363ZM255.805 48.6193L255.736 49.1593C255.579 50.3351 255.06 51.8185 254.82 52.4611H253.788C253.911 51.8458 254.226 50.506 254.349 49.1798L254.39 48.6193H255.805ZM260.31 50.1368C258.512 50.1232 256.632 49.0157 256.632 45.3107C256.632 41.7833 258.095 39.7736 260.433 39.7736C262.224 39.7736 263.475 40.9357 263.714 42.549H262.217C262.005 41.6945 261.39 41.1066 260.433 41.1134C258.956 41.1066 258.088 42.4601 258.088 44.7638H258.163C258.676 43.923 259.592 43.4034 260.658 43.3966C262.395 43.4034 263.796 44.7911 263.789 46.7189C263.796 48.6398 262.408 50.1573 260.31 50.1368ZM260.303 48.8585C261.451 48.8585 262.319 47.922 262.319 46.7325C262.319 45.5704 261.479 44.6407 260.323 44.6339C259.168 44.6407 258.279 45.6183 258.272 46.7462C258.266 47.881 259.127 48.8585 260.303 48.8585ZM268.403 50.1642C266.079 50.1642 264.712 48.2638 264.719 44.9689C264.719 41.7013 266.093 39.8009 268.403 39.8009C270.714 39.8009 272.088 41.7013 272.095 44.9689C272.088 48.2706 270.721 50.1642 268.403 50.1642ZM268.403 48.8585C269.764 48.8585 270.584 47.4913 270.584 44.9689C270.577 42.4669 269.75 41.0861 268.403 41.0929C267.05 41.0861 266.223 42.4669 266.236 44.9689C266.223 47.4913 267.043 48.8585 268.403 48.8585ZM276.606 50.1642C274.282 50.1642 272.915 48.2638 272.922 44.9689C272.922 41.7013 274.296 39.8009 276.606 39.8009C278.917 39.8009 280.291 41.7013 280.298 44.9689C280.291 48.2706 278.924 50.1642 276.606 50.1642ZM276.606 48.8585C277.967 48.8585 278.787 47.4913 278.787 44.9689C278.78 42.4669 277.953 41.0861 276.606 41.0929C275.253 41.0861 274.426 42.4669 274.439 44.9689C274.426 47.4913 275.246 48.8585 276.606 48.8585Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_55_12871"
              x1="0.500103"
              y1="1.00011"
              x2="371"
              y2="75.0001"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#545351" stopOpacity="0.34" />
              <stop offset="1" stopColor="#545351" />
            </linearGradient>
          </defs>
        </svg>
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
            <span className="text-xs font-medium text-[#96938e]">
              Accumulated
            </span>
            <span className="text-xl font-medium text-[#e4ddd7]">
              1.26 XAU&#x20AE;
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-[#96938e]">Goal</span>
            <span className="text-xl font-medium text-[#e4ddd7]">
              3 XAU&#x20AE;
            </span>
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

function SmartDcaVisual() {
  const bars = [
    { base: 40, weight: +20, label: "+20%" },
    { base: 40, weight: 0, label: "" },
    { base: 40, weight: -30, label: "-30%" },
    { base: 40, weight: +15, label: "+15%" },
    { base: 40, weight: 0, label: "" },
    { base: 40, weight: +25, label: "+25%" },
    { base: 40, weight: -20, label: "-20%" },
    { base: 40, weight: 0, label: "" },
  ];
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  return (
    <div className="w-full lg:w-[421px] shrink-0 backdrop-blur-xl bg-[rgba(32,31,29,0.81)] rounded-b-2xl lg:rounded-br-none lg:rounded-l-2xl overflow-hidden px-[23px] py-[19px] flex flex-col justify-between min-h-[200px]">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src="/images/schedule-icon.svg"
            alt=""
            width={16}
            height={16}
          />
          <span className="text-sm font-medium text-[#96938e]">Smart DCA</span>
        </div>
        <span className="text-xs font-medium text-[#96938e] opacity-60">
          adaptive
        </span>
      </div>
      <div className="flex items-end gap-[6px] w-full mt-6 relative">
        {/* avg cost dashed line */}
        <div
          className="absolute left-0 right-0 border-t border-dashed border-[rgba(228,221,215,0.25)]"
          style={{ bottom: 40 }}
        />
        <span
          className="absolute right-0 text-[9px] font-medium text-[#96938e] opacity-50"
          style={{ bottom: 42 }}
        >
          avg $4,612
        </span>
        {bars.map((b, i) => {
          const h = b.base + (b.base * b.weight) / 100;
          const isUp = b.weight > 0;
          const isDown = b.weight < 0;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              {b.label && (
                <span
                  className={`text-[9px] font-medium ${isUp ? "text-[#7ecb8b]" : "text-[#cb7e7e]"}`}
                >
                  {b.label}
                </span>
              )}
              <div
                className="w-full rounded-md"
                style={{
                  height: h,
                  background: isUp
                    ? "linear-gradient(to bottom, rgba(126,203,139,0.35), rgba(126,203,139,0.08))"
                    : isDown
                      ? "linear-gradient(to bottom, rgba(203,126,126,0.35), rgba(203,126,126,0.08))"
                      : "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(153,153,153,0.06))",
                }}
              />
              <span className="text-[9px] font-medium text-[#96938e] opacity-50">
                {weeks[i]}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-end justify-between w-full mt-4">
        <p className="text-xl font-medium text-[#e4ddd7]">$50 / week</p>
        <p className="text-sm font-medium text-[#96938e]">
          Next: checking market
        </p>
      </div>
    </div>
  );
}

function TelegramVisual() {
  return (
    <div className="w-full lg:w-[421px] shrink-0 backdrop-blur-xl bg-[rgba(32,31,29,0.81)] rounded-b-2xl lg:rounded-br-none lg:rounded-l-2xl overflow-hidden px-[23px] py-[19px] flex flex-col gap-6 h-[272px]">
      <div className="flex gap-2 items-center pb-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="w-6 h-6 rounded-full bg-[rgba(0,0,0,0.25)] flex items-center justify-center">
          <Image src="/images/auric-small.svg" alt="" width={16} height={10} />
        </div>
        <span className="text-sm font-medium text-[#e4ddd7]">Auric</span>
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

function LanguageToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <button
      onClick={() => onChange(lang === "en" ? "es" : "en")}
      className="text-sm font-medium text-white/70 hover:text-white transition-colors px-2 py-1"
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved && saved !== lang) setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const l = (obj: { en: string; es: string }) => obj[lang];

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
        <nav className="relative z-20 flex items-center justify-between px-4 md:px-9 pt-6">
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
              {l(t.nav.howItWorks)}
            </a>
            <a
              href="#features"
              className="px-2 py-2 text-sm font-medium text-white w-[114px] text-center"
            >
              {l(t.nav.features)}
            </a>
            <a
              href="#why-xaut"
              className="px-2 py-2 text-sm font-medium text-white w-[114px] text-center"
            >
              {l(t.nav.whyXaut)}
            </a>
            <LanguageToggle lang={lang} onChange={setLang} />
          </div>
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <LanguageToggle lang={lang} onChange={setLang} />
            </div>
            <a
              href="#cta"
              className="bg-[#fef9f4] text-[#1d1c1a] font-medium text-sm md:text-base px-3 md:px-4 py-2 md:py-3 rounded-full h-[36px] md:h-[44px] flex items-center tracking-[-0.1px]"
            >
              <span className="hidden md:inline">{l(t.nav.cta)}</span>
              <span className="md:hidden">{l(t.nav.ctaMobile)}</span>
            </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <div className="flex flex-col gap-6 md:gap-8 items-center text-center max-w-[580px]">
            <div className="flex flex-col gap-4 md:gap-[25px] items-center w-full">
              <h1 className="text-[36px] md:text-[52px] lg:text-[64px] font-medium leading-[1.1] md:leading-[70px] text-[#fef9f4]">
                {l(t.hero.headline)}
              </h1>
              <p className="text-base md:text-xl font-medium text-[#fff3e9] max-w-[470px]">
                {l(t.hero.sub)}
              </p>
            </div>
            <a
              href="#cta"
              className="bg-[#fef9f4] text-[#1d1c1a] font-medium text-base px-4 py-3 rounded-full h-[44px] flex items-center tracking-[-0.1px]"
            >
              {l(t.hero.cta)}
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-[986px] mx-auto pt-16 md:pt-[100px] px-5 md:px-6 lg:px-0"
      >
        <div className="mb-8 md:mb-12">
          <div className="bg-[#f6f6f6] inline-flex items-center justify-center px-2 py-1.5 rounded-full mb-4 md:mb-6">
            <span className="text-sm font-medium text-[#939393] tracking-[-0.1px]">
              {l(t.features.label)}
            </span>
          </div>
          <h2 className="text-[28px] md:text-[40px] font-medium text-[#201f1d] leading-normal max-w-[459px]">
            {l(t.features.heading)}
          </h2>
        </div>

        <div className="flex flex-col gap-12 md:gap-[88px]">
          {/* Smart DCA */}
          <div className="flex flex-col-reverse lg:flex-row lg:items-stretch w-full">
            <SmartDcaVisual />
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                {l(t.features.smartDca.title)}
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                {l(t.features.smartDca.desc)}
              </p>
              <CheckItem>{l(t.features.smartDca.check1)}</CheckItem>
              <CheckItem>{l(t.features.smartDca.check2)}</CheckItem>
              <CheckItem>{l(t.features.smartDca.check3)}</CheckItem>
            </div>
          </div>

          {/* DCA Schedules */}
          <div className="flex flex-col lg:flex-row lg:items-stretch w-full">
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                {l(t.features.dca.title)}
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                {l(t.features.dca.desc)}
              </p>
              <CheckItem>{l(t.features.dca.check1)}</CheckItem>
              <CheckItem>{l(t.features.dca.check2)}</CheckItem>
              <CheckItem>{l(t.features.dca.check3)}</CheckItem>
            </div>
            <ScheduleVisual />
          </div>

          {/* Price Triggers */}
          <div className="flex flex-col-reverse lg:flex-row lg:items-stretch w-full">
            <PriceTriggerVisual />
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                {l(t.features.priceTrigger.title)}
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                {l(t.features.priceTrigger.desc)}
              </p>
              <CheckItem>{l(t.features.priceTrigger.check1)}</CheckItem>
              <CheckItem>{l(t.features.priceTrigger.check2)}</CheckItem>
              <CheckItem>{l(t.features.priceTrigger.check3)}</CheckItem>
            </div>
          </div>

          {/* Goal-based saving */}
          <div className="flex flex-col lg:flex-row lg:items-stretch w-full">
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                {l(t.features.goal.title)}
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                {l(t.features.goal.desc)}
              </p>
              <CheckItem>{l(t.features.goal.check1)}</CheckItem>
              <CheckItem>{l(t.features.goal.check2)}</CheckItem>
              <CheckItem>{l(t.features.goal.check3)}</CheckItem>
            </div>
            <GoalVisual />
          </div>

          {/* Telegram interface */}
          <div className="flex flex-col-reverse lg:flex-row lg:items-start w-full">
            <TelegramVisual />
            <div className="flex-1 flex flex-col gap-4 p-6 md:p-10 bg-[#fcfcfb] rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl min-w-0">
              <h3 className="text-2xl md:text-[32px] font-medium leading-normal text-[#201f1d]">
                {l(t.features.telegram.title)}
              </h3>
              <p className="text-base text-[#939393] tracking-[-0.16px] leading-normal">
                {l(t.features.telegram.desc)}
              </p>
              <CheckItem>{l(t.features.telegram.check1)}</CheckItem>
              <CheckItem>{l(t.features.telegram.check2)}</CheckItem>
              <CheckItem>{l(t.features.telegram.check3)}</CheckItem>
            </div>
          </div>
        </div>
      </section>

      {/* Why XAU₮ Section */}
      <section
        id="why-xaut"
        className="bg-[#f7f6f6] mt-16 md:mt-[100px] py-12 md:py-[80px] relative overflow-hidden"
      >
        <div className="flex justify-center">
          <Image
            src="/images/flags.png"
            alt=""
            width={1568}
            height={200}
            className="w-full max-w-[1000px] h-auto"
          />
        </div>

        <div className="text-center mt-8 md:mt-12 px-5">
          <h2 className="text-2xl md:text-4xl font-medium text-[#201f1d]">
            {l(t.whyXaut.heading)}
          </h2>
          <p className="max-w-[601px] mx-auto mt-4 md:mt-6 text-sm md:text-base font-medium text-[#96938e] leading-normal">
            {l(t.whyXaut.body)}{" "}
            <span className="text-[#201f1d]">{l(t.whyXaut.bodyHighlight)}</span>
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="max-w-[988px] mx-auto pt-12 md:pt-[80px] px-5 md:px-6 lg:px-0"
      >
        <div className="py-6 md:py-8">
          <div className="bg-[#f6f6f6] inline-flex items-center justify-center px-2 py-1.5 rounded-full mb-4 md:mb-6">
            <span className="text-sm font-medium text-[#939393] tracking-[-0.1px]">
              {l(t.howItWorks.label)}
            </span>
          </div>
          <h2 className="text-[28px] md:text-[40px] font-medium text-[#201f1d] leading-normal">
            {l(t.howItWorks.heading1)}
            <br />
            {l(t.howItWorks.heading2)}
          </h2>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          {[
            { num: "01", ...t.howItWorks.step1, border: true },
            { num: "02", ...t.howItWorks.step2, border: true },
            { num: "03", ...t.howItWorks.step3, border: false },
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
                  {l(step.title)}
                </p>
                <div className="max-w-[370px]">
                  <p className="text-sm md:text-base text-[#96938e] tracking-[-0.16px] leading-normal">
                    {l(step.desc)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="max-w-[1308px] mx-auto mt-12 md:mt-[80px] mb-12 md:mb-[80px] px-4 md:px-6 lg:px-0"
      >
        <div className="bg-[#f7f6f6] rounded-2xl md:rounded-3xl h-[400px] md:h-[549px] flex items-center justify-center overflow-hidden px-6">
          <div className="flex flex-col gap-4 items-center max-w-[621px]">
            <Image
              src="/images/auric-cta-logo.svg"
              alt="Auric"
              width={72}
              height={59}
            />
            <h2 className="text-2xl md:text-[32px] font-medium text-[#201f1d] text-center">
              {l(t.cta.heading)}
            </h2>
            <p className="text-sm md:text-base font-medium text-[#96938e] text-center w-full">
              {l(t.cta.body)}
            </p>
            <a
              href="https://auric-tether-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ffea98] border-2 border-[rgba(127,117,76,0.04)] text-[#2b2b2b] font-medium text-base px-4 py-3 rounded-full h-[44px] flex items-center tracking-[-0.3px]"
            >
              {l(t.cta.button)}
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
          <a
            href="https://tntlabs.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#96938e] hover:text-[#c9a55a] transition-colors"
          >
            {l(t.footer.byline)}
          </a>
        </div>
        <p
          className="text-xs md:text-sm font-medium text-[#939393]"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {l(t.footer.hackathon)}
          <span className="text-[#96938e]"> &middot; </span>
          <span className="text-[rgba(150,147,142,0.5)]">2026</span>
        </p>
      </footer>
    </main>
  );
}
