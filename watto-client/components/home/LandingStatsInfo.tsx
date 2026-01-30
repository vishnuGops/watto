"use client";

import React from "react";
import Counter from "../Counter";

export default function LandingStatsInfo() {
  return (
    <section className="bg-white text-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {/* Stat 1: Bottles Sold */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-600">
            Bottles Sold
          </h3>
          <Counter
            value={124991}
            places={[100000, 10000, 1000, 100, 10, 1]}
            fontSize={50}
            padding={5}
            gap={3}
            textColor="black"
            fontWeight={900}
            gradientFrom="white"
            gradientTo="transparent"
          />
        </div>

        {/* Stat 2: Active Users */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-600">
            Active Users
          </h3>
          <Counter
            value={52430}
            places={[10000, 1000, 100, 10, 1]}
            fontSize={50}
            padding={5}
            gap={3}
            textColor="black"
            fontWeight={900}
            gradientFrom="white"
            gradientTo="transparent"
          />
        </div>

        {/* Stat 3: Countries */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-600">
            Countries
          </h3>
          <Counter
            value={35}
            places={[10, 1]}
            fontSize={50}
            padding={5}
            gap={3}
            textColor="black"
            fontWeight={900}
            gradientFrom="white"
            gradientTo="transparent"
          />
        </div>

        {/* Stat 4: 5-Star Reviews */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-600">
            5-Star Reviews
          </h3>
          <Counter
            value={8500}
            places={[1000, 100, 10, 1]}
            fontSize={50}
            padding={5}
            gap={3}
            textColor="black"
            fontWeight={900}
            gradientFrom="white"
            gradientTo="transparent"
          />
        </div>
      </div>
    </section>
  );
}
