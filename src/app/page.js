"use client"

import Image from "next/image";
import Typewriter from "typewriter-effect"
import { Github, Instagram, Linkedin, Mail, Twitter, Link } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col bg-[#00000033] w-full sm:w-2/3 items-center p-10 rounded-lg shadow-2xl gap-5">
        <Image src={'/images/pfp_my_image.jpg'} alt="profile picture" height={128} width={128} className="rounded-full shadow-2xl shadow-yellow-300" />
        <h1 className="text-3xl font-semibold text-center">
          <Typewriter
            options={{
              strings: ['Monsur', 'Aryan', 'Minkxx'],
              autoStart: true,
              loop: true,
              delay: 300,
            }}
          />
        </h1>
        <h2 className="text-4xl font-semibold text-center">
          <Typewriter
            options={{
              strings: ['Computer Scince & Engineering', 'Full Stack Developer', 'Python Developer'],
              autoStart: true,
              loop: true,
              delay: 100,
            }}
          />
        </h2>
        <p className="text-xl font-semibold text-center">Crafting innovative solutions with AI, bots, and cutting-edge web technologies.</p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 place-items-center mt-6">
          <a href="https://github.com/minkxx" target="_blank" rel="noopener noreferrer">
            <Github className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.instagram.com/aryan2.3" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
          <a href="mailto:monsurcodes@gmail.com">
            <Mail className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
          <a href="https://x.com/monsurcodes" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
        </div>


      </div>
    </div>
  );
}
